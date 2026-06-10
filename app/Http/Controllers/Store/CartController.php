<?php

namespace App\Http\Controllers\Store;

use App\Http\Controllers\Controller;
use App\Http\Requests\Store\AddToCartRequest;
use App\Models\OrderItem;
use App\Services\CartService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class CartController extends Controller
{
    public function index(): Response
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();

        $cart = $user->orders()
            ->where('status', 'cart')
            ->with([
                'items.variant.product',
                'items.variant.primaryImage',
            ])
            ->first();

        return Inertia::render(
            'Store/Cart/Index',
            [
                'cart' => $cart,
            ]
        );
    }

    public function add(
        AddToCartRequest $request,
        CartService $service
    ) {
        /** @var \App\Models\User $user */
        $user = Auth::user();

        $service->add(
            $user,
            $request->variant_id,
            $request->quantity
        );

        return back()->with(
            'success',
            'Product added to cart.'
        );
    }

    public function updateQuantity(
        Request $request,
        OrderItem $item,
        CartService $service
    ) {

        $service->updateQuantity(
            $item,
            $request->quantity
        );

        return back();
    }

    public function destroy(
        OrderItem $item,
        CartService $service
    ) {
        $service->removeItem($item);

        return back();
    }
}
