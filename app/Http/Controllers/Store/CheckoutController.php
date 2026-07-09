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

class CheckoutController extends BaseController
{
    public function index(): Response
    {
        /** @var User $user */
        $user = Auth::user();
        $cart = $user->activeCart()
            ->load([
                'items.variant.product',
                'items.variant.primaryImage',
                'discount',
            ]);
        $addresses = $user->addresses;

        return Inertia::render(
            'Store/Checkout/Index',
            [
                'cart' => $cart,
                'addresses' => $addresses,
            ]
        );
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
