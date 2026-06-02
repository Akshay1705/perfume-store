import AdminLayout from "@/Layouts/AdminLayout";
import { useForm, Link } from "@inertiajs/react";

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        slug: "",
    });

    function submit(e) {
        e.preventDefault();

        post(route("categories.store"));
    }

    return (
        <AdminLayout>
            <h1 className="text-3xl font-bold mb-6">Create Category</h1>

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
                        <p className="text-red-500 text-sm mt-1">
                            {errors.name}
                        </p>
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

                    {errors.slug && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.slug}
                        </p>
                    )}
                </div>

                <button
                    disabled={processing}
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Create Category
                </button>
            </form>
        </AdminLayout>
    );
}
