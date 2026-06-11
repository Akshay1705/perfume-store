<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UpdateOrderStatusRequest;
use App\Models\Order;
use App\Services\OrderService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class OrderController extends Controller
{
    /**
     * Display a listing of orders.
     *
     * @return Response
     */
    public function index(): Response
    {
        $orders = Order::query()
            ->with([
                'user',
            ])
            ->where(
                'status',
                '!=',
                Order::STATUS_CART
            )
            ->latest()
            ->paginate(15);

        return Inertia::render(
            'Admin/Orders/Index',
            [
                'orders' => $orders,
            ]
        );
    }

    /**
     * Display the specified order.
     *
     * @param Order $order
     * 
     * @return Response
     */
    public function show(Order $order): Response 
    {
        $order->load([
            'user',
            'address',
            'items.variant.product',
            'items.variant.primaryImage',
        ]);

        return Inertia::render(
            'Admin/Orders/Show',
            [
                'order' => $order,
                'statuses' => Order::statuses(),
            ]
        );
    }

    /**
     * Update the specified order.
     *
     * @param UpdateOrderStatusRequest $request
     * @param Order                    $order
     * @param OrderService             $service
     * 
     * @return RedirectResponse
     */
    public function update(UpdateOrderStatusRequest $request,Order $order,OrderService $service): RedirectResponse 
    {
        $service->updateStatus(
            $order,
            $request->validated()['status'],
        );

        return back()->with(
            'success',
            'Order status updated successfully.',
        );
    }
}