<?php

namespace App\Services;

use App\Enums\OrderStatus;
use App\Exceptions\CartEmptyException;
use App\Exceptions\CheckoutException;
use App\Exceptions\CheckoutFailedException;
use App\Exceptions\OutOfStockException;
use App\Models\Order;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Throwable;

class CheckoutService
{
    public function placeOrder(
        User $user,
        int $addressId
    ): Order {
        try{
            return DB::transaction(function () use (
                $user,
                $addressId,
            ) {

                $cart = $user->activeCart();

                if ($cart->items()->count() === 0) {
                    throw new CartEmptyException('Your cart is empty.');
                }

                $cart->load('items.variant.product');

                foreach ($cart->items as $item) {

                    if ($item->quantity > $item->variant->stock) {

                        throw new OutOfStockException(
                            "{$item->variant->product->name} has only {$item->variant->stock} item(s) left in stock."
                        );
                    }
                }

                foreach ($cart->items as $item) {

                    $item->variant->decrement(
                        'stock',
                        $item->quantity
                    );
                }

                $cart->update([
                    // 'address_id' => 99999999,
                    'address_id' => $addressId,
                    'status' => OrderStatus::PLACED->value,
                    'placed_at' => now(),
                    'coupon_code' => $cart->discount?->code,
                    'coupon_name' => $cart->discount?->name,
                ]);

                // throw new \Exception('Testing checkout failure');

                // create fresh cart
                $user->orders()->create([
                    'status' => OrderStatus::CART->value,
                    'subtotal' => 0,
                    'discount_amount' => 0,
                    'total' => 0,
                ]);

                return $cart;
            });
        } catch (CheckoutException $e) {
            throw $e;
        } catch (Throwable $e) {

            report($e);

            throw new CheckoutFailedException(
                previous: $e
            );
        }
    }
}
