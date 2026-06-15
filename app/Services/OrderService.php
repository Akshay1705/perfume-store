<?php

namespace App\Services;

use App\Enums\OrderStatus;
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
            $status === OrderStatus::SHIPPED->value &&
            $order->status !== OrderStatus::SHIPPED->value
        ) {
            $this->reduceStock($order);
        }
        $order->update([
            'status' => $status,
        ]);
    }

    private function reduceStock(Order $order): void
    {
        $order->load('items.variant');

        foreach ($order->items as $item) {

            $item->variant->decrement(
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
            ->where('status', '!=', OrderStatus::CART->value)
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
                OrderStatus::PLACED->value,
                OrderStatus::PROCESSING->value,
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
            'status' => OrderStatus::CANCELLED->value,
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
            'status' => OrderStatus::PROCESSING->value,
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
            'status' => OrderStatus::SHIPPED->value,
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
            'status' => OrderStatus::DELIVERED->value,
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
            'status' => OrderStatus::RETURNED->value,
        ]);
    }
}