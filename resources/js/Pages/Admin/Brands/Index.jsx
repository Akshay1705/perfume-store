import AdminLayout from "@/Layouts/AdminLayout";
import { Link, router, usePage } from "@inertiajs/react";
import { Edit, Trash2, Plus, RotateCcw, Flame } from "lucide-react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

export default function Index({ brands }) {
    const { flash } = usePage().props;

    useEffect(() => {
        if (flash?.success) toast.success(flash.success);
        if (flash?.error) toast.error(flash.error);
    }, [flash]);

    const handleDelete = (id) => {
        Swal.fire({
            title: "Delete this brand?",
            text: "Don't worry, it can be restored later.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#e3342f",
            cancelButtonColor: "#6c757d",
            confirmButtonText: "Yes, delete it!",
            background: "#1e293b",
            color: "#f1f5f9",
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route("brands.destroy", id));
            }
        });
    };

    const handleRestore = (id) => {
        Swal.fire({
            title: "Restore this brand?",
            text: "It will be active again.",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#38c172",
            cancelButtonColor: "#6c757d",
            confirmButtonText: "Yes, restore it!",
            background: "#1e293b",
            color: "#f1f5f9",
        }).then((result) => {
            if (result.isConfirmed) {
                router.post(route("brands.restore", id));
            }
        });
    };

    const handleForceDelete = (id) => {
        Swal.fire({
            title: "Permanently delete?",
            text: "This cannot be undone at all!",
            icon: "error",
            showCancelButton: true,
            confirmButtonColor: "#e3342f",
            cancelButtonColor: "#6c757d",
            confirmButtonText: "Yes, delete forever!",
            background: "#1e293b",
            color: "#f1f5f9",
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route("brands.forceDelete", id));
            }
        });
    };

    const activeBrands = brands.filter((b) => !b.deleted_at);
    const trashedBrands = brands.filter((b) => b.deleted_at);

    return (
        <AdminLayout>
            {/* Header Section */}
            <div className="mb-8">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                                Brands
                            </h1>
                            <span className="px-3 py-1 rounded-full bg-purple-500/15 text-purple-400 text-sm font-semibold border border-purple-500/30">
                                {activeBrands.length} active
                            </span>
                            {trashedBrands.length > 0 && (
                                <span className="px-3 py-1 rounded-full bg-red-500/15 text-red-400 text-sm font-semibold border border-red-500/30">
                                    {trashedBrands.length} trashed
                                </span>
                            )}
                        </div>
                        <p className="text-slate-400 text-sm">
                            Manage your product brands
                        </p>
                    </div>

                    <Link
                        href={route("brands.create")}
                        className="group flex items-center gap-2 px-4 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 hover:-translate-y-0.5"
                    >
                        <Plus size={18} />
                        Create Brand
                    </Link>
                </div>
            </div>

            {/* Table Section */}
            {brands.length === 0 ? (
                <div className="bg-slate-800/30 border border-slate-700/50 rounded-lg p-12 text-center backdrop-blur-sm">
                    <div className="text-5xl mb-3">🏷️</div>
                    <h3 className="text-lg font-semibold text-slate-200 mb-2">
                        No brands yet
                    </h3>
                    <p className="text-slate-400 mb-6">
                        Start by creating your first brand
                    </p>
                    <Link
                        href={route("brands.create")}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-500 text-white font-semibold hover:bg-purple-400 transition-all"
                    >
                        <Plus size={16} />
                        Create First Brand
                    </Link>
                </div>
            ) : (
                <div className="bg-slate-800/20 border border-slate-700/50 rounded-lg overflow-hidden backdrop-blur-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            {/* Table Header */}
                            <thead>
                                <tr className="border-b border-slate-700/50 bg-slate-800/40">
                                    <th className="text-left px-6 py-4 text-slate-300 font-semibold text-sm uppercase tracking-wide">
                                        Name
                                    </th>
                                    <th className="text-left px-6 py-4 text-slate-300 font-semibold text-sm uppercase tracking-wide">
                                        Slug
                                    </th>
                                    <th className="text-left px-6 py-4 text-slate-300 font-semibold text-sm uppercase tracking-wide">
                                        Status
                                    </th>
                                    <th className="text-right px-6 py-4 text-slate-300 font-semibold text-sm uppercase tracking-wide">
                                        Actions
                                    </th>
                                </tr>
                            </thead>

                            {/* Table Body */}
                            <tbody>
                                {brands.map((brand) => (
                                    <tr
                                        key={brand.id}
                                        className={`border-b border-slate-700/30 transition-colors duration-200 group ${
                                            brand.deleted_at
                                                ? "opacity-60 bg-red-950/10"
                                                : "hover:bg-slate-800/40"
                                        }`}
                                    >
                                        {/* Name Cell */}
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-400/20 to-pink-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400 font-semibold">
                                                    {brand.name
                                                        .charAt(0)
                                                        .toUpperCase()}
                                                </div>
                                                <p className="font-semibold text-slate-100">
                                                    {brand.name}
                                                </p>
                                            </div>
                                        </td>

                                        {/* Slug Cell */}
                                        <td className="px-6 py-4">
                                            <span className="px-3 py-1 rounded-full bg-slate-700/40 text-slate-300 text-sm font-mono">
                                                {brand.slug}
                                            </span>
                                        </td>

                                        {/* Status Cell */}
                                        <td className="px-6 py-4">
                                            {brand.deleted_at ? (
                                                <span className="px-3 py-1 rounded-full bg-red-500/15 text-red-400 text-xs font-semibold border border-red-500/30">
                                                    Trashed
                                                </span>
                                            ) : (
                                                <span className="px-3 py-1 rounded-full bg-green-500/15 text-green-400 text-xs font-semibold border border-green-500/30">
                                                    Active
                                                </span>
                                            )}
                                        </td>

                                        {/* Actions Cell */}
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                {brand.deleted_at ? (
                                                    <>
                                                        <button
                                                            onClick={() =>
                                                                handleRestore(
                                                                    brand.id,
                                                                )
                                                            }
                                                            className="p-2 rounded-lg bg-green-500/10 text-green-400 hover:bg-green-500/20 border border-green-500/30 hover:border-green-500/50 transition-all duration-200"
                                                            title="Restore"
                                                        >
                                                            <RotateCcw
                                                                size={16}
                                                            />
                                                        </button>
                                                        <button
                                                            onClick={() =>
                                                                handleForceDelete(
                                                                    brand.id,
                                                                )
                                                            }
                                                            className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/30 hover:border-red-500/50 transition-all duration-200"
                                                            title="Delete Forever"
                                                        >
                                                            <Flame size={16} />
                                                        </button>
                                                    </>
                                                ) : (
                                                    <>
                                                        <Link
                                                            href={route(
                                                                "brands.edit",
                                                                brand.id,
                                                            )}
                                                            className="p-2 rounded-lg bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 border border-purple-500/30 hover:border-purple-500/50 transition-all duration-200"
                                                            title="Edit"
                                                        >
                                                            <Edit size={16} />
                                                        </Link>
                                                        <button
                                                            onClick={() =>
                                                                handleDelete(
                                                                    brand.id,
                                                                )
                                                            }
                                                            className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/30 hover:border-red-500/50 transition-all duration-200"
                                                            title="Delete"
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Table Footer */}
                    <div className="bg-slate-800/40 border-t border-slate-700/50 px-6 py-3 text-sm text-slate-400">
                        Showing {activeBrands.length} active,{" "}
                        {trashedBrands.length} trashed — {brands.length} total
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
