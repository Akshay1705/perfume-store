import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import { Eye, Download } from "lucide-react";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function Index({ orders }) {
    const { flash } = usePage().props;

    useEffect(() => {
        if (flash?.success) toast.success(flash.success);
        if (flash?.error) toast.error(flash.error);
    }, [flash]);

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

    const statusCounts = orders.data.reduce((acc, order) => {
        acc[order.status] = (acc[order.status] || 0) + 1;
        return acc;
    }, {});

    return (
        <AdminLayout>
            <Head title="Orders" />

            <div className="mb-8">
                <div className="flex items-start justify-between mb-6">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">
                                Orders
                            </h1>
                            {statusCounts.delivered > 0 && (
                                <span className="px-3 py-1 rounded-full bg-green-500/15 text-green-400 text-sm font-semibold border border-green-500/30">
                                    {statusCounts.delivered} delivered
                                </span>
                            )}
                            {statusCounts.processing > 0 && (
                                <span className="px-3 py-1 rounded-full bg-yellow-500/15 text-yellow-400 text-sm font-semibold border border-yellow-500/30">
                                    {statusCounts.processing} processing
                                </span>
                            )}
                            {statusCounts.placed > 0 && (
                                <span className="px-3 py-1 rounded-full bg-blue-500/15 text-blue-400 text-sm font-semibold border border-blue-500/30">
                                    {statusCounts.placed} placed
                                </span>
                            )}
                        </div>
                        <p className="text-slate-400 text-sm">
                            Manage customer orders and update fulfillment
                            status.
                        </p>
                    </div>

                    <button className="group flex items-center gap-2 px-4 py-3 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 text-slate-950 font-semibold hover:shadow-lg hover:shadow-green-500/20 transition-all duration-300 hover:-translate-y-0.5">
                        <Download size={18} />
                        Export Orders
                    </button>
                </div>
            </div>

            {orders.data.length === 0 ? (
                <div className="bg-slate-800/30 border border-slate-700/50 rounded-lg p-12 text-center backdrop-blur-sm">
                    <div className="text-5xl mb-3">📦</div>
                    <h3 className="text-lg font-semibold text-slate-200 mb-2">
                        No orders yet
                    </h3>
                    <p className="text-slate-400">
                        Orders will appear here once customers start placing
                        them.
                    </p>
                </div>
            ) : (
                <div className="bg-slate-800/20 border border-slate-700/50 rounded-lg overflow-hidden backdrop-blur-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-slate-700/50 bg-slate-800/40">
                                    <th className="text-left px-6 py-4 text-slate-300 font-semibold text-sm uppercase tracking-wide">
                                        Order
                                    </th>
                                    <th className="text-left px-6 py-4 text-slate-300 font-semibold text-sm uppercase tracking-wide">
                                        Customer
                                    </th>
                                    <th className="text-left px-6 py-4 text-slate-300 font-semibold text-sm uppercase tracking-wide">
                                        Total
                                    </th>
                                    <th className="text-left px-6 py-4 text-slate-300 font-semibold text-sm uppercase tracking-wide">
                                        Status
                                    </th>
                                    <th className="text-left px-6 py-4 text-slate-300 font-semibold text-sm uppercase tracking-wide">
                                        Date
                                    </th>
                                    <th className="text-right px-6 py-4 text-slate-300 font-semibold text-sm uppercase tracking-wide">
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
                                        {/* Order ID Cell */}
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

                                        {/* Customer Cell */}
                                        <td className="px-6 py-4 text-slate-300">
                                            {order.user?.name}
                                        </td>

                                        {/* Total Cell */}
                                        <td className="px-6 py-4 font-medium text-slate-100 tabular-nums">
                                            ₹
                                            {Number(
                                                order.total,
                                            ).toLocaleString()}
                                        </td>

                                        {/* Status Cell */}
                                        <td className="px-6 py-4">
                                            <span
                                                className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold capitalize ${getStatusBadge(order.status)}`}
                                            >
                                                {order.status}
                                            </span>
                                        </td>

                                        {/* Date Cell */}
                                        <td className="px-6 py-4 text-sm text-slate-500">
                                            {new Date(
                                                order.created_at,
                                            ).toLocaleDateString()}
                                        </td>

                                        {/* Action Cell */}
                                        <td className="px-6 py-4 text-right">
                                            <Link
                                                href={route(
                                                    "admin.orders.show",
                                                    order.id,
                                                )}
                                                className="inline-flex items-center gap-2 p-2 px-4 rounded-lg bg-green-500/8 text-green-400 hover:bg-green-500/18 border border-green-500/28 hover:border-green-500/50 transition-all duration-200 text-sm font-medium"
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

                    {/* Footer */}
                    <div className="bg-slate-800/40 border-t border-slate-700/50 px-6 py-3 text-sm text-slate-400">
                        Showing {orders.data.length} orders
                        {statusCounts.delivered
                            ? ` · ${statusCounts.delivered} delivered`
                            : ""}
                        {statusCounts.processing
                            ? ` · ${statusCounts.processing} processing`
                            : ""}
                        {statusCounts.placed
                            ? ` · ${statusCounts.placed} placed`
                            : ""}
                        {statusCounts.shipped
                            ? ` · ${statusCounts.shipped} shipped`
                            : ""}
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}