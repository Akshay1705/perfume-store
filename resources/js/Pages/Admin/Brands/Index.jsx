import AdminLayout from "@/Layouts/AdminLayout";
import { Link, router } from "@inertiajs/react";

export default function Index({ brands }) {
    return (
        <AdminLayout>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold">brands</h1>
            </div>

            <Link
                href={route("brands.create")}
                className="bg-blue-600 text-black px-4 py-2 rounded"
            >
                Create brand
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
                        {brands.map((brand) => (
                            <tr key={brand.id} className="border-b">
                                <td className="py-3">{brand.name}</td>

                                <td className="py-3">{brand.slug}</td>

                                <td className="py-3">
                                    <Link
                                        href={route(
                                            "brands.edit",
                                            brand.id,
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
                                                    "brands.destroy",
                                                    brand.id,
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
