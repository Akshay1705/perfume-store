<?php

namespace App\Services;

use App\Models\OrderItem;
use App\Models\ProductVariant;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class CartService
{
    /**
     * Add a product variant to the user's active cart.
     *
     * @param User $user
     * @param int  $variantId
     * @param int  $quantity
     *
     * @return void
     */
    public function add(User $user, int $variantId, int $quantity): void
    {
        $variant = ProductVariant::findOrFail($variantId);
        $cart    = $user->activeCart();
        $item    = $cart->items()->where('product_variant_id', $variant->id)->first();

        if ($item) {
            $item->increment('quantity', $quantity);
        } else {
            $cart->items()->create([
                'product_variant_id' => $variant->id,
                'quantity'           => $quantity,
                'unit_price'         => $variant->price,
            ]);
        }

        $this->recalculateCart($cart);
    }

    /**
     * Recalculate and update the cart subtotal and total.
     *
     * @param mixed $cart
     *
     * @return void
     */
    private function recalculateCart($cart): void
    {
        $subtotal = $cart->items()->sum(DB::raw('quantity * unit_price'));

        $cart->update([
            'subtotal' => $subtotal,
            'total'    => $subtotal,
        ]);
    }

    /**
     * Update the quantity of a cart item.
     *
     * @param OrderItem $item
     * @param int       $quantity
     *
     * @return void
     */
    public function updateQuantity(OrderItem $item, int $quantity): void
    {
        if ($quantity <= 0) {
            $item->delete();
            $this->recalculateCart($item->order);

            return;
        }

        $item->update(['quantity' => $quantity]);
        $this->recalculateCart($item->order);
    }

    /**
     * Remove an item from the cart.
     *
     * @param OrderItem $item
     *
     * @return void
     */
    public function removeItem(OrderItem $item): void
    {
        $order = $item->order;
        $item->delete();

        $this->recalculateCart($order);
    }
}