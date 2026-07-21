<?php

namespace App\Services;

use App\Enums\OrderStatus;
use App\Mail\Orders\OrderShippedMail;
use App\Models\Order;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\Request;
use App\Repositories\Contracts\OrderRepositoryInterface;
use Illuminate\Support\Facades\Mail;
use App\Mail\Orders\OrderDeliveredMail;
use App\Mail\Orders\OrderCancelledMail;
use App\Mail\Orders\OrderReturnedMail;

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
    public function updateStatus(Order $order, string $status): void
    {
        if (
            $status === OrderStatus::CANCELLED->value &&
            $this->canBeCancelled($order)
        ) {
            $this->restoreStock($order);
        }

        if (
            $status === OrderStatus::RETURNED->value &&
            $order->status === OrderStatus::DELIVERED->value
        ) {
            $this->restoreStock($order);
        }

        $this->orders->saveStatus($order, $status);

        $order->refresh();

        if ($status === OrderStatus::SHIPPED->value) {
            Mail::to($order->user->email)
                ->queue(new OrderShippedMail($order));
        }

        if ($status === OrderStatus::DELIVERED->value) {
            Mail::to($order->user->email)
                ->queue(new OrderDeliveredMail($order));
        }
        if ($status === OrderStatus::CANCELLED->value) {
            Mail::to($order->user->email)
                ->queue(new OrderCancelledMail($order));
        }
        if ($status === OrderStatus::RETURNED->value) {
            Mail::to($order->user->email)
                ->queue(new OrderReturnedMail($order));
        }
    }

    private function restoreStock(Order $order): void
    {
        $order->load('items.variant');

        foreach ($order->items as $item) {
            $item->variant->increment(
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
        $this->updateStatus($order, OrderStatus::CANCELLED->value);
    }

    /**
     * Mark order as processing.
     *
     * @param Order $order
     * 
     * @return void
     */
    public function markAsProcessing(Order $order): void {
        $this->updateStatus($order, OrderStatus::PROCESSING->value);
    }

    /**
     * Mark order as shipped.
     *
     * @param Order $order
     * 
     * @return void
     */
    public function markAsShipped(Order $order): void {
        $this->updateStatus($order, OrderStatus::SHIPPED->value);
    }

    /**
     * Mark order as delivered.
     *
     * @param Order $order
     * 
     * @return void
     */
    public function markAsDelivered(Order $order): void {
        $this->updateStatus($order, OrderStatus::DELIVERED->value);
    }

    /**
     * Mark order as returned.
     *
     * @param Order $order
     * 
     * @return void
     */
    public function markAsReturned(Order $order): void {
        $this->updateStatus($order, OrderStatus::RETURNED->value);
    }
}