<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Stripe\Exception\SignatureVerificationException;
use Stripe\Webhook;
use UnexpectedValueException;

class StripeWebhookController extends Controller
{
    public function __invoke(Request $request)
    {
        $payload = $request->getContent();

        $signature = $request->header('Stripe-Signature');

        try {

            $event = Webhook::constructEvent(
                $payload,
                $signature,
                config('services.stripe.webhook_secret')
            );
        } catch (
            UnexpectedValueException |
            SignatureVerificationException) {

            return response()->json([
                'message' => 'Invalid webhook.',
            ], 400);
        }

        return response()->json([
            'type' => $event->type,
        ]);
    }
}