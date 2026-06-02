import AdminLayout from "@/Layouts/AdminLayout";
import { Link, router } from "@inertiajs/react";

export default function Index({ categories }) {
    return (
        <AdminLayout>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold">Categories</h1>
            </div>

            <Link
                href={route("categories.create")}
                className="bg-blue-600 text-black px-4 py-2 rounded"
            >
                Create Category
            </Link>

            <div className="bg-white rounded-lg shadow p-6">
                <table className="w-full">
                    <thead>
                        <tr className="border-b">
                            <th className="text-left py-3">Name</th>

                            <th className="text-left py-3">Slug</th>

                            <th className="text-left py-3">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {categories.map((category) => (
                            <tr key={category.id} className="border-b">
                                <td className="py-3">{category.name}</td>

                                <td className="py-3">{category.slug}</td>

                                <td className="py-3">
                                    <Link
                                        href={route(
                                            "categories.edit",
                                            category.id,
                                        )}
                                        className="text-blue-600 hover:underline"
                                    >
                                        Edit
                                    </Link>
                                </td>
                                <button
                                    onClick={() => {
                                        if (confirm("Are you sure?")) {
                                            router.delete(
                                                route(
                                                    "categories.destroy",
                                                    category.id,
                                                ),
                                            );
                                        }
                                    }}
                                    className="text-red-600 ml-4"
                                >
                                    Delete
                                </button>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    );
}
