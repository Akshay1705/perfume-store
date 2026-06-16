<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;
use App\Repositories\Contracts\OrderRepositoryInterface;
use App\Repositories\Contracts\ProductRepositoryInterface;

class DashboardController extends Controller
{
    /**
     * Display dashboard analytics.
     *
     * @return Response
     */
    public function index(OrderRepositoryInterface $orders, ProductRepositoryInterface $products): Response{
        $totalOrders = $orders->countNonCartOrders();
        $totalRevenue = $orders->totalRevenue();
        $todayRevenue = $orders->todayRevenue();
        $todayOrders = $orders->todayOrdersCount();
        $pendingOrders = $orders->pendingOrdersCount();
        $deliveredOrders = $orders->deliveredOrdersCount();
        $recentOrders = $orders->recentOrders();
        $revenueChart = $orders->revenueChart();
        $statusChart = $orders->statusChart();
        $totalCustomers = User::count();
        $totalProducts = $products->countProducts();
        $lowStockProducts = $products->getLowStockProducts();

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