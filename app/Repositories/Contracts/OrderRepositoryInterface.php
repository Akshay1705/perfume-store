<?php

namespace App\Repositories\Contracts;

use App\Models\Order;

interface OrderRepositoryInterface
extends BaseRepositoryInterface
{
    public function saveStatus(Order $order,string $status): bool;

    public function countNonCartOrders(): int;

    public function getFilteredOrders(?string $search, ?string $status);

    public function totalRevenue(): float;

    public function todayRevenue(): float;

    public function todayOrdersCount(): int;

    public function pendingOrdersCount(): int;

    public function deliveredOrdersCount(): int;

    public function recentOrders(int $limit = 10);

    public function revenueChart(int $days = 7): array;

    public function statusChart(): array;
}