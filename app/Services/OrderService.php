<?php

namespace App\Services;

use App\Models\Order;

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
        $order->update([
            'status' => $status,
        ]);
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