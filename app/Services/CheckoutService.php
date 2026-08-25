<?php

namespace App\Services;

use App\Enums\OrderStatus;
use App\Exceptions\CartEmptyException;
use App\Exceptions\CheckoutException;
use App\Exceptions\CheckoutFailedException;
use App\Exceptions\OutOfStockException;
use App\Mail\Orders\OrderPlacedMail;
use App\Models\Order;
use App\Models\ProductVariant;
use App\Models\User;
use App\Services\OrderSnapshotService;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Throwable;

class CheckoutService
{
    public function __construct(
        private OrderSnapshotService $snapshotService
    ) {}

    public function placeOrder(User $user, int $addressId): Order
    {
        try {
            return DB::transaction(function () use ($user, $addressId) {

                $cart = $user->activeCart();

                // 1. Empty cart check
                if ($cart->items()->count() === 0) {
                    throw new CartEmptyException('Your cart is empty.');
                }

                // 2. Load items with trashed relations so we can inspect them
                $cart->load([
                    'items.variant' => fn($q) => $q->withTrashed(),
                    'items.variant.product' => fn($q) => $q->withTrashed(),
                ]);

                // 3. Revalidate every item with a fresh locked row
                //    This is the real integrity boundary — cart-page checks are UX only
                foreach ($cart->items as $item) {

                    // Re-fetch variant fresh from DB with a row lock
                    // preventing concurrent checkouts racing on the same stock
                    $variant = ProductVariant::withTrashed()
                        ->lockForUpdate()
                        ->find($item->product_variant_id);

                    // Variant deleted
                    if (!$variant || $variant->trashed()) {
                        throw new CheckoutException(
                            "'{$item->product_name}' is no longer available."
                        );
                    }

                    // Variant inactive
                    if (!$variant->is_active) {
                        throw new CheckoutException(
                            "'{$variant->volume}' is currently unavailable."
                        );
                    }

                    // Product deleted or inactive
                    $product = $variant->product()->withTrashed()->first();

                    if (!$product || $product->trashed() || !$product->is_active) {
                        throw new CheckoutException(
                            "'{$item->product_name}' is no longer available."
                        );
                    }

                    // Stock check against the fresh locked row
                    if ($item->quantity > $variant->stock) {
                        throw new OutOfStockException(
                            "{$product->name} ({$variant->volume}) has only {$variant->stock} item(s) left in stock."
                        );
                    }

                    // Store the locked variant back on the item relation
                    // so the decrement loop below uses the same fresh instance
                    $item->setRelation('variant', $variant);
                }

                // 4. All items passed — decrement stock
                foreach ($cart->items as $item) {
                    $item->variant->decrement('stock', $item->quantity);
                }

                // 5. Capture snapshot before status changes
                $this->snapshotService->capture($cart);

                // 6. Place the order
                $cart->update([
                    'address_id' => $addressId,
                    'status'     => OrderStatus::PLACED->value,
                    'placed_at'  => now(),
                    'coupon_code' => $cart->discount?->code,
                    'coupon_name' => $cart->discount?->name,
                ]);

                // 7. Create a fresh empty cart for the user
                $user->orders()->create([
                    'status'          => OrderStatus::CART->value,
                    'subtotal'        => 0,
                    'discount_amount' => 0,
                    'total'           => 0,
                ]);

                // 8. Queue confirmation email after commit
                DB::afterCommit(function () use ($cart) {
                    Mail::to($cart->user->email)
                        ->queue(new OrderPlacedMail($cart));
                });

                return $cart;
            });
        } catch (CheckoutException $e) {
            throw $e;
        } catch (Throwable $e) {
            report($e);
            throw new CheckoutFailedException(previous: $e);
        }
    }
}