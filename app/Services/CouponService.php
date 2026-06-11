<?php

namespace App\Services;

use App\Models\Discount;
use App\Models\Order;

class CouponService
{
    /**
     * Apply coupon code to cart.
     *
     * @param Order  $cart
     * @param string $code
     *
     * @return void
     */
    public function applyCoupon(
        Order $cart,
        string $code
    ): void {

        $discount = Discount::query()
            ->where(
                'code',
                strtoupper(trim($code))
            )
            ->first();

        if (!$discount) {
            abort(
                422,
                'Invalid discount code.'
            );
        }

        if (!$discount->isValid()) {
            abort(
                422,
                'This discount is no longer active.'
            );
        }

        if (
            $cart->subtotal <
            $discount->min_order_amount
        ) {
            abort(
                422,
                'Minimum order amount not reached.'
            );
        }

        $eligibleAmount = $this->calculateEligibleAmount(
            $cart,
            $discount
        );

        if ($eligibleAmount <= 0) {
            abort(
                422,
                'Discount is not applicable to cart items.'
            );
        }

        $discountAmount = $this->calculateDiscountAmount(
            $eligibleAmount,
            $discount
        );

        $cart->update([
            'discount_id'     => $discount->id,
            'discount_amount' => $discountAmount,
            'total'           => max(
                0,
                $cart->subtotal - $discountAmount
            ),
        ]);
    }

    /**
     * Calculate eligible cart amount.
     */
    protected function calculateEligibleAmount(
        Order $cart,
        Discount $discount
    ): float {

        $cart->load(
            'items.variant.product.brand',
            'items.variant.product.category'
        );

        if ($discount->target_type === 'all') {
            return (float) $cart->subtotal;
        }

        $eligibleAmount = 0;

        foreach ($cart->items as $item) {

            $product = $item->variant->product;

            if (
                $discount->target_type === 'brand' &&
                $product->brand_id === $discount->brand_id
            ) {
                $eligibleAmount += $item->price * $item->quantity;
            }

            if (
                $discount->target_type === 'category' &&
                $product->category_id === $discount->category_id
            ) {
                $eligibleAmount += $item->price * $item->quantity;
            }
        }

        return $eligibleAmount;
    }

    /**
     * Calculate discount amount.
     */
    protected function calculateDiscountAmount(
        float $eligibleAmount,
        Discount $discount
    ): float {

        if ($discount->type === 'percentage') {

            return round(
                ($eligibleAmount * $discount->value) / 100,
                2
            );
        }

        return min(
            (float) $discount->value,
            $eligibleAmount
        );
    }
}
