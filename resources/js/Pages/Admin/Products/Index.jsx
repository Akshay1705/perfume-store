"use client";

import AdminLayout from "@/Layouts/AdminLayout";
import { Link, router, usePage } from "@inertiajs/react";
import {
    Edit,
    Trash2,
    Plus,
    ChevronRight,
    ChevronDown,
    RotateCcw,
} from "lucide-react";
import { useState } from "react";
import AppSelect from "@/Components/ui/AppSelect";
import { useEffect } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import React from "react";

export default function Index({
    products,
    totalCount,
    filters,
    categories,
    brands,
}) {
    const [expandedProducts, setExpandedProducts] = useState([]);
    const { flash } = usePage().props;

    useEffect(() => {
        if (flash?.success) toast.success(flash.success);
        if (flash?.error) toast.error(flash.error);
    }, [flash]);

    // --- Handlers ---

    const handleDelete = (id) => {
        Swal.fire({
            title: "Delete this product?",
            text: "It will be soft-deleted and can be restored later.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#e3342f",
            cancelButtonColor: "#6c757d",
            confirmButtonText: "Yes, delete it!",
            background: "#1e293b",
            color: "#f1f5f9",
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route("products.destroy", id));
            }
        });
    };

    const handleRestore = (id) => {
        Swal.fire({
            title: "Restore this product?",
            text: "It will become visible in the store again.",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#10b981",
            cancelButtonColor: "#6c757d",
            confirmButtonText: "Yes, restore it!",
            background: "#1e293b",
            color: "#f1f5f9",
        }).then((result) => {
            if (result.isConfirmed) {
                router.post(route("products.restore", id));
            }
        });
    };

    const handleForceDelete = (id) => {
        Swal.fire({
            title: "Permanently delete?",
            text: "This cannot be undone. Products with existing orders cannot be force-deleted.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#e3342f",
            cancelButtonColor: "#6c757d",
            confirmButtonText: "Yes, delete forever!",
            background: "#1e293b",
            color: "#f1f5f9",
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route("products.forceDelete", id));
            }
        });
    };

    const toggleProduct = (productId) => {
        setExpandedProducts((prev) =>
            prev.includes(productId)
                ? prev.filter((id) => id !== productId)
                : [...prev, productId],
        );
    };

    // --- Stats (only count non-deleted variants) ---
    const allVariants = products.data
        .filter((p) => !p.deleted_at)
        .flatMap((product) => product.variants || []);

    const inStockCount = allVariants.filter(
        (v) => v.is_active && Number(v.stock) > 0,
    ).length;

    const lowStockCount = allVariants.filter(
        (v) => v.is_active && Number(v.stock) > 0 && Number(v.stock) < 20,
    ).length;

    const outOfStockCount = allVariants.filter(
        (v) => v.is_active && Number(v.stock) === 0,
    ).length;

    const isViewingDeleted = filters.status === "deleted";

    return (
        <AdminLayout>
            {/* Header */}
            <div className="mb-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
                    <div>
                        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                                Products
                            </h1>
                            <span className="px-3 py-1 rounded-full bg-cyan-500/15 text-cyan-400 text-sm font-semibold border border-cyan-500/30 whitespace-nowrap">
                                {totalCount} total
                            </span>
                            {isViewingDeleted && (
                                <span className="px-3 py-1 rounded-full bg-red-500/15 text-red-400 text-sm font-semibold border border-red-500/30 whitespace-nowrap">
                                    Viewing Deleted
                                </span>
                            )}
                        </div>
                        <p className="text-slate-400 text-sm">
                            Manage your product catalog
                        </p>
                    </div>

                    {!isViewingDeleted && (
                        <Link
                            href={route("products.create")}
                            className="group flex items-center justify-center gap-2 w-full sm:w-auto px-4 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 hover:-translate-y-0.5"
                        >
                            <Plus size={18} />
                            Create Product
                        </Link>
                    )}
                </div>

                {/* Stats — hidden when viewing deleted since they're meaningless there */}
                {!isViewingDeleted && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-6">
                        <div className="bg-slate-800/40 border border-slate-700/50 rounded-lg p-3 sm:p-4 backdrop-blur-sm">
                            <p className="text-slate-400 text-xs sm:text-sm font-medium">
                                In Stock
                            </p>
                            <p className="text-2xl sm:text-3xl font-bold text-green-400 mt-1">
                                {inStockCount}
                            </p>
                        </div>
                        <div className="bg-slate-800/40 border border-slate-700/50 rounded-lg p-3 sm:p-4 backdrop-blur-sm">
                            <p className="text-slate-400 text-xs sm:text-sm font-medium">
                                Low Stock
                            </p>
                            <p className="text-2xl sm:text-3xl font-bold text-yellow-400 mt-1">
                                {lowStockCount}
                            </p>
                        </div>
                        <div className="bg-slate-800/40 border border-slate-700/50 rounded-lg p-3 sm:p-4 backdrop-blur-sm col-span-2 sm:col-span-1">
                            <p className="text-slate-400 text-xs sm:text-sm font-medium">
                                Out of Stock
                            </p>
                            <p className="text-2xl sm:text-3xl font-bold text-red-400 mt-1">
                                {outOfStockCount}
                            </p>
                        </div>
                    </div>
                )}
            </div>

            {/* Filters */}
            <div className="bg-slate-800/20 border border-slate-700/50 rounded-lg p-4 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    <input
                        type="text"
                        placeholder="Search products..."
                        defaultValue={filters.search || ""}
                        onChange={(e) =>
                            router.get(
                                route("products.index"),
                                { ...filters, search: e.target.value },
                                { preserveState: true, replace: true },
                            )
                        }
                        className="px-4 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-100"
                    />

                    <AppSelect
                        value={filters.category || ""}
                        onChange={(val) =>
                            router.get(
                                route("products.index"),
                                { ...filters, category: val },
                                { preserveState: true, replace: true },
                            )
                        }
                        placeholder="All Categories"
                        options={[
                            { value: "", label: "All Categories" },
                            ...categories.map((c) => ({
                                value: String(c.id),
                                label: c.name,
                            })),
                        ]}
                    />

                    <AppSelect
                        value={filters.brand || ""}
                        onChange={(val) =>
                            router.get(
                                route("products.index"),
                                { ...filters, brand: val },
                                { preserveState: true, replace: true },
                            )
                        }
                        placeholder="All Brands"
                        options={[
                            { value: "", label: "All Brands" },
                            ...brands.map((b) => ({
                                value: String(b.id),
                                label: b.name,
                            })),
                        ]}
                    />

                    <AppSelect
                        value={filters.gender || ""}
                        onChange={(val) =>
                            router.get(
                                route("products.index"),
                                { ...filters, gender: val },
                                { preserveState: true, replace: true },
                            )
                        }
                        placeholder="All Gender"
                        options={[
                            { value: "", label: "All Gender" },
                            { value: "men", label: "Men" },
                            { value: "women", label: "Women" },
                            { value: "unisex", label: "Unisex" },
                        ]}
                    />

                    {/* Status — now includes Deleted */}
                    <AppSelect
                        value={filters.status || ""}
                        onChange={(val) =>
                            router.get(
                                route("products.index"),
                                { ...filters, status: val },
                                { preserveState: true, replace: true },
                            )
                        }
                        placeholder="All Status"
                        options={[
                            { value: "", label: "All Status" },
                            { value: "active", label: "Active" },
                            { value: "inactive", label: "Inactive" },
                            { value: "deleted", label: "🗑 Deleted" },
                        ]}
                    />
                </div>
            </div>

            {(filters.search ||
                filters.category ||
                filters.brand ||
                filters.status ||
                filters.gender) && (
                <button
                    onClick={() =>
                        router.get(
                            route("products.index"),
                            {},
                            { preserveState: false },
                        )
                    }
                    className="px-4 py-2.5 mb-4 rounded-lg bg-slate-800/60 border border-slate-700/50 text-slate-400 hover:text-red-400 hover:border-red-500/30 text-sm font-medium transition-all duration-200 whitespace-nowrap"
                >
                    Clear Filters
                </button>
            )}

            {/* Table */}
            {products.data.length === 0 ? (
                <div className="bg-slate-800/30 border border-slate-700/50 rounded-lg p-12 text-center backdrop-blur-sm">
                    <div className="text-5xl mb-3">
                        {isViewingDeleted ? "🗑️" : "📦"}
                    </div>
                    <h3 className="text-lg font-semibold text-slate-200 mb-2">
                        {isViewingDeleted
                            ? "No deleted products"
                            : "No products yet"}
                    </h3>
                    <p className="text-slate-400 mb-6">
                        {isViewingDeleted
                            ? "Nothing in the trash."
                            : "Start by creating your first product"}
                    </p>
                    {!isViewingDeleted && (
                        <Link
                            href={route("products.create")}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500 text-white font-semibold hover:bg-cyan-400 transition-all"
                        >
                            <Plus size={16} />
                            Create First Product
                        </Link>
                    )}
                </div>
            ) : (
                <div className="bg-slate-800/20 border border-slate-700/50 rounded-lg overflow-hidden backdrop-blur-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-slate-700/50 bg-slate-800/40">
                                    <th className="w-12 text-left px-6 py-4 text-slate-300 font-semibold text-sm uppercase tracking-wide"></th>
                                    <th className="text-left px-6 py-4 text-slate-300 font-semibold text-sm uppercase tracking-wide">
                                        Image
                                    </th>
                                    <th className="text-left px-6 py-4 text-slate-300 font-semibold text-sm uppercase tracking-wide">
                                        Product
                                    </th>
                                    <th className="text-left px-6 py-4 text-slate-300 font-semibold text-sm uppercase tracking-wide">
                                        Category
                                    </th>
                                    <th className="text-left px-6 py-4 text-slate-300 font-semibold text-sm uppercase tracking-wide">
                                        Brand
                                    </th>
                                    <th className="text-center px-6 py-4 text-slate-300 font-semibold text-sm uppercase tracking-wide">
                                        Volume
                                    </th>
                                    <th className="text-center px-6 py-4 text-slate-300 font-semibold text-sm uppercase tracking-wide">
                                        Gender
                                    </th>
                                    <th className="text-right px-6 py-4 text-slate-300 font-semibold text-sm uppercase tracking-wide">
                                        Price
                                    </th>
                                    <th className="text-center px-6 py-4 text-slate-300 font-semibold text-sm uppercase tracking-wide">
                                        Stock
                                    </th>
                                    <th className="text-center px-6 py-4 text-slate-300 font-semibold text-sm uppercase tracking-wide">
                                        Status
                                    </th>
                                    <th className="text-right px-6 py-4 text-slate-300 font-semibold text-sm uppercase tracking-wide">
                                        Actions
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {products.data.map((product) => {
                                    const isDeleted = !!product.deleted_at;
                                    const totalStock =
                                        product.variants?.reduce(
                                            (sum, v) => sum + Number(v.stock),
                                            0,
                                        ) || 0;

                                    return (
                                        <React.Fragment key={product.id}>
                                            <tr
                                                className={`border-b border-slate-700/30 transition-colors duration-200 group ${
                                                    isDeleted
                                                        ? "opacity-50 bg-red-950/20"
                                                        : "hover:bg-slate-800/40"
                                                }`}
                                            >
                                                {/* Expand toggle */}
                                                <td className="px-4 py-4">
                                                    {product.variants?.length >
                                                        1 && (
                                                        <button
                                                            onClick={() =>
                                                                toggleProduct(
                                                                    product.id,
                                                                )
                                                            }
                                                            className="text-slate-400 hover:text-cyan-400"
                                                        >
                                                            {expandedProducts.includes(
                                                                product.id,
                                                            ) ? (
                                                                <ChevronDown
                                                                    size={18}
                                                                />
                                                            ) : (
                                                                <ChevronRight
                                                                    size={18}
                                                                />
                                                            )}
                                                        </button>
                                                    )}
                                                </td>

                                                {/* Image */}
                                                <td className="px-6 py-4">
                                                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-slate-700/40 flex items-center justify-center border border-slate-700/50">
                                                        {(() => {
                                                            const firstVariant =
                                                                product
                                                                    .variants?.[0];
                                                            const primaryImg =
                                                                firstVariant?.images?.find(
                                                                    (img) =>
                                                                        !!img.is_primary,
                                                                ) ??
                                                                firstVariant
                                                                    ?.images?.[0];
                                                            return primaryImg?.url ? (
                                                                <img
                                                                    src={
                                                                        primaryImg.url
                                                                    }
                                                                    alt={
                                                                        product.name
                                                                    }
                                                                    className="w-full h-full object-cover"
                                                                    onError={(
                                                                        e,
                                                                    ) => {
                                                                        e.target.style.display =
                                                                            "none";
                                                                        e.target.parentElement.innerHTML =
                                                                            '<span class="text-xs text-slate-400">📸</span>';
                                                                    }}
                                                                />
                                                            ) : (
                                                                <span className="text-xs text-slate-400">
                                                                    📸
                                                                </span>
                                                            );
                                                        })()}
                                                    </div>
                                                </td>

                                                {/* Product name */}
                                                <td className="px-6 py-4">
                                                    <p className="font-semibold text-slate-100">
                                                        {product.name}
                                                    </p>
                                                    {isDeleted && (
                                                        <p className="text-xs text-red-400 mt-0.5">
                                                            Deleted
                                                        </p>
                                                    )}
                                                </td>

                                                {/* Category */}
                                                <td className="px-6 py-4 text-slate-300">
                                                    {product.category?.name ||
                                                        "-"}
                                                </td>

                                                {/* Brand */}
                                                <td className="px-6 py-4 text-slate-300">
                                                    {product.brand?.name || "-"}
                                                </td>

                                                {/* Volume */}
                                                <td className="px-6 py-4 text-center">
                                                    <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-medium whitespace-nowrap">
                                                        {product.variants
                                                            ?.map(
                                                                (v) => v.volume,
                                                            )
                                                            .join(", ")}
                                                    </span>
                                                </td>

                                                {/* Gender */}
                                                <td className="px-6 py-4 text-center">
                                                    <span
                                                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                                            product.gender ===
                                                            "men"
                                                                ? "bg-blue-500/20 text-blue-400"
                                                                : product.gender ===
                                                                    "women"
                                                                  ? "bg-pink-500/20 text-pink-400"
                                                                  : "bg-purple-500/20 text-purple-400"
                                                        }`}
                                                    >
                                                        {product.gender}
                                                    </span>
                                                </td>

                                                {/* Price */}
                                                <td className="px-6 py-4 text-right whitespace-nowrap">
                                                    <span className="font-semibold text-cyan-400">
                                                        ₹
                                                        {Math.min(
                                                            ...product.variants.map(
                                                                (v) =>
                                                                    Number(
                                                                        v.price,
                                                                    ),
                                                            ),
                                                        )}
                                                        {product.variants
                                                            .length > 1 && " +"}
                                                    </span>
                                                </td>

                                                {/* Stock */}
                                                <td className="px-6 py-4 text-center">
                                                    <span
                                                        className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold ${
                                                            totalStock > 20
                                                                ? "bg-green-500/20 text-green-400"
                                                                : totalStock > 0
                                                                  ? "bg-yellow-500/20 text-yellow-400"
                                                                  : "bg-red-500/20 text-red-400"
                                                        }`}
                                                    >
                                                        {totalStock}
                                                    </span>
                                                </td>

                                                {/* Status */}
                                                <td className="px-6 py-4 text-center">
                                                    {isDeleted ? (
                                                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-500/20 text-red-400">
                                                            Deleted
                                                        </span>
                                                    ) : (
                                                        <span
                                                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                                                product.is_active
                                                                    ? "bg-green-500/20 text-green-400"
                                                                    : "bg-slate-600/30 text-slate-400"
                                                            }`}
                                                        >
                                                            {product.is_active
                                                                ? "Active"
                                                                : "Inactive"}
                                                        </span>
                                                    )}
                                                </td>

                                                {/* Actions */}
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex justify-end gap-2">
                                                        {isDeleted ? (
                                                            <>
                                                                <button
                                                                    onClick={() =>
                                                                        handleRestore(
                                                                            product.id,
                                                                        )
                                                                    }
                                                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-500/10 text-green-400 hover:bg-green-500/20 border border-green-500/30 text-xs font-medium transition-all"
                                                                    title="Restore"
                                                                >
                                                                    <RotateCcw
                                                                        size={
                                                                            13
                                                                        }
                                                                    />
                                                                    Restore
                                                                </button>
                                                                <button
                                                                    onClick={() =>
                                                                        handleForceDelete(
                                                                            product.id,
                                                                        )
                                                                    }
                                                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/30 text-xs font-medium transition-all"
                                                                    title="Delete Forever"
                                                                >
                                                                    <Trash2
                                                                        size={
                                                                            13
                                                                        }
                                                                    />
                                                                    Forever
                                                                </button>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <Link
                                                                    href={route(
                                                                        "products.edit",
                                                                        product.id,
                                                                    )}
                                                                    className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 border border-cyan-500/30 hover:border-cyan-500/50 transition-all duration-200"
                                                                    title="Edit"
                                                                >
                                                                    <Edit
                                                                        size={
                                                                            16
                                                                        }
                                                                    />
                                                                </Link>
                                                                <button
                                                                    onClick={() =>
                                                                        handleDelete(
                                                                            product.id,
                                                                        )
                                                                    }
                                                                    className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/30 hover:border-red-500/50 transition-all duration-200"
                                                                    title="Delete"
                                                                >
                                                                    <Trash2
                                                                        size={
                                                                            16
                                                                        }
                                                                    />
                                                                </button>
                                                            </>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>

                                            {/* Variants expanded row — unchanged */}
                                            {expandedProducts.includes(
                                                product.id,
                                            ) &&
                                                product.variants?.length >
                                                    1 && (
                                                    <tr>
                                                        <td colSpan="11">
                                                            <div className="bg-slate-900/40 px-8 py-4">
                                                                <table className="w-full">
                                                                    <thead>
                                                                        <tr className="text-slate-400 text-sm">
                                                                            <th className="text-left py-2">
                                                                                SKU
                                                                            </th>
                                                                            <th className="text-left py-2">
                                                                                Volume
                                                                            </th>
                                                                            <th className="text-left py-2">
                                                                                Price
                                                                            </th>
                                                                            <th className="text-left py-2">
                                                                                Stock
                                                                            </th>
                                                                            <th className="text-left py-2">
                                                                                Active
                                                                            </th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {product.variants.map(
                                                                            (
                                                                                variant,
                                                                            ) => (
                                                                                <tr
                                                                                    key={
                                                                                        variant.id
                                                                                    }
                                                                                    className="border-t border-slate-800"
                                                                                >
                                                                                    <td className="py-2 text-slate-300">
                                                                                        {
                                                                                            variant.sku
                                                                                        }
                                                                                    </td>
                                                                                    <td className="py-2 text-cyan-400">
                                                                                        {
                                                                                            variant.volume
                                                                                        }
                                                                                    </td>
                                                                                    <td className="py-2 text-slate-300">
                                                                                        ₹
                                                                                        {
                                                                                            variant.price
                                                                                        }
                                                                                    </td>
                                                                                    <td className="py-2">
                                                                                        <span
                                                                                            className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold ${
                                                                                                variant.stock >
                                                                                                20
                                                                                                    ? "bg-green-500/20 text-green-400"
                                                                                                    : variant.stock >
                                                                                                        0
                                                                                                      ? "bg-yellow-500/20 text-yellow-400"
                                                                                                      : "bg-red-500/20 text-red-400"
                                                                                            }`}
                                                                                        >
                                                                                            {
                                                                                                variant.stock
                                                                                            }
                                                                                        </span>
                                                                                    </td>
                                                                                    <td className="py-2">
                                                                                        <span
                                                                                            className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold ${
                                                                                                variant.is_active
                                                                                                    ? "bg-green-500/20 text-green-400"
                                                                                                    : "bg-gray-500/20 text-gray-400"
                                                                                            }`}
                                                                                        >
                                                                                            {variant.is_active
                                                                                                ? "Yes"
                                                                                                : "No"}
                                                                                        </span>
                                                                                    </td>
                                                                                </tr>
                                                                            ),
                                                                        )}
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )}
                                        </React.Fragment>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    {/* Footer — unchanged */}
                    <div className="bg-slate-800/40 border-t border-slate-700/50 px-6 py-4">
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                            <p className="text-sm text-slate-400">
                                Showing{" "}
                                <span className="text-slate-200 font-medium">
                                    {products.data.length}
                                </span>{" "}
                                of{" "}
                                <span className="text-slate-200 font-medium">
                                    {products.total}
                                </span>{" "}
                                products
                            </p>
                            <div className="flex items-center gap-1">
                                {products.links.map((link, index) => (
                                    <button
                                        key={index}
                                        disabled={!link.url}
                                        onClick={() => {
                                            if (link.url)
                                                router.visit(link.url, {
                                                    preserveState: true,
                                                });
                                        }}
                                        className={`min-w-[36px] h-9 px-3 rounded-lg text-sm font-medium border transition-all duration-200 ${
                                            link.active
                                                ? "bg-cyan-500/20 text-cyan-400 border-cyan-500/50"
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
