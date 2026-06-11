<?php

namespace App\Http\Controllers\Store;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class OrderController extends Controller
{
    public function index(): Response
    {
        /** @var User $user */
        $user = Auth::user();

        $orders = $user->orders()
            ->where('status', '!=', Order::STATUS_CART)
            ->latest()
            ->get();

        return Inertia::render(
            'Store/Orders/Index',
            [
                'orders' => $orders,
            ]
        );
    }

    public function show(
        Order $order
    ): Response {

        abort_if(
            $order->user_id !== Auth::id(),
            403
        );

        $order->load([
            'items.variant.product',
            'items.variant.primaryImage',
            'address',
        ]);

        return Inertia::render(
            'Store/Orders/Show',
            [
                'order' => $order,
            ]
        );
    }
}