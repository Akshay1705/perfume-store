<?php

namespace App\Http\Controllers\Store;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class CheckoutController extends Controller
{
    public function index(): Response
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();

        $cart = $user->activeCart()
            ->load([
                'items.variant.product',
                'items.variant.primaryImage',
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
}
