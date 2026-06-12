"use strict";

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
import AppSelect from "@/Components/ui/AppSelect";
import { useEffect } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

export default function Index() {
    const { flash } = usePage().props;

    useEffect(() => {
        if (flash?.success) toast.success(flash.success);
        if (flash?.error) toast.error(flash.error);
    }, [flash]);
    const { discounts, totalCount, stats, filters } = usePage().props;
    const [deleteId, setDeleteId] = useState(null);

    const handleDelete = (id) => {
        Swal.fire({
            title: "Delete this discount?",
            text: "This action cannot be undone.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#e3342f",
            cancelButtonColor: "#6c757d",
            confirmButtonText: "Yes, delete it!",
            background: "#1e293b",
            color: "#f1f5f9",
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route("discounts.destroy", id));
            }
        });
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

    const getDiscountStatus = (discount) => {
        const now = new Date();

        // is_active=0 means manually disabled
        if (!discount.is_active) {
            return "inactive";
        }

        // Has a start date that hasn't arrived yet
        if (discount.starts_at) {
            const startDate = new Date(discount.starts_at);
            if (startDate > now) return "scheduled";
        }

        // Has an end date that has passed
        if (discount.ends_at) {
            const endDate = new Date(discount.ends_at);
            if (endDate < now) return "expired";
        }

        return "active";
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
                                {totalCount} total
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
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-slate-800/40 border border-slate-700/50 rounded-lg p-4 backdrop-blur-sm">
                        <p className="text-slate-400 text-sm font-medium">
                            Active
                        </p>
                        <p className="text-3xl font-bold text-emerald-400 mt-1">
                            {stats?.active || 0}
                        </p>
                    </div>
                    <div className="bg-slate-800/40 border border-slate-700/50 rounded-lg p-4 backdrop-blur-sm">
                        <p className="text-slate-400 text-sm font-medium">
                            Scheduled
                        </p>
                        <p className="text-3xl font-bold text-blue-400 mt-1">
                            {stats?.scheduled || 0}
                        </p>
                    </div>
                    <div className="bg-slate-800/40 border border-slate-700/50 rounded-lg p-4 backdrop-blur-sm">
                        <p className="text-slate-400 text-sm font-medium">
                            Inactive
                        </p>
                        <p className="text-3xl font-bold text-rose-400 mt-1">
                            {stats?.inactive || 0}
                        </p>
                    </div>
                    <div className="bg-slate-800/40 border border-slate-700/50 rounded-lg p-4 backdrop-blur-sm">
                        <p className="text-slate-400 text-sm font-medium">
                            Expired
                        </p>
                        <p className="text-3xl font-bold text-slate-400 mt-1">
                            {stats?.expired || 0}
                        </p>
                    </div>
                </div>
            </div>

            <div className="mb-6 flex items-center justify-between gap-4 bg-slate-800/20 border border-slate-700/50 rounded-lg p-4">
                <div className="flex items-center gap-2">
                    <input
                        type="text"
                        placeholder="Search discounts..."
                        defaultValue={filters.search}
                        onChange={(e) =>
                            router.get(
                                route("discounts.index"),
                                {
                                    search: e.target.value,
                                    status: filters.status,
                                },
                                { preserveState: true, replace: true },
                            )
                        }
                        className="w-72 px-4 py-2.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-red-500/50 transition-colors"
                    />
                    {(filters.search || filters.status) && (
                        <button
                            onClick={() =>
                                router.get(
                                    route("discounts.index"),
                                    {},
                                    { preserveState: false },
                                )
                            }
                            className="px-4 py-2.5 rounded-lg bg-slate-800/60 border border-slate-700/50 text-slate-400 hover:text-red-400 hover:border-red-500/30 text-sm font-medium transition-all duration-200 whitespace-nowrap"
                        >
                            Clear Filters
                        </button>
                    )}
                </div>

                <AppSelect
                    value={filters.status || ""}
                    onChange={(val) =>
                        router.get(
                            route("discounts.index"),
                            { search: filters.search, status: val },
                            { preserveState: true, replace: true },
                        )
                    }
                    placeholder="All Status"
                    className="w-48"
                    options={[
                        { value: "", label: "All Status" },
                        { value: "active", label: "Active" },
                        { value: "inactive", label: "Inactive" },
                        { value: "scheduled", label: "Scheduled" },
                        { value: "expired", label: "Expired" },
                    ]}
                />
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
                                    const active = discount.is_active;
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
                                                {(() => {
                                                    const status =
                                                        getDiscountStatus(
                                                            discount,
                                                        );
                                                    const statusConfig = {
                                                        active: {
                                                            label: "Active",
                                                            icon: (
                                                                <ShieldCheck
                                                                    size={12}
                                                                />
                                                            ),
                                                            classes:
                                                                "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
                                                        },
                                                        inactive: {
                                                            label: "Inactive",
                                                            icon: (
                                                                <ShieldAlert
                                                                    size={12}
                                                                />
                                                            ),
                                                            classes:
                                                                "bg-rose-500/10 text-rose-400 border-rose-500/20",
                                                        },
                                                        scheduled: {
                                                            label: "Scheduled",
                                                            icon: (
                                                                <Calendar
                                                                    size={12}
                                                                />
                                                            ),
                                                            classes:
                                                                "bg-blue-500/10 text-blue-400 border-blue-500/20",
                                                        },
                                                        expired: {
                                                            label: "Expired",
                                                            icon: (
                                                                <ShieldAlert
                                                                    size={12}
                                                                />
                                                            ),
                                                            classes:
                                                                "bg-slate-500/10 text-slate-400 border-slate-500/20",
                                                        },
                                                    };
                                                    const config =
                                                        statusConfig[status];
                                                    return (
                                                        <span
                                                            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border ${config.classes}`}
                                                        >
                                                            {config.icon}{" "}
                                                            {config.label}
                                                        </span>
                                                    );
                                                })()}
                                            </td>

                                            <td className="px-6 py-4 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Link
                                                        href={route(
                                                            "discounts.edit",
                                                            discount.id,
                                                        )}
                                                        className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 border border-cyan-500/30 hover:border-cyan-500/50 transition-all duration-200"
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

                    {/* Table Footer */}
                    <div className="bg-slate-800/40 border-t border-slate-700/50 px-6 py-4">
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                            {/* Showing count */}
                            <p className="text-sm text-slate-400">
                                Showing{" "}
                                <span className="text-slate-200 font-medium">
                                    {discounts.from}
                                </span>{" "}
                                -{" "}
                                <span className="text-slate-200 font-medium">
                                    {discounts.to}
                                </span>{" "}
                                of{" "}
                                <span className="text-slate-200 font-medium">
                                    {discounts.total}
                                </span>{" "}
                                discounts
                            </p>

                            {/* Pagination */}
                            <div className="flex items-center gap-1">
                                {discounts.links.map((link, index) => (
                                    <button
                                        key={index}
                                        disabled={!link.url}
                                        onClick={() => {
                                            if (link.url) {
                                                router.visit(link.url, {
                                                    preserveState: true,
                                                });
                                            }
                                        }}
                                        className={`min-w-[36px] h-9 px-3 rounded-lg text-sm font-medium border transition-all duration-200 ${
                                            link.active
                                                ? "bg-red-500/20 text-red-400 border-red-500/50"
                                                : !link.url
                                                  ? "bg-transparent text-slate-600 border-transparent cursor-not-allowed"
                                                  : "bg-slate-800/60 text-slate-300 border-slate-700/50 hover:bg-slate-700/60 hover:text-white hover:border-slate-600"
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
