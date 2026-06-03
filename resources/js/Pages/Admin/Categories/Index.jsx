import AdminLayout from "@/Layouts/AdminLayout";
import { Link, router } from "@inertiajs/react";
import { Edit, Trash2, Plus } from "lucide-react";
import { useState } from "react";

export default function Index({ categories }) {
    const [deleteId, setDeleteId] = useState(null);

    const handleDelete = (id) => {
        if (confirm("Are you sure? This action cannot be undone.")) {
            router.delete(route("categories.destroy", id));
            setDeleteId(null);
        }
    };

    return (
        <AdminLayout>
            {/* Header Section */}
            <div className="mb-8">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                                Categories
                            </h1>
                            <span className="px-3 py-1 rounded-full bg-amber-500/15 text-amber-400 text-sm font-semibold border border-amber-500/30">
                                {categories.length} total
                            </span>
                        </div>
                        <p className="text-slate-400 text-sm">
                            Manage your product categories
                        </p>
                    </div>

                    <Link
                        href={route("categories.create")}
                        className="group flex items-center gap-2 px-4 py-3 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-semibold hover:shadow-lg hover:shadow-amber-500/20 transition-all duration-300 hover:-translate-y-0.5"
                    >
                        <Plus size={18} />
                        Create Category
                    </Link>
                </div>
            </div>

            {/* Table Section */}
            {categories.length === 0 ? (
                <div className="bg-slate-800/30 border border-slate-700/50 rounded-lg p-12 text-center backdrop-blur-sm">
                    <div className="text-5xl mb-3">📂</div>
                    <h3 className="text-lg font-semibold text-slate-200 mb-2">
                        No categories yet
                    </h3>
                    <p className="text-slate-400 mb-6">
                        Start by creating your first category
                    </p>
                    <Link
                        href={route("categories.create")}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-500 text-slate-950 font-semibold hover:bg-amber-400 transition-all"
                    >
                        <Plus size={16} />
                        Create First Category
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
                                {categories.map((category, index) => (
                                    <tr
                                        key={category.id}
                                        className="border-b border-slate-700/30 hover:bg-slate-800/40 transition-colors duration-200 group"
                                    >
                                        {/* Name Cell */}
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-400/20 to-orange-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 font-semibold">
                                                    {category.name
                                                        .charAt(0)
                                                        .toUpperCase()}
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-slate-100">
                                                        {category.name}
                                                    </p>
                                                    <p className="text-xs text-slate-500 mt-0.5">
                                                        ID: {category.id}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Slug Cell */}
                                        <td className="px-6 py-4">
                                            <span className="px-3 py-1 rounded-full bg-slate-700/40 text-slate-300 text-sm font-mono">
                                                {category.slug}
                                            </span>
                                        </td>

                                        {/* Actions Cell */}
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-2 opacity-100 group-hover:opacity-100">
                                                <Link
                                                    href={route(
                                                        "categories.edit",
                                                        category.id,
                                                    )}
                                                    className="p-2 rounded-lg bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 border border-amber-500/30 hover:border-amber-500/50 transition-all duration-200"
                                                    title="Edit"
                                                >
                                                    <Edit size={16} />
                                                </Link>

                                                <button
                                                    onClick={() =>
                                                        handleDelete(
                                                            category.id,
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
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Table Footer */}
                    <div className="bg-slate-800/40 border-t border-slate-700/50 px-6 py-3 text-sm text-slate-400">
                        Showing {categories.length} of {categories.length}{" "}
                        categories
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
