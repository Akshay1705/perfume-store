<?php

namespace App\Services;

use App\Enums\DiscountTargetType;
use Illuminate\Validation\ValidationException;
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
            throw ValidationException::withMessages([
                'code' => 'Invalid discount code.',
            ]);
        }

        if (
            $cart->discount_id === $discount->id
        ) {
            throw ValidationException::withMessages([
                'code' => 'This coupon is already applied.',
            ]);
        }

        $now = now();

        if (
            $discount->starts_at &&
            $now->lt($discount->starts_at)
        ) {
            throw ValidationException::withMessages([
                'code' => 'This coupon is not active yet.',
            ]);
        }

        if (
            $discount->ends_at &&
            $now->gt($discount->ends_at)
        ) {
            throw ValidationException::withMessages([
                'code' => 'This coupon has expired.',
            ]);
        }

        if (!$discount->is_active) {
            throw ValidationException::withMessages([
                'code' => 'This coupon is inactive.',
            ]);
        }

        if (
            $discount->target_type === DiscountTargetType::USER->value &&
            $discount->user_id !== $cart->user_id
        ) {
            throw ValidationException::withMessages([
                'code' => 'This coupon is not assigned to your account.',
            ]);
        }

        if (
            $cart->subtotal <
            $discount->min_order_amount
        ) {
            throw ValidationException::withMessages([
                'code' => 'Minimum order amount is ₹' .
                    number_format(
                        $discount->min_order_amount,
                        0
                    ),
            ]);
        }

        $eligibleAmount = $this->calculateEligibleAmount(
            $cart,
            $discount
        );

        if ($eligibleAmount <= 0) {
            throw ValidationException::withMessages([
                'code' => 'Discount is not applicable to cart items.',
            ]);
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
     *
     * @param Order $cart
     * @param Discount $discount
     *
     * @return float
     */
    protected function calculateEligibleAmount(
        Order $cart,
        Discount $discount
    ): float {

        $cart->load(
            'items.variant.product.brand',
            'items.variant.product.category'
        );

        /*
    |--------------------------------------------------------------------------
    | Entire Cart Discounts
    |--------------------------------------------------------------------------
    */
        if (
            in_array(
                $discount->target_type,
                [
                    DiscountTargetType::ALL->value,
                    DiscountTargetType::USER->value,
                ]
            )
        ) {
            return (float) $cart->subtotal;
        }

        $eligibleAmount = 0;

        foreach ($cart->items as $item) {

            if (!$item->variant || !$item->variant->product) {
                continue;
            }
            $product = $item->variant->product;

            switch ($discount->target_type) {

                case DiscountTargetType::BRAND->value:

                    if (
                        $product->brand_id ==
                        $discount->brand_id
                    ) {
                        $eligibleAmount +=
                            $item->unit_price *
                            $item->quantity;
                    }

                    break;

                case DiscountTargetType::CATEGORY->value:

                    if (
                        $product->category_id ==
                        $discount->category_id
                    ) {
                        $eligibleAmount +=
                            $item->unit_price *
                            $item->quantity;
                    }

                    break;
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

        if ($discount->isPercentage()) {

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

    public function recalculateCoupon(Order $cart): void
    {
        $cart->load('discount');
        if (!$cart->discount) {
            $this->resetCartDiscount($cart);
            return;
        }
        if (!$cart->discount->isValid()){
            $this->resetCartDiscount($cart);

            return;
        }
        if (
            $cart->subtotal <
            $cart->discount->min_order_amount
        ) {
            $this->resetCartDiscount($cart);
            return;
        }
        $eligibleAmount = $this->calculateEligibleAmount($cart, $cart->discount);
        if ($eligibleAmount <= 0) {
            $this->resetCartDiscount($cart);
            return;
        }
        $discountAmount = $this->calculateDiscountAmount($eligibleAmount, $cart->discount);
        $cart->update(['discount_amount' => $discountAmount, 'total' => max(0, $cart->subtotal - $discountAmount),]);
    }

    protected function resetCartDiscount(
        Order $cart
    ): void {

        $cart->update([
            'discount_id' => null,
            'discount_amount' => 0,
            'total' => $cart->subtotal,
        ]);
    }
}
