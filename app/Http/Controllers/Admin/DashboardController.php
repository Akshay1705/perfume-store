<?php

namespace App\Http\Controllers\Admin;

use App\Enums\OrderStatus;
use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;
use Carbon\Carbon;
use App\Models\ProductVariant;

class DashboardController extends Controller
{
    /**
     * Display dashboard analytics.
     *
     * @return Response
     */
    public function index(): Response
    {
        $totalRevenue = Order::where('status', OrderStatus::DELIVERED->value)->sum('total');
        $totalOrders = Order::whereNot('status', OrderStatus::CART->value)->count();
        $totalCustomers = User::count();
        $totalProducts = Product::count();
        $todayRevenue = Order::whereDate('created_at',today())->where('status', OrderStatus::DELIVERED->value)->sum('total');
        $todayOrders = Order::whereDate('created_at', today())->count();
        $pendingOrders = Order::where('status', OrderStatus::PLACED->value)->count();
        $deliveredOrders = Order::where('status', OrderStatus::DELIVERED->value)->count();
        $recentOrders = Order::with('user')->latest()->take(10)->get();
        $revenueChart = [];
        for ($i = 6; $i >= 0; $i--) {
            $date = Carbon::today()->subDays($i);
            $revenueChart[] = [
                'day' => $date->format('D'),
                'revenue' => Order::whereDate('created_at', $date)->where('status', OrderStatus::DELIVERED->value)->sum('total'),
            ];
        }
        $statusChart = [
            [
                'status' => 'Placed',
                'count' => Order::where('status', OrderStatus::PLACED->value)->count(),
            ],
            [
                'status' => 'Processing',
                'count' => Order::where('status', OrderStatus::PROCESSING->value)->count(),
            ],
            [
                'status' => 'Shipped',
                'count' => Order::where('status', OrderStatus::SHIPPED->value)->count(),
            ],
            [
                'status' => 'Delivered',
                'count' => Order::where('status', OrderStatus::DELIVERED->value)->count(),
            ],
            [
                'status' => 'Cancelled',
                'count' => Order::where('status', OrderStatus::CANCELLED->value)->count(),
            ],
            [
                'status' => 'Returned',
                'count' => Order::where('status', OrderStatus::RETURNED->value)->count(),
            ],
        ];

        $lowStockProducts = ProductVariant::with('product', 'primaryImage',)->where('stock', '>', 0)->where('stock', '<=', 20)->orderBy('stock')->take(10)->get();

        return Inertia::render(
            'Admin/Dashboard',
            [
                'stats' => [
                    'totalRevenue' => $totalRevenue,
                    'totalOrders' => $totalOrders,
                    'totalCustomers' => $totalCustomers,
                    'totalProducts' => $totalProducts,
                    'todayRevenue' => $todayRevenue,
                    'todayOrders' => $todayOrders,
                    'pendingOrders' => $pendingOrders,
                    'deliveredOrders' => $deliveredOrders,
                ],
                'recentOrders' => $recentOrders,
                'revenueChart' => $revenueChart,
                'statusChart' => $statusChart,
                'lowStockProducts' => $lowStockProducts,
            ]
        );
    }
}