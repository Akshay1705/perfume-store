import AdminLayout from "@/Layouts/AdminLayout";
import { Link, router } from "@inertiajs/react";
import { Edit, Trash2, Plus } from "lucide-react";
import { useState } from "react";

export default function Index({ brands }) {
    const [deleteId, setDeleteId] = useState(null);

    const handleDelete = (id) => {
        if (confirm("Are you sure? This action cannot be undone.")) {
            router.delete(route("brands.destroy", id));
            setDeleteId(null);
        }
    };

    return (
        <AdminLayout>
            {/* Header Section */}
            <div className="mb-8">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-2">
                            Brands
                        </h1>
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

                {/* Stats Bar */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-slate-800/40 border border-slate-700/50 rounded-lg p-4 backdrop-blur-sm">
                        <p className="text-slate-400 text-sm font-medium">
                            Total Brands
                        </p>
                        <p className="text-3xl font-bold text-white mt-1">
                            {brands.length}
                        </p>
                    </div>
                    <div className="bg-slate-800/40 border border-slate-700/50 rounded-lg p-4 backdrop-blur-sm">
                        <p className="text-slate-400 text-sm font-medium">
                            Active
                        </p>
                        <p className="text-3xl font-bold text-purple-400 mt-1">
                            {brands.length}
                        </p>
                    </div>
                    <div className="bg-slate-800/40 border border-slate-700/50 rounded-lg p-4 backdrop-blur-sm">
                        <p className="text-slate-400 text-sm font-medium">
                            Last Updated
                        </p>
                        <p className="text-sm text-slate-300 mt-1">Just now</p>
                    </div>
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
                                    <th className="text-right px-6 py-4 text-slate-300 font-semibold text-sm uppercase tracking-wide">
                                        Actions
                                    </th>
                                </tr>
                            </thead>

                            {/* Table Body */}
                            <tbody>
                                {brands.map((brand, index) => (
                                    <tr
                                        key={brand.id}
                                        className="border-b border-slate-700/30 hover:bg-slate-800/40 transition-colors duration-200 group"
                                    >
                                        {/* Name Cell */}
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-400/20 to-pink-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400 font-semibold">
                                                    {brand.name
                                                        .charAt(0)
                                                        .toUpperCase()}
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-slate-100">
                                                        {brand.name}
                                                    </p>
                                                    <p className="text-xs text-slate-500 mt-0.5">
                                                        ID: {brand.id}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Slug Cell */}
                                        <td className="px-6 py-4">
                                            <span className="px-3 py-1 rounded-full bg-slate-700/40 text-slate-300 text-sm font-mono">
                                                {brand.slug}
                                            </span>
                                        </td>

                                        {/* Actions Cell */}
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-2 opacity-100 group-hover:opacity-100">
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
                                                        handleDelete(brand.id)
                                                    }
                                                    className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/30 hover:border-red-500/50 transition-all duration-200"
                                                    title="Delete"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Table Footer */}
                    <div className="bg-slate-800/40 border-t border-slate-700/50 px-6 py-3 text-sm text-slate-400">
                        Showing {brands.length} of {brands.length} brands
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
