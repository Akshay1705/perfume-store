<?php

namespace App\Services;

use App\Models\Order;
use Stripe\StripeClient;

class StripeService
{
    protected StripeClient $stripe;

    public function __construct()
    {
        $this->stripe = new StripeClient(
            config('services.stripe.secret')
        );
    }

    public function client(): StripeClient
    {
        return $this->stripe;
    }

    public function createCheckoutSession(
        Order $cart,
        int $addressId
    ): string
    {
        $cart->load([
            'user',
            'items.variant.product',
        ]);

        $session = $this->stripe->checkout->sessions->create([

            'mode' => 'payment',

            'payment_method_types' => ['card'],

            'customer_email' => $cart->user->email,

            'line_items' => $this->buildLineItems($cart),

            'success_url' => route('stripe.success') .
                '?session_id={CHECKOUT_SESSION_ID}',

            'cancel_url' => route('stripe.cancel'),

            'metadata' => [
                'user_id' => $cart->user_id,
                'cart_id' => $cart->id,
                'address_id' => $addressId,
            ],

        ]);

        return $session->url;
    }

    protected function buildLineItems(Order $cart): array
    {
        $items = [];

        foreach ($cart->items as $item) {

            $items[] = [
                'price_data' => [

                    'currency' => 'inr',

                    'product_data' => [
                        'name' => $item->variant->product->name,
                    ],

                    'unit_amount' => (int) round($item->unit_price * 100),

                ],

                'quantity' => $item->quantity,
            ];
        }

        return $items;
    }

    public function testConnection(): string
    {
        $account = $this->stripe->accounts->retrieve();

        return $account->id;
    }
}