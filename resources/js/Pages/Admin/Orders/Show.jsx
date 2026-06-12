"use strict";

import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import {ArrowLeft, User, MapPin, Package, Receipt, RefreshCw, Check,} from "lucide-react";

export default function Show({ order, statuses }) {
    const { data, setData, patch, processing } = useForm({
        status: order.status,
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route("admin.orders.update", order.id));
    };

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

    return (
        <AdminLayout>
            <Head title={`Order #${order.id}`} />

            <div className="space-y-5">
                {/* Header */}
                <div className="flex items-start justify-between">
                    <div>
                        <Link
                            href={route("admin.orders.index")}
                            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-slate-200 mb-3 transition-colors"
                        >
                            <ArrowLeft size={14} />
                            All orders
                        </Link>

                        <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">
                            Order #{order.id}
                        </h1>

                        <p className="text-slate-400 text-sm mt-1">
                            Placed on{" "}
                            {new Date(order.created_at).toLocaleDateString(
                                "en-IN",
                                {
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric",
                                },
                            )}{" "}
                            · Manage details and fulfillment
                        </p>

                        <span
                            className={`inline-flex mt-2 px-3 py-1 rounded-full text-xs font-semibold capitalize border ${getStatusBadge(order.status)}`}
                        >
                            {order.status}
                        </span>
                    </div>
                </div>

                {/* Customer + Address */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="bg-slate-800/20 border border-slate-700/50 rounded-lg overflow-hidden">
                        <div className="flex items-center gap-2 px-5 py-3 border-b border-slate-700/30 bg-slate-800/40">
                            <User size={14} className="text-green-400" />
                            <h2 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                                Customer
                            </h2>
                        </div>
                        <div className="p-5 space-y-3">
                            <div>
                                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                                    Name
                                </p>
                                <p className="text-sm text-slate-200">
                                    {order.user?.name}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                                    Email
                                </p>
                                <p className="text-sm text-green-400">
                                    {order.user?.email}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-800/20 border border-slate-700/50 rounded-lg overflow-hidden">
                        <div className="flex items-center gap-2 px-5 py-3 border-b border-slate-700/30 bg-slate-800/40">
                            <MapPin size={14} className="text-green-400" />
                            <h2 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                                Shipping address
                            </h2>
                        </div>
                        <div className="p-5">
                            {order.address ? (
                                <div className="space-y-3">
                                    <div>
                                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                                            Recipient
                                        </p>
                                        <p className="text-sm text-slate-200">
                                            {order.address.full_name} ·{" "}
                                            {order.address.phone}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                                            Address
                                        </p>
                                        <p className="text-sm text-slate-200 leading-relaxed">
                                            {order.address.address_line_1}
                                            {order.address.address_line_2 && (
                                                <>
                                                    ,{" "}
                                                    {
                                                        order.address
                                                            .address_line_2
                                                    }
                                                </>
                                            )}
                                            <br />
                                            {order.address.city},{" "}
                                            {order.address.state} —{" "}
                                            {order.address.postal_code}
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <p className="text-sm text-slate-500">
                                    No address attached.
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Order Items */}
                <div className="bg-slate-800/20 border border-slate-700/50 rounded-lg overflow-hidden">
                    <div className="flex items-center gap-2 px-5 py-3 border-b border-slate-700/30 bg-slate-800/40">
                        <Package size={14} className="text-green-400" />
                        <h2 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                            Order items
                        </h2>
                    </div>

                    <div className="divide-y divide-slate-700/20">
                        {order.items.map((item) => (
                            <div
                                key={item.id}
                                className="flex items-center justify-between px-5 py-4"
                            >
                                <div className="flex items-center gap-4">
                                    <img
                                        src={
                                            item.variant?.primary_image?.url ||
                                            item.variant?.primaryImage?.url ||
                                            "/images/placeholder.jpg"
                                        }
                                        alt={item.variant?.product?.name}
                                        className="w-12 h-12 object-cover rounded-lg border border-green-500/20 bg-green-500/5"
                                    />
                                    <div>
                                        <p className="text-sm font-semibold text-slate-100">
                                            {item.variant?.product?.name}
                                        </p>
                                        <p className="text-xs text-slate-500 mt-0.5">
                                            Volume: {item.variant?.volume} ·
                                            Qty: {item.quantity}
                                        </p>
                                    </div>
                                </div>
                                <p className="text-sm font-semibold text-slate-100 tabular-nums">
                                    ₹{Number(item.unit_price).toLocaleString()}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Summary + Status */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="bg-slate-800/20 border border-slate-700/50 rounded-lg overflow-hidden">
                        <div className="flex items-center gap-2 px-5 py-3 border-b border-slate-700/30 bg-slate-800/40">
                            <Receipt size={14} className="text-green-400" />
                            <h2 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                                Order summary
                            </h2>
                        </div>
                        <div className="p-5 space-y-1">
                            <div className="flex justify-between py-2.5 border-b border-slate-700/20 text-sm">
                                <span className="text-slate-400">Subtotal</span>
                                <span className="text-slate-200 tabular-nums">
                                    ₹{Number(order.subtotal).toLocaleString()}
                                </span>
                            </div>
                            <div className="flex justify-between py-2.5 border-b border-slate-700/20 text-sm">
                                <span className="text-slate-400">Discount</span>
                                <span className="text-red-400 tabular-nums">
                                    − ₹
                                    {Number(
                                        order.discount_amount,
                                    ).toLocaleString()}
                                </span>
                            </div>
                            <div className="flex justify-between pt-3 mt-1">
                                <span className="font-bold text-slate-100">
                                    Total
                                </span>
                                <span className="font-bold text-green-400 text-lg tabular-nums">
                                    ₹{Number(order.total).toLocaleString()}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-800/20 border border-slate-700/50 rounded-lg overflow-hidden">
                        <div className="flex items-center gap-2 px-5 py-3 border-b border-slate-700/30 bg-slate-800/40">
                            <RefreshCw size={14} className="text-green-400" />
                            <h2 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                                Update status
                            </h2>
                        </div>
                        <div className="p-5">
                            <form onSubmit={submit} className="space-y-4">
                                <div className="relative">
                                    <select
                                        value={data.status}
                                        onChange={(e) =>
                                            setData("status", e.target.value)
                                        }
                                        className="w-full appearance-none bg-slate-900/60 border border-slate-600/50 rounded-lg px-4 py-3 text-slate-200 text-sm focus:outline-none focus:border-green-500/50 transition-colors cursor-pointer"
                                    >
                                        {statuses.map((status) => (
                                            <option
                                                key={status}
                                                value={status}
                                                className="bg-slate-900"
                                            >
                                                {status
                                                    .charAt(0)
                                                    .toUpperCase() +
                                                    status.slice(1)}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                                        ▾
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    href="/admin/orders"
                                    disabled={processing}
                                    className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 text-slate-950 font-bold text-sm hover:shadow-lg hover:shadow-green-500/20 hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                                >
                                    <Check size={15} />
                                    {processing ? "Updating…" : "Update status"}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
