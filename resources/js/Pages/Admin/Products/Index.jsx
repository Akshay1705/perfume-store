import AdminLayout from "@/Layouts/AdminLayout";
import { Link, router } from "@inertiajs/react";

export default function Index({ products }) {
    return (
        <AdminLayout>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold">Products</h1>
            </div>

            <Link
                href={route("products.create")}
                className="bg-blue-600 text-white px-4 py-2 rounded mb-4 inline-block"
            >
                Create Product
            </Link>

            <div className="bg-white rounded-lg shadow overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b bg-gray-50">
                            <th className="text-left py-3 px-4">Name</th>
                            <th className="text-left py-3 px-4">Category</th>
                            <th className="text-left py-3 px-4">Brand</th>
                            <th className="text-left py-3 px-4">Price</th>
                            <th className="text-left py-3 px-4">Stock</th>
                            <th className="text-left py-3 px-4">Status</th>
                            <th className="text-left py-3 px-4">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {products.length > 0 ? (
                            products.map((product) => (
                                <tr
                                    key={product.id}
                                    className="border-b hover:bg-gray-50"
                                >
                                    <td className="py-3 px-4 font-medium">
                                        {product.name}
                                    </td>
                                    <td className="py-3 px-4">
                                        {product.category?.name}
                                    </td>
                                    <td className="py-3 px-4">
                                        {product.brand?.name}
                                    </td>
                                    <td className="py-3 px-4">
                                        ₹{parseFloat(product.price).toFixed(2)}
                                    </td>
                                    <td className="py-3 px-4">
                                        <span
                                            className={
                                                product.stock > 0
                                                    ? "text-green-600"
                                                    : "text-red-600"
                                            }
                                        >
                                            {product.stock}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4">
                                        <span
                                            className={`px-3 py-1 rounded text-sm ${product.is_active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
                                        >
                                            {product.is_active
                                                ? "Active"
                                                : "Inactive"}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4">
                                        <Link
                                            href={route(
                                                "products.edit",
                                                product.id,
                                            )}
                                            className="text-blue-600 hover:underline mr-4"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => {
                                                if (
                                                    confirm(
                                                        "Are you sure you want to delete this product?",
                                                    )
                                                ) {
                                                    router.delete(
                                                        route(
                                                            "products.destroy",
                                                            product.id,
                                                        ),
                                                    );
                                                }
                                            }}
                                            className="text-red-600 hover:underline"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="7"
                                    className="py-6 px-4 text-center text-gray-500"
                                >
                                    No products found.{" "}
                                    <Link
                                        href={route("products.create")}
                                        className="text-blue-600"
                                    >
                                        Create one
                                    </Link>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    );
}
