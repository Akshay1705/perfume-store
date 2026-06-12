<?php

namespace App\Services;

use App\Models\Order;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\Request;

class OrderService
{
    /**
     * Update order status.
     *
     * @param Order $order
     * @param string $status
     * 
     * @return void
     */
    public function updateStatus(
        Order $order,
        string $status
    ): void {
        if (
            $status === Order::STATUS_SHIPPED &&
            $order->status !== Order::STATUS_SHIPPED
        ) {
            $this->reduceStock($order);
        }
        $order->update([
            'status' => $status,
        ]);
    }

    private function reduceStock(
        Order $order
    ): void {

        foreach ($order->items as $item) {

            $variant = $item->variant;

            $variant->decrement(
                'stock',
                $item->quantity
            );
        }
    }

    /**
     * Get paginated orders with filters.
     */
    public function getOrders(Request $request): LengthAwarePaginator
    {
        $search = $request->input('search');
        $status = $request->input('status');

        return Order::query()
            ->with(['user'])
            ->where('status', '!=', Order::STATUS_CART)
            ->when($search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('id', 'like', "%{$search}%")
                        ->orWhereHas('user', function ($q) use ($search) {
                            $q->where('name', 'like', "%{$search}%")
                                ->orWhere('email', 'like', "%{$search}%");
                        });
                });
            })
            ->when($status, function ($query, $status) {
                $query->where('status', $status);
            })
            ->latest()
            ->paginate(20)
            ->withQueryString();
    }

    /**
     * Determine whether the order
     * can be cancelled.
     *
     * @param Order $order
     * 
     * @return bool
     */
    public function canBeCancelled(
        Order $order
    ): bool {
        return in_array(
            $order->status,
            [
                Order::STATUS_PLACED,
                Order::STATUS_PROCESSING,
            ]
        );
    }

    /**
     * Cancel order.
     *
     * @param Order $order
     * 
     * @return void
     */
    public function cancel(
        Order $order
    ): void {
        $order->update([
            'status' => Order::STATUS_CANCELLED,
        ]);
    }

    /**
     * Mark order as processing.
     *
     * @param Order $order
     * 
     * @return void
     */
    public function markAsProcessing(
        Order $order
    ): void {
        $order->update([
            'status' => Order::STATUS_PROCESSING,
        ]);
    }

    /**
     * Mark order as shipped.
     *
     * @param Order $order
     * 
     * @return void
     */
    public function markAsShipped(
        Order $order
    ): void {
        $order->update([
            'status' => Order::STATUS_SHIPPED,
        ]);
    }

    /**
     * Mark order as delivered.
     *
     * @param Order $order
     * 
     * @return void
     */
    public function markAsDelivered(
        Order $order
    ): void {
        $order->update([
            'status' => Order::STATUS_DELIVERED,
        ]);
    }

    /**
     * Mark order as returned.
     *
     * @param Order $order
     * 
     * @return void
     */
    public function markAsReturned(
        Order $order
    ): void {
        $order->update([
            'status' => Order::STATUS_RETURNED,
        ]);
    }
}