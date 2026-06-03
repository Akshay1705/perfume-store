import React, { useState } from "react";
import { Link, usePage, router } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import {
    Edit,
    Trash2,
    Plus,
    Percent,
    Calendar,
    ShieldCheck,
    ShieldAlert,
} from "lucide-react";

export default function Index() {
    const { discounts, stats, filters } = usePage().props;
    const [deleteId, setDeleteId] = useState(null);

    const handleDelete = (id) => {
        if (confirm("Are you sure? This action cannot be undone.")) {
            router.delete(route("discounts.destroy", id), {
                onSuccess: () => setDeleteId(null),
            });
        }
    };

    const getTargetLabel = (discount) => {
        switch (discount.target_type) {
            case "all":
                return "All Products";
            case "user":
                return `User: ${discount.user?.name || "N/A"}`;
            case "brand":
                return `Brand: ${discount.brand?.name || "N/A"}`;
            case "category":
                return `Category: ${discount.category?.name || "N/A"}`;
            default:
                return "N/A";
        }
    };

    const getValueLabel = (discount) => {
        return discount.type === "percentage"
            ? `${discount.value}%`
            : `₹${Number(discount.value).toFixed(2)}`;
    };

    const isDiscountActive = (discount) => {
        // Force evaluation to check explicitly for 1 or true
        if (discount.is_active !== 1 && discount.is_active !== true)
            return false;

        const now = new Date();
        now.setHours(0, 0, 0, 0); // Clear out time variances

        if (discount.starts_at) {
            const startDate = new Date(discount.starts_at);
            startDate.setHours(0, 0, 0, 0);
            if (startDate > now) return false;
        }

        if (discount.ends_at) {
            const endDate = new Date(discount.ends_at);
            endDate.setHours(0, 0, 0, 0);
            if (endDate < now) return false;
        }

        return true;
    };

    return (
        <AdminLayout>
            {/* Header Section */}
            <div className="mb-8">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-red-400 to-rose-500 bg-clip-text text-transparent">
                                Discounts
                            </h1>
                            <span className="px-3 py-1 rounded-full bg-red-500/15 text-red-400 text-sm font-semibold border border-red-500/30">
                                {stats?.total || 0} total
                            </span>
                        </div>
                        <p className="text-slate-400 text-sm">
                            Manage promotional campaigns, codes, and target
                            allocations
                        </p>
                    </div>

                    <Link
                        href={route("discounts.create")}
                        className="group flex items-center gap-2 px-4 py-3 rounded-lg bg-gradient-to-r from-red-500 to-rose-600 text-white font-semibold hover:shadow-lg hover:shadow-red-500/20 transition-all duration-300 hover:-translate-y-0.5"
                    >
                        <Plus size={18} />
                        Create Discount
                    </Link>
                </div>

                {/* Stats Bar */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-slate-800/40 border border-slate-700/50 rounded-lg p-4 backdrop-blur-sm">
                        <p className="text-slate-400 text-sm font-medium">
                            Active Campaigns
                        </p>
                        <p className="text-3xl font-bold text-emerald-400 mt-1">
                            {stats?.active || 0}
                        </p>
                    </div>
                    <div className="bg-slate-800/40 border border-slate-700/50 rounded-lg p-4 backdrop-blur-sm">
                        <p className="text-slate-400 text-sm font-medium">
                            Scheduled / Paused
                        </p>
                        <p className="text-3xl font-bold text-rose-400 mt-1">
                            {stats?.inactive || 0}
                        </p>
                    </div>
                    <div className="bg-slate-800/40 border border-slate-700/50 rounded-lg p-4 backdrop-blur-sm">
                        <p className="text-slate-400 text-sm font-medium">
                            Percentage Types
                        </p>
                        <p className="text-3xl font-bold text-red-400 mt-1">
                            {stats?.by_type?.percentage || 0}
                        </p>
                    </div>
                </div>
            </div>

            <div className="mb-6 flex items-center justify-between gap-4 bg-slate-800/20 border border-slate-700/50 rounded-lg p-4">
                <input
                    type="text"
                    placeholder="Search discounts..."
                    defaultValue={filters.search}
                    onChange={(e) =>
                        router.get(
                            route("discounts.index"),
                            { search: e.target.value, status: filters.status },
                            { preserveState: true, replace: true },
                        )
                    }
                    className="w-72 px-4 py-2.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-red-500/50 transition-colors"
                />

                <select
                    defaultValue={filters.status}
                    onChange={(e) =>
                        router.get(
                            route("discounts.index"),
                            { search: filters.search, status: e.target.value },
                            { preserveState: true, replace: true },
                        )
                    }
                    className="px-4 py-2.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-100 focus:outline-none focus:border-red-500/50 transition-colors"
                >
                    <option value="">All Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                </select>
            </div>

            {/* Table Section */}
            {!discounts || discounts.data.length === 0 ? (
                <div className="bg-slate-800/30 border border-slate-700/50 rounded-lg p-12 text-center backdrop-blur-sm">
                    <div className="text-5xl mb-3">🎟️</div>
                    <h3 className="text-lg font-semibold text-slate-200 mb-2">
                        No discounts yet
                    </h3>
                    <p className="text-slate-400 mb-6">
                        Start by creating your first promotional code or rule
                    </p>
                    <Link
                        href={route("discounts.create")}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-400 transition-all"
                    >
                        <Plus size={16} />
                        Create First Discount
                    </Link>
                </div>
            ) : (
                <div className="bg-slate-800/20 border border-slate-700/50 rounded-lg overflow-hidden backdrop-blur-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-slate-700/50 bg-slate-800/40">
                                    <th className="text-left px-6 py-4 text-slate-300 font-semibold text-sm uppercase tracking-wide">
                                        Name
                                    </th>
                                    <th className="text-left px-6 py-4 text-slate-300 font-semibold text-sm uppercase tracking-wide">
                                        Code
                                    </th>
                                    <th className="text-left px-6 py-4 text-slate-300 font-semibold text-sm uppercase tracking-wide">
                                        Value
                                    </th>
                                    <th className="text-left px-6 py-4 text-slate-300 font-semibold text-sm uppercase tracking-wide">
                                        Target Scope
                                    </th>
                                    <th className="text-left px-6 py-4 text-slate-300 font-semibold text-sm uppercase tracking-wide">
                                        Min Order
                                    </th>
                                    <th className="text-left px-6 py-4 text-slate-300 font-semibold text-sm uppercase tracking-wide">
                                        Expiration
                                    </th>
                                    <th className="text-left px-6 py-4 text-slate-300 font-semibold text-sm uppercase tracking-wide">
                                        Status
                                    </th>
                                    <th className="text-right px-6 py-4 text-slate-300 font-semibold text-sm uppercase tracking-wide">
                                        Actions
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-slate-700/30">
                                {discounts.data.map((discount) => {
                                    const active = isDiscountActive(discount);
                                    return (
                                        <tr
                                            key={discount.id}
                                            className="border-b border-slate-700/30 hover:bg-slate-800/40 transition-colors duration-200 group"
                                        >
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-400/20 to-rose-500/20 border border-red-500/30 flex items-center justify-center text-red-400 font-semibold">
                                                        {discount.type ===
                                                        "percentage" ? (
                                                            <Percent
                                                                size={16}
                                                            />
                                                        ) : (
                                                            <span className="text-base font-bold">
                                                                ₹
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-slate-100">
                                                            {discount.name}
                                                        </p>
                                                        {/* <p className="text-xs text-slate-500 mt-0.5">
                                                            ID: {discount.id}
                                                        </p> */}
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="px-6 py-4">
                                                {discount.code ? (
                                                    <span className="px-3 py-1 rounded-full bg-slate-700/40 text-red-400 border border-red-500/10 text-sm font-mono tracking-wider">
                                                        {discount.code}
                                                    </span>
                                                ) : (
                                                    <span className="text-slate-500 text-sm italic">
                                                        Auto-Applied
                                                    </span>
                                                )}
                                            </td>

                                            <td className="px-6 py-4 text-slate-200 font-semibold text-sm">
                                                {getValueLabel(discount)}
                                            </td>

                                            <td className="px-6 py-4 text-slate-300 text-sm">
                                                {getTargetLabel(discount)}
                                            </td>

                                            <td className="px-6 py-4 text-slate-300 text-sm">
                                                {discount.min_order_amount &&
                                                Number(
                                                    discount.min_order_amount,
                                                ) > 0 ? (
                                                    `₹${Number(discount.min_order_amount).toFixed(2)}`
                                                ) : (
                                                    <span className="text-slate-500">
                                                        ₹0.00
                                                    </span>
                                                )}
                                            </td>

                                            <td className="px-6 py-4 text-slate-300 text-sm">
                                                <div className="flex items-center gap-1.5 text-slate-400">
                                                    <Calendar
                                                        size={14}
                                                        className="text-slate-500"
                                                    />
                                                    <span>
                                                        {discount.ends_at
                                                            ? new Date(
                                                                  discount.ends_at,
                                                              ).toLocaleDateString()
                                                            : "Never"}
                                                    </span>
                                                </div>
                                            </td>

                                            <td className="px-6 py-4">
                                                <span
                                                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border ${
                                                        active
                                                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                                                            : "bg-rose-500/10 text-rose-400 border-rose-500/20"
                                                    }`}
                                                >
                                                    {active ? (
                                                        <>
                                                            <ShieldCheck
                                                                size={12}
                                                            />{" "}
                                                            Active
                                                        </>
                                                    ) : (
                                                        <>
                                                            <ShieldAlert
                                                                size={12}
                                                            />{" "}
                                                            Inactive
                                                        </>
                                                    )}
                                                </span>
                                            </td>

                                            <td className="px-6 py-4 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Link
                                                        href={route(
                                                            "discounts.edit",
                                                            discount.id,
                                                        )}
                                                        className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/30 hover:border-red-500/50 transition-all duration-200"
                                                        title="Edit"
                                                    >
                                                        <Edit size={16} />
                                                    </Link>

                                                    <button
                                                        onClick={() =>
                                                            handleDelete(
                                                                discount.id,
                                                            )
                                                        }
                                                        className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/30 hover:border-red-500/50 transition-all duration-200"
                                                        title="Delete"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    <div className="bg-slate-800/40 border-t border-slate-700/50 px-6 py-3 text-sm text-slate-400">
                        <div className="flex justify-between items-center">
                            <span>
                                Showing {discounts.from} - {discounts.to}
                                of {discounts.total} discounts
                            </span>

                            <div className="flex gap-2">
                                {discounts.links.map((link, index) => (
                                    <button
                                        key={index}
                                        disabled={!link.url}
                                        onClick={() => router.visit(link.url)}
                                        className={`px-3 py-1 rounded ${
                                            link.active
                                                ? "bg-red-500 text-white"
                                                : "bg-slate-700 text-slate-300"
                                        }`}
                                        dangerouslySetInnerHTML={{
                                            __html: link.label,
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
