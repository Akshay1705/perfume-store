import AdminLayout from "@/Layouts/AdminLayout";
import { useForm } from "@inertiajs/react";

export default function Edit({ brand }) {
    const { data, setData, put, processing, errors } = useForm({
        name: brand.name,
        slug: brand.slug,
    });

    function submit(e) {
        e.preventDefault();

        put(route("brands.update", brand.id));
    }

    return (
        <AdminLayout>
            <h1 className="text-3xl font-bold mb-6">Edit brand</h1>

            <form
                onSubmit={submit}
                className="bg-white p-6 rounded-lg shadow space-y-5"
            >
                <div>
                    <label>Name</label>

                    <input
                        type="text"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        className="w-full border rounded p-2 mt-1"
                    />

                    {errors.name && (
                        <p className="text-red-500 text-sm">{errors.name}</p>
                    )}
                </div>

                <div>
                    <label>Slug</label>

                    <input
                        type="text"
                        value={data.slug}
                        onChange={(e) => setData("slug", e.target.value)}
                        className="w-full border rounded p-2 mt-1"
                    />
                </div>

                <button
                    disabled={processing}
                    className="bg-green-600 text-white px-4 py-2 rounded"
                >
                    Update brand
                </button>
            </form>
        </AdminLayout>
    );
}
