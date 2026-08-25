<?php

namespace App\Http\Controllers\Store;

// use App\Http\Controllers\Controller;

use App\Exceptions\CheckoutException;
use App\Http\Controllers\BaseController;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;
use App\Services\CheckoutService;
use App\Http\Requests\Store\PlaceOrderRequest;
use App\Models\Order;
use App\Models\User;
// use App\Services\StripeService;

class CheckoutController extends BaseController
{
    public function index(): Response
    {
        /** @var User $user */
        $user = Auth::user();

        $cart = $user->activeCart()->load([
            'items.variant' => fn($q) => $q->withTrashed(),
            'items.variant.product' => fn($q) => $q->withTrashed(),
            'items.variant.primaryImage',
            'discount',
        ]);

        $addresses = $user->addresses;

        return Inertia::render('Store/Checkout/Index', [
            'cart'      => $cart,
            'addresses' => $addresses,
        ]);
    }

    public function placeOrder(PlaceOrderRequest $request, CheckoutService $service)
    {
        try{
            /** @var \App\Models\User $user */
            $user = Auth::user();
            $order = $service->placeOrder($user, $request->address_id);

            return redirect()
                ->route(
                    'checkout.success',
                    $order->id,
                );

            // $cart = $user->activeCart();

            // $url = $stripeService->createCheckoutSession(
            //     $cart,
            //     $request->address_id
            // );

            // // return redirect()->away($url);
            // return response()->json([
            //     'checkout_url' => $url,
            // ]);

        } catch (CheckoutException $e) {

            return $this->redirectError(
                $e->getMessage()
            );
        }
    }

    public function success(Order $order)
    {
        return Inertia::render(
            'Store/Checkout/Success',
            [
                'order' => $order,
            ]
        );
    }
}
