import AdminLayout from "@/Layouts/AdminLayout";
import { useForm, Link } from "@inertiajs/react";

export default function Edit({ product, categories, brands }) {
    const { data, setData, put, processing, errors } = useForm({
        name: product.name,
        slug: product.slug,
        description: product.description,
        price: product.price,
        stock: product.stock,
        volume: product.volume,
        category_id: product.category_id,
        brand_id: product.brand_id,
        is_active: product.is_active,
    });

    function submit(e) {
        e.preventDefault();
        put(route("products.update", product.id));
    }

    return (
        <AdminLayout>
            <div className="mb-6">
                <Link
                    href={route("products.index")}
                    className="text-blue-600 hover:underline"
                >
                    ← Back to Products
                </Link>
            </div>

            <h1 className="text-3xl font-bold mb-6">Edit Product</h1>

            <form
                onSubmit={submit}
                className="bg-white p-6 rounded-lg shadow space-y-5 max-w-2xl"
            >
                <div>
                    <label className="block font-medium mb-1">
                        Product Name *
                    </label>
                    <input
                        type="text"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter product name"
                    />
                    {errors.name && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.name}
                        </p>
                    )}
                </div>

                <div>
                    <label className="block font-medium mb-1">Slug *</label>
                    <input
                        type="text"
                        value={data.slug}
                        onChange={(e) => setData("slug", e.target.value)}
                        className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g., product-name"
                    />
                    {errors.slug && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.slug}
                        </p>
                    )}
                </div>

                <div>
                    <label className="block font-medium mb-1">
                        Description *
                    </label>
                    <textarea
                        value={data.description}
                        onChange={(e) => setData("description", e.target.value)}
                        className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter product description"
                        rows="4"
                    />
                    {errors.description && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.description}
                        </p>
                    )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block font-medium mb-1">
                            Price *
                        </label>
                        <input
                            type="number"
                            step="0.01"
                            value={data.price}
                            onChange={(e) => setData("price", e.target.value)}
                            className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="0.00"
                        />
                        {errors.price && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.price}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block font-medium mb-1">
                            Stock *
                        </label>
                        <input
                            type="number"
                            value={data.stock}
                            onChange={(e) => setData("stock", e.target.value)}
                            className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="0"
                        />
                        {errors.stock && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.stock}
                            </p>
                        )}
                    </div>
                </div>

                <div>
                    <label className="block font-medium mb-1">Volume</label>
                    <input
                        type="text"
                        value={data.volume}
                        onChange={(e) => setData("volume", e.target.value)}
                        className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g., 100ml, 200ml"
                    />
                    {errors.volume && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.volume}
                        </p>
                    )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block font-medium mb-1">
                            Category *
                        </label>
                        <select
                            value={data.category_id}
                            onChange={(e) =>
                                setData("category_id", e.target.value)
                            }
                            className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select a category</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                        {errors.category_id && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.category_id}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block font-medium mb-1">
                            Brand *
                        </label>
                        <select
                            value={data.brand_id}
                            onChange={(e) =>
                                setData("brand_id", e.target.value)
                            }
                            className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select a brand</option>
                            {brands.map((brand) => (
                                <option key={brand.id} value={brand.id}>
                                    {brand.name}
                                </option>
                            ))}
                        </select>
                        {errors.brand_id && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.brand_id}
                            </p>
                        )}
                    </div>
                </div>

                <div>
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            checked={data.is_active}
                            onChange={(e) =>
                                setData("is_active", e.target.checked)
                            }
                            className="mr-2 w-4 h-4 rounded"
                        />
                        <span className="font-medium">Active</span>
                    </label>
                </div>

                <div className="flex gap-4 pt-4">
                    <button
                        disabled={processing}
                        className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 disabled:opacity-50"
                    >
                        {processing ? "Updating..." : "Update Product"}
                    </button>
                    <Link
                        href={route("products.index")}
                        className="bg-gray-300 text-gray-800 px-6 py-2 rounded hover:bg-gray-400"
                    >
                        Cancel
                    </Link>
                </div>
            </form>
        </AdminLayout>
    );
}
