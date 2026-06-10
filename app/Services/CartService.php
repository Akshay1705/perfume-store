<?php

namespace App\Services;

use App\Models\ProductVariant;
use App\Models\User;
use APP\Models\OrderItem;
use Illuminate\Support\Facades\DB;

class CartService
{
    public function add(
        User $user,
        int $variantId,
        int $quantity
    ): void {

        $variant = ProductVariant::findOrFail(
            $variantId
        );

        $cart = $user->activeCart();

        $item = $cart->items()
            ->where(
                'product_variant_id',
                $variant->id
            )
            ->first();

        if ($item) {

            $item->increment(
                'quantity',
                $quantity
            );
        } else {

            $cart->items()->create([
                'product_variant_id' => $variant->id,
                'quantity' => $quantity,
                'unit_price' => $variant->price,
            ]);
        }

        $this->recalculateCart($cart);
    }

    private function recalculateCart($cart): void
    {
        $subtotal = $cart->items()
            ->sum(
                DB::raw(
                    'quantity * unit_price'
                )
            );

        $cart->update([
            'subtotal' => $subtotal,
            'total' => $subtotal,
        ]);
    }

    public function updateQuantity(
        OrderItem $item,
        int $quantity
    ): void {

        if ($quantity <= 0) {
            $item->delete();

            $this->recalculateCart(
                $item->order
            );

            return;
        }

        $item->update([
            'quantity' => $quantity,
        ]);

        $this->recalculateCart(
            $item->order
        );
    }

    public function removeItem(
        OrderItem $item
    ): void {

        $order = $item->order;

        $item->delete();

        $this->recalculateCart($order);
    }
}
