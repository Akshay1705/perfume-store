<?php

namespace App\Repositories;

use App\Models\Order;
use App\Repositories\Contracts\OrderRepositoryInterface;
use App\Enums\OrderStatus;
use Carbon\Carbon;

class OrderRepository extends BaseRepository
implements OrderRepositoryInterface
{
    public function __construct(Order $order){
        parent::__construct($order);
    }

    public function saveStatus(Order $order, string $status): bool{
        return $order->update(['status' => $status,]);
    }

    public function countNonCartOrders(): int{
        return Order::where('status','!=',OrderStatus::CART->value)->count();
    }

    public function getFilteredOrders(?string $search, ?string $status) {
        return Order::query()
            ->with('user')
            ->where(
                'status',
                '!=',
                OrderStatus::CART->value
            )
            ->when(
                $search,
                function ($query, $search) {

                    $query->where(
                        function ($q) use ($search) {

                            $q->where(
                                'id',
                                'like',
                                "%{$search}%"
                            )
                                ->orWhereHas(
                                    'user',
                                    function ($q) use ($search) {
                                        $q->where(
                                            'name',
                                            'like',
                                            "%{$search}%"
                                        )
                                            ->orWhere(
                                                'email',
                                                'like',
                                                "%{$search}%"
                                            );
                                    }
                                );
                        }
                    );
                }
            )
            ->when(
                $status && OrderStatus::tryFrom($status),
                fn($query) =>
                $query->where(
                    'status',
                    $status
                )
            )
            ->orderByDesc('placed_at')
            ->paginate(20)
            ->withQueryString();
    }

    public function totalRevenue(): float{
        return Order::revenueOrders()
        ->sum('total');
    }

    public function todayRevenue(): float{
        return Order::whereDate(
            'placed_at',
            today()
        )->revenueOrders()
        ->sum('total');
    }

    public function todayOrdersCount(): int{
        return Order::whereDate(
            'placed_at',
            today()
        )->revenueOrders()
        ->count();
    }

    public function pendingOrdersCount(): int{
        return Order::whereIn(
            'status', [OrderStatus::PLACED->value, OrderStatus::PROCESSING->value, OrderStatus::SHIPPED->value])
        ->count();
    }

    public function deliveredOrdersCount(): int{
        return Order::where(
            'status',
            OrderStatus::DELIVERED->value
        )->count();
    }

    public function recentOrders(int $limit = 5) {
        return Order::with('user')
            ->where('status', '!=', OrderStatus::CART->value)
            ->orderByDesc('placed_at')
            ->take($limit)
            ->get();
    }

    public function revenueChart(int $days = 7): array {
        $chart = [];
        for ($i = $days - 1; $i >= 0; $i--) {
            $date = Carbon::today()->subDays($i);
            $chart[] = [
                'day' => $date->format('D'),
                'revenue' => Order::whereDate('placed_at', $date)
                    ->revenueOrders()
                    ->sum('total'),
            ];
        }

        return $chart;
    }

    public function statusChart(): array{
        return [
            [
                'status' => 'Placed',
                'count' => Order::where(
                    'status',
                    OrderStatus::PLACED->value
                )->count(),
            ],

            [
                'status' => 'Processing',
                'count' => Order::where(
                    'status',
                    OrderStatus::PROCESSING->value
                )->count(),
            ],

            [
                'status' => 'Shipped',
                'count' => Order::where(
                    'status',
                    OrderStatus::SHIPPED->value
                )->count(),
            ],

            [
                'status' => 'Delivered',
                'count' => Order::where(
                    'status',
                    OrderStatus::DELIVERED->value
                )->count(),
            ],

            [
                'status' => 'Cancelled',
                'count' => Order::where(
                    'status',
                    OrderStatus::CANCELLED->value
                )->count(),
            ],

            [
                'status' => 'Returned',
                'count' => Order::where(
                    'status',
                    OrderStatus::RETURNED->value
                )->count(),
            ],
        ];
    }
}