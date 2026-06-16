<?php

namespace App\Services;

use App\Enums\OrderStatus;
use App\Models\Order;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\Request;
use App\Repositories\Contracts\OrderRepositoryInterface;

class OrderService
{
    protected OrderRepositoryInterface $orders;
    public function __construct(OrderRepositoryInterface $orders) {
        $this->orders = $orders;
    }
    /**
     * Update order status.
     *
     * @param Order $order
     * @param string $status
     * 
     * @return void
     */
    public function updateStatus(Order $order, string $status): void {
        if ($status === OrderStatus::SHIPPED->value && $order->status !== OrderStatus::SHIPPED->value) {
            $this->reduceStock($order);
        }
        $this->orders->saveStatus($order, $status);
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
    public function getOrders(Request $request): LengthAwarePaginator {
        return $this->orders->getFilteredOrders(
            $request->input('search'),
            $request->input('status')
        );
    }

    /**
     * Determine whether the order
     * can be cancelled.
     *
     * @param Order $order
     * 
     * @return bool
     */
    public function canBeCancelled(Order $order): bool {
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
    public function cancel(Order $order): void {
        $this->orders->saveStatus($order, OrderStatus::CANCELLED->value);
    }

    /**
     * Mark order as processing.
     *
     * @param Order $order
     * 
     * @return void
     */
    public function markAsProcessing(Order $order): void {
        $this->orders->saveStatus($order, OrderStatus::PROCESSING->value);
    }

    /**
     * Mark order as shipped.
     *
     * @param Order $order
     * 
     * @return void
     */
    public function markAsShipped(Order $order): void {
        $this->orders->saveStatus($order, OrderStatus::SHIPPED->value);
    }

    /**
     * Mark order as delivered.
     *
     * @param Order $order
     * 
     * @return void
     */
    public function markAsDelivered(Order $order): void {
        $this->orders->saveStatus($order, OrderStatus::DELIVERED->value);
    }

    /**
     * Mark order as returned.
     *
     * @param Order $order
     * 
     * @return void
     */
    public function markAsReturned(Order $order): void {
        $this->orders->saveStatus($order, OrderStatus::RETURNED->value);
    }
}