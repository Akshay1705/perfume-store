<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UpdateOrderStatusRequest;
use App\Models\Order;
use App\Services\OrderService;
use App\Services\OrderExportService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;
use Illuminate\Http\Response as HttpResponse;


class OrderController extends Controller
{
    /**
     * Display a listing of orders.
     *
     * @return InertiaResponse
     */
    public function index(): InertiaResponse
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
     * @return InertiaResponse
     */
    public function show(Order $order): InertiaResponse 
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

    /**
     * @return HttpResponse
     */
    public function export(OrderExportService $exportService): HttpResponse
    {
        $csv      = $exportService->generateCsv();
        $filename = 'orders-' . now()->format('Y-m-d-His') . '.csv';

        return response($csv, 200, [
            'Content-Type'        => 'text/csv',
            'Content-Disposition' => "attachment; filename=\"{$filename}\"",
            'Pragma'              => 'no-cache',
            'Cache-Control'       => 'must-revalidate, post-check=0, pre-check=0',
            'Expires'             => '0',
        ]);
    }
}