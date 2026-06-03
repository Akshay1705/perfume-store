import AdminLayout from "@/Layouts/AdminLayout";
import { Link, router } from "@inertiajs/react";
import { Edit, Trash2, Plus } from "lucide-react";
import { useState } from "react";

export default function Index({ products, filters, categories, brands }) {
    const [deleteId, setDeleteId] = useState(null);

    const handleDelete = (id) => {
        if (confirm("Are you sure? This action cannot be undone.")) {
            router.delete(route("products.destroy", id));
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
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                                Products
                            </h1>
                            <span className="px-3 py-1 rounded-full bg-cyan-500/15 text-cyan-400 text-sm font-semibold border border-cyan-500/30">
                                {products.total} total
                            </span>
                        </div>
                        <p className="text-slate-400 text-sm">
                            Manage your product catalog
                        </p>
                    </div>

                    <Link
                        href={route("products.create")}
                        className="group flex items-center gap-2 px-4 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 hover:-translate-y-0.5"
                    >
                        <Plus size={18} />
                        Create Product
                    </Link>
                </div>

                {/* Stats Bar */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-slate-800/40 border border-slate-700/50 rounded-lg p-4 backdrop-blur-sm">
                        <p className="text-slate-400 text-sm font-medium">
                            In Stock
                        </p>
                        <p className="text-3xl font-bold text-green-400 mt-1">
                            {products.data.filter((p) => p.stock > 0).length}
                        </p>
                    </div>
                    <div className="bg-slate-800/40 border border-slate-700/50 rounded-lg p-4 backdrop-blur-sm">
                        <p className="text-slate-400 text-sm font-medium">
                            Low Stock
                        </p>
                        <p className="text-3xl font-bold text-yellow-400 mt-1">
                            {
                                products.data.filter(
                                    (p) => p.stock > 0 && p.stock < 10,
                                ).length
                            }
                        </p>
                    </div>
                    <div className="bg-slate-800/40 border border-slate-700/50 rounded-lg p-4 backdrop-blur-sm">
                        <p className="text-slate-400 text-sm font-medium">
                            Out of Stock
                        </p>
                        <p className="text-3xl font-bold text-red-400 mt-1">
                            {products.data.filter((p) => p.stock === 0).length}
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-slate-800/20 border border-slate-700/50 rounded-lg p-4 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {/* Search */}
                    <input
                        type="text"
                        placeholder="Search products..."
                        defaultValue={filters.search || ""}
                        onChange={(e) =>
                            router.get(
                                route("products.index"),
                                {
                                    ...filters,
                                    search: e.target.value,
                                },
                                {
                                    preserveState: true,
                                    replace: true,
                                },
                            )
                        }
                        className="px-4 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-100"
                    />

                    {/* Category */}
                    <select
                        value={filters.category || ""}
                        onChange={(e) =>
                            router.get(
                                route("products.index"),
                                {
                                    ...filters,
                                    category: e.target.value,
                                },
                                {
                                    preserveState: true,
                                    replace: true,
                                },
                            )
                        }
                        className="px-4 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-100"
                    >
                        <option value="">All Categories</option>

                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>

                    {/* Brand */}
                    <select
                        value={filters.brand || ""}
                        onChange={(e) =>
                            router.get(
                                route("products.index"),
                                {
                                    ...filters,
                                    brand: e.target.value,
                                },
                                {
                                    preserveState: true,
                                    replace: true,
                                },
                            )
                        }
                        className="px-4 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-100"
                    >
                        <option value="">All Brands</option>

                        {brands.map((brand) => (
                            <option key={brand.id} value={brand.id}>
                                {brand.name}
                            </option>
                        ))}
                    </select>

                    {/* Status */}
                    <select
                        value={filters.status || ""}
                        onChange={(e) =>
                            router.get(
                                route("products.index"),
                                {
                                    ...filters,
                                    status: e.target.value,
                                },
                                {
                                    preserveState: true,
                                    replace: true,
                                },
                            )
                        }
                        className="px-4 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-100"
                    >
                        <option value="">All Status</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                </div>
            </div>

            {/* Table Section */}
            {products.data.length === 0 ? (
                <div className="bg-slate-800/30 border border-slate-700/50 rounded-lg p-12 text-center backdrop-blur-sm">
                    <div className="text-5xl mb-3">📦</div>
                    <h3 className="text-lg font-semibold text-slate-200 mb-2">
                        No products yet
                    </h3>
                    <p className="text-slate-400 mb-6">
                        Start by creating your first product
                    </p>
                    <Link
                        href={route("products.create")}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500 text-white font-semibold hover:bg-cyan-400 transition-all"
                    >
                        <Plus size={16} />
                        Create First Product
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

                            {/* Table Body */}
                            <tbody>
                                {products.data.map((product) => (
                                    <tr
                                        key={product.id}
                                        className="border-b border-slate-700/30 hover:bg-slate-800/40 transition-colors duration-200 group"
                                    >
                                        {/* Image Cell */}
                                        <td className="px-6 py-4">
                                            <div className="w-12 h-12 rounded-lg overflow-hidden bg-slate-700/40 flex items-center justify-center border border-slate-700/50">
                                                {product.primary_image?.url ? (
                                                    <img
                                                        src={
                                                            product
                                                                .primary_image
                                                                .url
                                                        }
                                                        alt={product.name}
                                                        className="w-full h-full object-cover"
                                                        onError={(e) => {
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
                                                )}
                                            </div>
                                        </td>

                                        {/* Product Name Cell */}
                                        <td className="px-6 py-4">
                                            <div>
                                                <p className="font-semibold text-slate-100">
                                                    {product.name}
                                                </p>
                                                {/* <p className="text-xs text-slate-500 mt-0.5">
                                                    ID: {product.id}
                                                </p> */}
                                            </div>
                                        </td>

                                        {/* Category Cell */}
                                        <td className="px-6 py-4 text-slate-300">
                                            {product.category?.name || "-"}
                                        </td>

                                        {/* Brand Cell */}
                                        <td className="px-6 py-4 text-slate-300">
                                            {product.brand?.name || "-"}
                                        </td>

                                        {/* Volume Cell */}
                                        <td className="px-6 py-4 text-center">
                                            <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-sm font-medium">
                                                {product.volume || "-"}
                                            </span>
                                        </td>

                                        {/* Price Cell */}
                                        <td className="px-6 py-4 text-right">
                                            <span className="font-semibold text-cyan-400">
                                                ₹
                                                {parseFloat(
                                                    product.price,
                                                ).toFixed(2)}
                                            </span>
                                        </td>

                                        {/* Stock Cell */}
                                        <td className="px-6 py-4 text-center">
                                            <span
                                                className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold ${
                                                    product.stock > 20
                                                        ? "bg-green-500/20 text-green-400"
                                                        : product.stock > 0
                                                          ? "bg-yellow-500/20 text-yellow-400"
                                                          : "bg-red-500/20 text-red-400"
                                                }`}
                                            >
                                                {product.stock}
                                            </span>
                                        </td>

                                        {/* Status Cell */}
                                        <td className="px-6 py-4 text-center">
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
                                        </td>

                                        {/* Actions Cell */}
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-2 opacity-100 group-hover:opacity-100">
                                                <Link
                                                    href={route(
                                                        "products.edit",
                                                        product.id,
                                                    )}
                                                    className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 border border-cyan-500/30 hover:border-cyan-500/50 transition-all duration-200"
                                                    title="Edit"
                                                >
                                                    <Edit size={16} />
                                                </Link>

                                                <button
                                                    onClick={() =>
                                                        handleDelete(product.id)
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
                    <div className="bg-slate-800/40 border-t border-slate-700/50 px-6 py-4">
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                            {/* Showing count */}
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

                            {/* Pagination */}
                            <div className="flex items-center gap-1">
                                {products.links.map((link, index) => (
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
