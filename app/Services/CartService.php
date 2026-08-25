<?php

namespace App\Services;

use App\Models\OrderItem;
use App\Models\ProductVariant;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
use App\Exceptions\OutOfStockException;

class CartService
{
    public function add(User $user, int $variantId, int $quantity): void
    {
        $variant = ProductVariant::where('is_active', true)->findOrFail($variantId);
        $cart    = $user->activeCart();
        $item    = $cart->items()->where('product_variant_id', $variant->id)->first();

        if ($item) {
            $newQuantity = $item->quantity + $quantity;

            if ($newQuantity > $variant->stock) {
                throw new OutOfStockException("Only {$variant->stock} items are available.");
            }

            $item->increment('quantity', $quantity);
        } else {
            if ($quantity > $variant->stock) {
                throw new OutOfStockException("Only {$variant->stock} items are available.");
            }

            $cart->items()->create([
                'product_variant_id' => $variant->id,
                'quantity'   => $quantity,
                'unit_price' => $variant->price,
            ]);
        }

        $this->recalculateCart($cart);
    }

    private function recalculateCart(mixed $cart): void
    {
        $subtotal = $cart->items()->sum(DB::raw('quantity * unit_price'));

        $cart->update([
            'subtotal' => $subtotal,
            'total'    => $subtotal,
        ]);
    }

    public function updateQuantity(OrderItem $item, int $quantity): void
    {
        if ($quantity <= 0) {
            $item->delete();
            $this->recalculateCart($item->order);
            return;
        }

        $variant = $item->variant()->withTrashed()->first();

        if (!$variant || $variant->trashed() || !$variant->is_active) {
            throw ValidationException::withMessages([
                'quantity' => 'This item is no longer available. Please remove it from your cart.',
            ]);
        }

        if ($quantity > $variant->stock) {
            throw new OutOfStockException("Only {$variant->stock} items available.");
        }

        $item->update(['quantity' => $quantity]);
        $this->recalculateCart($item->order);
    }

    public function removeItem(OrderItem $item): void
    {
        $order = $item->order;
        $item->delete();

        $this->recalculateCart($order);
    }
}
