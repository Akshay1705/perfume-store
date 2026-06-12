"use strict";

import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link, router, usePage } from "@inertiajs/react";
import { Download, Eye, Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Index({ orders, statuses, filters, totalOrders }) {
    const { flash } = usePage().props;
    const [search, setSearch] = useState(filters.search || "");
    const [status, setStatus] = useState(filters.status || "");

    useEffect(() => {
        if (flash?.success) toast.success(flash.success);
        if (flash?.error) toast.error(flash.error);
    }, [flash]);

    // Debounced search
    useEffect(() => {
        const timeout = setTimeout(() => {
            router.get(
                route("admin.orders.index"),
                { search, status },
                { preserveState: true, replace: true },
            );
        }, 400);
        return () => clearTimeout(timeout);
    }, [search, status]);

    const clearFilters = () => {
        setSearch("");
        setStatus("");
    };

    const hasFilters = search || status;

    const getStatusBadge = (status) => {
        const styles = {
            placed: "bg-blue-500/10 text-blue-400 border-blue-500/30",
            processing: "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",
            shipped: "bg-purple-500/10 text-purple-400 border-purple-500/30",
            delivered: "bg-green-500/10 text-green-400 border-green-500/30",
            cancelled: "bg-red-500/10 text-red-400 border-red-500/30",
            returned: "bg-slate-500/10 text-slate-400 border-slate-500/30",
        };
        return (
            styles[status] ||
            "bg-slate-500/10 text-slate-400 border-slate-500/30"
        );
    };

    // Status filter pill styles
    const getStatusFilterStyle = (s) => {
        const active = status === s;
        const styles = {
            placed: active
                ? "bg-blue-500/20 text-blue-400 border-blue-500/50"
                : "bg-slate-800/40 text-slate-400 border-slate-700/50 hover:border-blue-500/30 hover:text-blue-400",
            processing: active
                ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/50"
                : "bg-slate-800/40 text-slate-400 border-slate-700/50 hover:border-yellow-500/30 hover:text-yellow-400",
            shipped: active
                ? "bg-purple-500/20 text-purple-400 border-purple-500/50"
                : "bg-slate-800/40 text-slate-400 border-slate-700/50 hover:border-purple-500/30 hover:text-purple-400",
            delivered: active
                ? "bg-green-500/20 text-green-400 border-green-500/50"
                : "bg-slate-800/40 text-slate-400 border-slate-700/50 hover:border-green-500/30 hover:text-green-400",
            cancelled: active
                ? "bg-red-500/20 text-red-400 border-red-500/50"
                : "bg-slate-800/40 text-slate-400 border-slate-700/50 hover:border-red-500/30 hover:text-red-400",
            returned: active
                ? "bg-slate-500/20 text-slate-300 border-slate-500/50"
                : "bg-slate-800/40 text-slate-400 border-slate-700/50 hover:border-slate-500/30 hover:text-slate-300",
        };
        return styles[s] || "";
    };

    return (
        <AdminLayout>
            <Head title="Orders" />

            {/* Header */}
            <div className="mb-6">
                <div className="flex items-start justify-between mb-6">
                    <div>
                        <div className="flex items-center gap-3 mb-1">
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">
                                Orders
                            </h1>
                            <span className="px-3 py-1 rounded-full bg-green-500/15 text-green-400 text-sm font-semibold border border-green-500/30">
                                {totalOrders} total
                            </span>
                        </div>
                        <p className="text-slate-400 text-sm mt-1">
                            Manage customer orders and update fulfillment
                            status.
                        </p>
                    </div>

                    <button
                        onClick={() =>
                            (window.location.href = route(
                                "admin.orders.export",
                            ))
                        }
                        className="flex items-center gap-2 px-4 py-3 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 text-slate-950 font-semibold hover:shadow-lg hover:shadow-green-500/20 transition-all duration-300 hover:-translate-y-0.5"
                    >
                        <Download size={18} />
                        Export CSV
                    </button>
                </div>

                {/* Search + Status Filters */}
                <div className="flex flex-col gap-3">
                    {/* Search bar */}
                    <div className="relative max-w-sm">
                        <Search
                            size={15}
                            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
                        />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search by order ID or customer…"
                            className="w-full bg-slate-800/40 border border-slate-700/50 rounded-lg pl-9 pr-4 py-2.5 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-green-500/50 transition-colors"
                        />
                    </div>

                    {/* Status filter pills */}
                    <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs text-slate-500 font-medium">
                            Filter:
                        </span>

                        {statuses.map((s) => (
                            <button
                                key={s}
                                onClick={() => setStatus(status === s ? "" : s)}
                                className={`px-3 py-1.5 rounded-full text-xs font-semibold capitalize border transition-all duration-150 ${getStatusFilterStyle(s)}`}
                            >
                                {s}
                            </button>
                        ))}

                        {/* Clear filters */}
                        {hasFilters && (
                            <button
                                onClick={clearFilters}
                                className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold border border-slate-700/50 text-slate-400 hover:text-slate-200 hover:border-slate-500 transition-all"
                            >
                                <X size={11} />
                                Clear
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Table */}
            {orders.data.length === 0 ? (
                <div className="bg-slate-800/30 border border-slate-700/50 rounded-lg p-12 text-center">
                    <div className="text-4xl mb-3">📦</div>
                    <h3 className="text-lg font-semibold text-slate-200 mb-2">
                        No orders found.
                    </h3>
                    <p className="text-slate-400 text-sm">
                        {hasFilters
                            ? "No orders match your current filters."
                            : "Orders will appear here once customers start placing them."}
                    </p>
                    {hasFilters && (
                        <button
                            onClick={clearFilters}
                            className="mt-4 px-4 py-2 rounded-lg text-sm font-medium border border-slate-700/50 text-slate-400 hover:text-slate-200 transition-all"
                        >
                            Clear filters
                        </button>
                    )}
                </div>
            ) : (
                <div className="bg-slate-800/20 border border-slate-700/50 rounded-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-slate-700/50 bg-slate-800/40">
                                    <th className="text-left px-6 py-4 text-slate-300 font-semibold text-xs uppercase tracking-wide">
                                        Order
                                    </th>
                                    <th className="text-left px-6 py-4 text-slate-300 font-semibold text-xs uppercase tracking-wide">
                                        Customer
                                    </th>
                                    <th className="text-left px-6 py-4 text-slate-300 font-semibold text-xs uppercase tracking-wide">
                                        Total
                                    </th>
                                    <th className="text-left px-6 py-4 text-slate-300 font-semibold text-xs uppercase tracking-wide">
                                        Status
                                    </th>
                                    <th className="text-left px-6 py-4 text-slate-300 font-semibold text-xs uppercase tracking-wide">
                                        Date
                                    </th>
                                    <th className="text-right px-6 py-4 text-slate-300 font-semibold text-xs uppercase tracking-wide">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.data.map((order) => (
                                    <tr
                                        key={order.id}
                                        className="border-b border-slate-700/30 hover:bg-slate-800/40 transition-colors duration-200"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-lg bg-green-500/10 border border-green-500/25 flex items-center justify-center text-green-400 font-semibold text-xs flex-shrink-0">
                                                    #
                                                    {String(order.id).slice(-2)}
                                                </div>
                                                <span className="font-semibold text-slate-100">
                                                    #{order.id}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-slate-300">
                                            {order.user?.name}
                                        </td>
                                        <td className="px-6 py-4 font-medium text-slate-100 tabular-nums">
                                            ₹
                                            {Number(
                                                order.total,
                                            ).toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold capitalize border ${getStatusBadge(order.status)}`}
                                            >
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-500">
                                            {new Date(
                                                order.created_at,
                                            ).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <Link
                                                href={route(
                                                    "admin.orders.show",
                                                    order.id,
                                                )}
                                                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-green-500/8 text-green-400 hover:bg-green-500/18 border border-green-500/28 hover:border-green-500/50 transition-all duration-200 text-sm font-medium"
                                            >
                                                <Eye size={14} />
                                                View
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Footer + Pagination */}
                    <div className="bg-slate-800/40 border-t border-slate-700/50 px-6 py-3 flex items-center justify-between">
                        <p className="text-sm text-slate-400">
                            Showing {orders.from}–{orders.to} of {orders.total}{" "}
                            orders
                        </p>
                        <div className="flex items-center gap-1">
                            {orders.links.map((link, i) => (
                                <Link
                                    key={i}
                                    href={link.url ?? "#"}
                                    preserveState
                                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all
                                        ${
                                            !link.url
                                                ? "text-slate-600 cursor-not-allowed pointer-events-none"
                                                : link.active
                                                  ? "bg-green-500/20 text-green-400 border border-green-500/40"
                                                  : "text-slate-400 hover:bg-slate-700/50 hover:text-slate-200"
                                        }`}
                                    dangerouslySetInnerHTML={{
                                        __html: link.label,
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
