<?php

namespace App\Services;

use App\Models\Order;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class CheckoutService
{
    public function placeOrder(
        User $user,
        int $addressId
    ): Order {

        return DB::transaction(function () use (
            $user,
            $addressId
        ) {

            $cart = $user->activeCart();

            if ($cart->items()->count() === 0) {
                abort(422, 'Cart is empty.');
            }

            $cart->update([
                'address_id' => $addressId,
                'status' => 'placed',
                'placed_at' => now(),
            ]);

            // create fresh cart
            $user->orders()->create([
                'status' => 'cart',
                'subtotal' => 0,
                'discount_amount' => 0,
                'total' => 0,
            ]);

            return $cart;
        });
    }
}
