"use strict";

import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link } from "@inertiajs/react";
import {TrendingUp, Package, Users, ShoppingCart, LineChart as LineChartIcon, PieChart as PieChartIcon, Clock, Eye, AlertTriangle, IndianRupee, ShoppingBag,} from "lucide-react";
import {ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, PieChart, Pie, Legend} from "recharts";

export default function Dashboard({stats, recentOrders, revenueChart, statusChart, lowStockProducts,})
{
    const statCards = [
        {
            title: "Total Revenue",
            value: `₹${Number(stats.totalRevenue).toLocaleString("en-IN")}`,
            Icon: IndianRupee,
            color: "text-green-400",
            bg: "bg-green-500/10 border-green-500/25",
        },
        {
            title: "Total Orders",
            value: stats.totalOrders,
            Icon: ShoppingBag,
            color: "text-blue-400",
            bg: "bg-blue-500/10 border-blue-500/25",
        },
        {
            title: "Customers",
            value: stats.totalCustomers,
            Icon: Users,
            color: "text-purple-400",
            bg: "bg-purple-500/10 border-purple-500/25",
        },
        {
            title: "Products",
            value: stats.totalProducts,
            Icon: Package,
            color: "text-amber-400",
            bg: "bg-amber-500/10 border-amber-500/25",
        },
    ];

    const todayCards = [
        {
            title: "Today's Revenue",
            value: `₹${Number(stats.todayRevenue).toLocaleString("en-IN")}`,
            Icon: TrendingUp,
            color: "text-green-400",
            iconBg: "bg-green-500/10 border-green-500/25",
        },
        {
            title: "Today's Orders",
            value: stats.todayOrders,
            Icon: ShoppingCart,
            color: "text-blue-400",
            iconBg: "bg-blue-500/10 border-blue-500/25",
        },
    ];

    const getStatusBadge = (status) => {
        const styles = {
            placed: "bg-blue-500/10 text-blue-400 border border-blue-500/30",
            processing:
                "bg-yellow-500/10 text-yellow-400 border border-yellow-500/30",
            shipped:
                "bg-purple-500/10 text-purple-400 border border-purple-500/30",
            delivered:
                "bg-green-500/10 text-green-400 border border-green-500/30",
            cancelled: "bg-red-500/10 text-red-400 border border-red-500/30",
            returned:
                "bg-slate-500/10 text-slate-400 border border-slate-500/30",
        };
        return (
            styles[status] ||
            "bg-slate-500/10 text-slate-400 border border-slate-500/30"
        );
    };

    const getStockColor = (stock) => {
        if (stock <= 2) return "text-red-400";
        if (stock <= 5) return "text-yellow-400";
        return "text-green-400";
    };

    const getStockBg = (stock) => {
        if (stock <= 2) return "bg-red-500/10 border-red-500/25";
        if (stock <= 5) return "bg-yellow-500/10 border-yellow-500/25";
        return "bg-green-500/10 border-green-500/25";
    };

    const COLORS = [
        "#3b82f6",
        "#eab308",
        "#a855f7",
        "#22c55e",
        "#ef4444",
        "#f97316",
    ];

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-slate-800 border border-slate-700/50 rounded-lg px-3 py-2 text-xs">
                    <p className="text-slate-400 mb-1">{label}</p>
                    <p className="text-green-400 font-semibold">
                        ₹{Number(payload[0].value).toLocaleString("en-IN")}
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <AdminLayout>
            <Head title="Dashboard" />

            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">
                        Dashboard
                    </h1>
                    <p className="text-slate-400 text-sm mt-1">
                        Your store at a glance
                    </p>
                </div>

                {/* Stat Cards */}
                <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
                    {statCards.map(({ title, value, Icon, color, bg }) => (
                        <div
                            key={title}
                            className="bg-slate-800/20 border border-slate-700/50 rounded-lg p-5"
                        >
                            <div className="flex items-center justify-between mb-3">
                                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                    {title}
                                </p>
                                <div
                                    className={`w-8 h-8 rounded-lg border flex items-center justify-center ${bg}`}
                                >
                                    <Icon size={15} className={color} />
                                </div>
                            </div>
                            <p className={`text-2xl font-bold ${color}`}>
                                {value}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Today Cards */}
                <div className="grid grid-cols-2 gap-4">
                    {todayCards.map(({ title, value, Icon, color, iconBg }) => (
                        <div
                            key={title}
                            className="bg-slate-800/20 border border-slate-700/50 rounded-lg p-5 flex items-center gap-4"
                        >
                            <div
                                className={`w-10 h-10 rounded-lg border flex items-center justify-center flex-shrink-0 ${iconBg}`}
                            >
                                <Icon size={18} className={color} />
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                                    {title}
                                </p>
                                <p className={`text-xl font-bold ${color}`}>
                                    {value}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {/* Revenue Trend */}
                    <div className="bg-slate-800/20 border border-slate-700/50 rounded-lg overflow-hidden">
                        <div className="flex items-center gap-2 px-5 py-3 border-b border-slate-700/30 bg-slate-800/40">
                            <LineChartIcon
                                size={14}
                                className="text-green-400"
                            />
                            <h2 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                                Revenue trend
                            </h2>
                        </div>
                        <div className="p-5">
                            <div style={{height: 220, minHeight: 220, width: "100%",}}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={revenueChart}>
                                        <XAxis
                                            dataKey="day"
                                            tick={{
                                                fill: "#64748b",
                                                fontSize: 11,
                                            }}
                                            axisLine={false}
                                            tickLine={false}
                                        />
                                        <YAxis
                                            tick={{
                                                fill: "#64748b",
                                                fontSize: 11,
                                            }}
                                            axisLine={false}
                                            tickLine={false}
                                            tickFormatter={(v) =>
                                                `₹${(v / 1000).toFixed(0)}k`
                                            }
                                        />
                                        <Tooltip content={<CustomTooltip />} />
                                        <Line
                                            type="monotone"
                                            dataKey="revenue"
                                            stroke="#22c55e"
                                            strokeWidth={2}
                                            dot={false}
                                            activeDot={{
                                                r: 4,
                                                fill: "#22c55e",
                                            }}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>

                    {/* Order Status Pie */}
                    <div className="bg-slate-800/20 border border-slate-700/50 rounded-lg overflow-hidden">
                        <div className="flex items-center gap-2 px-5 py-3 border-b border-slate-700/30 bg-slate-800/40">
                            <PieChartIcon
                                size={14}
                                className="text-green-400"
                            />
                            <h2 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                                Order status
                            </h2>
                        </div>
                        <div className="p-5">
                            <div style={{ height: 220 }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={statusChart.map(
                                                (entry, index) => ({
                                                    ...entry,
                                                    fill: COLORS[
                                                        index % COLORS.length
                                                    ],
                                                }),
                                            )}
                                            dataKey="count"
                                            nameKey="status"
                                            outerRadius={80}
                                            innerRadius={40}
                                        />
                                        <Tooltip
                                            contentStyle={{
                                                background: "#1e293b",
                                                border: "1px solid rgba(100,116,139,0.3)",
                                                borderRadius: 8,
                                                fontSize: 12,
                                                color: "#cbd5e1",
                                            }}
                                        />
                                        <Legend
                                            formatter={(value) => (
                                                <span
                                                    style={{
                                                        color: "#94a3b8",
                                                        fontSize: 12,
                                                        textTransform:
                                                            "capitalize",
                                                    }}
                                                >
                                                    {value}
                                                </span>
                                            )}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Orders */}
                <div className="bg-slate-800/20 border border-slate-700/50 rounded-lg overflow-hidden">
                    <div className="flex items-center justify-between px-5 py-3 border-b border-slate-700/30 bg-slate-800/40">
                        <div className="flex items-center gap-2">
                            <Clock size={14} className="text-green-400" />
                            <h2 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                                Recent orders
                            </h2>
                        </div>
                        <Link
                            href={route("admin.orders.index")}
                            className="text-xs text-green-400 hover:text-green-300 transition-colors"
                        >
                            View all →
                        </Link>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-slate-700/30">
                                    <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                                        Order
                                    </th>
                                    <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                                        Customer
                                    </th>
                                    <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                                        Amount
                                    </th>
                                    <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                                        Status
                                    </th>
                                    <th className="text-right px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentOrders.map((order) => (
                                    <tr
                                        key={order.id}
                                        className="border-b border-slate-700/20 hover:bg-slate-800/40 transition-colors"
                                    >
                                        <td className="px-5 py-3">
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 rounded-lg bg-green-500/10 border border-green-500/25 flex items-center justify-center text-green-400 font-semibold text-xs flex-shrink-0">
                                                    #
                                                    {String(order.id).slice(-2)}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-5 py-3 text-sm text-slate-300">
                                            {order.user?.name}
                                        </td>
                                        <td className="px-5 py-3 text-sm font-medium text-slate-100 tabular-nums">
                                            ₹
                                            {Number(order.total).toLocaleString(
                                                "en-IN",
                                            )}
                                        </td>
                                        <td className="px-5 py-3">
                                            <span
                                                className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${getStatusBadge(order.status)}`}
                                            >
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="px-5 py-3 text-right">
                                            <Link
                                                href={route(
                                                    "admin.orders.show",
                                                    order.id,
                                                )}
                                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-500/8 text-green-400 hover:bg-green-500/18 border border-green-500/28 hover:border-green-500/50 transition-all text-xs font-medium"
                                            >
                                                <Eye size={12} />
                                                View
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Low Stock */}
                <div className="bg-slate-800/20 border border-slate-700/50 rounded-lg overflow-hidden">
                    <div className="flex items-center gap-2 px-5 py-3 border-b border-slate-700/30 bg-slate-800/40">
                        <AlertTriangle size={14} className="text-yellow-400" />
                        <h2 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                            Low stock products
                        </h2>
                    </div>

                    <div className="divide-y divide-slate-700/20">
                        {lowStockProducts.map((variant) => (
                            <div
                                key={variant.id}
                                className="flex items-center justify-between px-5 py-3 hover:bg-slate-800/40 transition-colors"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg overflow-hidden border border-slate-700">
                                        <img
                                            src={
                                                variant.primary_image?.url ??
                                                "/images/placeholder.jpg"
                                            }
                                            alt={variant.product?.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-slate-100">
                                            {variant.product?.name}
                                        </p>
                                        <p className="text-xs text-slate-500 mt-0.5">
                                            {variant.volume}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span
                                        className={`text-xs font-semibold uppercase tracking-wider ${getStockColor(variant.stock)}`}
                                    >
                                        {variant.stock <= 2
                                            ? "Critical"
                                            : variant.stock <= 5
                                              ? "Low"
                                              : ""}
                                    </span>
                                    <span
                                        className={`w-8 h-8 rounded-lg border flex items-center justify-center text-sm font-bold ${getStockBg(variant.stock)} ${getStockColor(variant.stock)}`}
                                    >
                                        {variant.stock}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
