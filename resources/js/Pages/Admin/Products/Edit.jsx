import AdminLayout from "@/Layouts/AdminLayout";
import { useForm, Link, usePage } from "@inertiajs/react";
import { useState } from "react";
import { ArrowLeft, Save, Upload, Trash2, Star } from "lucide-react";

export default function Edit({ product, categories, brands }) {
    const { csrf_token } = usePage().props;
    const [images, setImages] = useState(product.images || []);
    const [uploading, setUploading] = useState(false);
    const [uploadError, setUploadError] = useState("");
    
    const predefinedVolumes = ["30ml", "50ml", "100ml", "200ml"];
    
    const [customVolume, setCustomVolume] = useState(
        predefinedVolumes.includes(product.volume) ? "" : product.volume,
    );

    
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
    const isCustomVolume = !predefinedVolumes.includes(data.volume);

    
    function submit(e) {
        e.preventDefault();
        put(route("products.update", product.id));
    }

    const generateSlug = (name, volume) => {
        return [name, volume]
            .filter(Boolean)
            .join("-")
            .toLowerCase()
            .trim()
            .replace(/\s+/g, "-")
            .replace(/[^\w-]/g, "");
    };

    async function handleImageUpload(e) {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        setUploading(true);
        setUploadError("");

        try {
            const file = files[0];
            const formData = new FormData();
            formData.append("image", file);
            formData.append("is_primary", images.length === 0 ? "1" : "0");

            const uploadUrl = `/admin/products/${product.id}/images`;
            const response = await fetch(uploadUrl, {
                method: "POST",
                body: formData,
                headers: {
                    "X-CSRF-TOKEN": csrf_token,
                },
            });

            const responseData = await response.json();

            if (!response.ok) {
                throw new Error(responseData.error || `Upload failed`);
            }

            setImages([...images, responseData]);
        } catch (err) {
            console.error("Upload error:", err);
            setUploadError(err.message || "Failed to upload image");
        } finally {
            setUploading(false);
            e.target.value = "";
        }
    }

    async function deleteImage(imageId) {
        if (!confirm("Delete this image?")) return;

        try {
            const deleteUrl = `/admin/products/${product.id}/images/${imageId}`;
            const response = await fetch(deleteUrl, {
                method: "DELETE",
                headers: {
                    "X-CSRF-TOKEN": csrf_token,
                },
            });

            if (response.ok) {
                setImages(images.filter((img) => img.id !== imageId));
            }
        } catch (err) {
            console.error("Failed to delete image:", err);
        }
    }

    async function setPrimaryImage(imageId) {
        try {
            const primaryUrl = `/admin/products/${product.id}/images/${imageId}/primary`;
            const response = await fetch(primaryUrl, {
                method: "PUT",
                headers: {
                    "X-CSRF-TOKEN": csrf_token,
                },
            });

            if (response.ok) {
                setImages(
                    images.map((img) => ({
                        ...img,
                        is_primary: img.id === imageId,
                    })),
                );
            }
        } catch (err) {
            console.error("Failed to set primary image:", err);
        }
    }

    return (
        <AdminLayout>
            {/* Header */}
            <div className="mb-8">
                <Link
                    href={route("products.index")}
                    className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 text-sm font-medium mb-4 transition-colors"
                >
                    <ArrowLeft size={16} />
                    Back to Products
                </Link>

                <div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
                        Edit Product
                    </h1>
                    <p className="text-slate-400">Update product information</p>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-6">
                {/* Form */}
                <div className="col-span-2">
                    <form
                        onSubmit={submit}
                        className="bg-slate-800/20 border border-slate-700/50 rounded-lg p-8 backdrop-blur-sm space-y-6"
                    >
                        {/* Product ID Info */}
                        <div className="bg-slate-900/40 border border-slate-700/50 rounded-lg p-4">
                            <p className="text-slate-400 text-sm">
                                <span className="font-semibold text-slate-300">
                                    Product ID:
                                </span>{" "}
                                {product.id}
                            </p>
                        </div>

                        {/* Product Name */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-200 mb-2">
                                Product Name *
                            </label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) => {
                                    const name = e.target.value;

                                    setData((data) => ({
                                        ...data,
                                        name,
                                        slug: generateSlug(name, data.volume),
                                    }));
                                }}
                                placeholder="e.g., Dior Sauvage"
                                className={`w-full px-4 py-3 rounded-lg bg-slate-900/50 border transition-all duration-200 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-offset-0 ${
                                    errors.name
                                        ? "border-red-500/50 focus:ring-red-500/50 focus:border-red-500"
                                        : "border-slate-700/50 focus:ring-cyan-500/50 focus:border-cyan-500"
                                }`}
                            />
                            {errors.name && (
                                <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
                                    <span>⚠️</span> {errors.name}
                                </p>
                            )}
                        </div>

                        {/* Slug */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-200 mb-2">
                                Slug *
                            </label>
                            <input
                                type="text"
                                value={data.slug}
                                onChange={(e) =>
                                    setData("slug", e.target.value)
                                }
                                placeholder="e.g., dior-sauvage"
                                className={`w-full px-4 py-3 rounded-lg bg-slate-900/50 border transition-all duration-200 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-offset-0 font-mono text-sm ${
                                    errors.slug
                                        ? "border-red-500/50 focus:ring-red-500/50 focus:border-red-500"
                                        : "border-slate-700/50 focus:ring-cyan-500/50 focus:border-cyan-500"
                                }`}
                            />
                            {errors.slug && (
                                <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
                                    <span>⚠️</span> {errors.slug}
                                </p>
                            )}
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-200 mb-2">
                                Description *
                            </label>
                            <textarea
                                value={data.description}
                                onChange={(e) =>
                                    setData("description", e.target.value)
                                }
                                placeholder="Enter product description"
                                rows="4"
                                className={`w-full px-4 py-3 rounded-lg bg-slate-900/50 border transition-all duration-200 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-offset-0 ${
                                    errors.description
                                        ? "border-red-500/50 focus:ring-red-500/50 focus:border-red-500"
                                        : "border-slate-700/50 focus:ring-cyan-500/50 focus:border-cyan-500"
                                }`}
                            />
                            {errors.description && (
                                <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
                                    <span>⚠️</span> {errors.description}
                                </p>
                            )}
                        </div>

                        {/* Price & Stock */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-slate-200 mb-2">
                                    Price *
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={data.price}
                                    onChange={(e) =>
                                        setData("price", e.target.value)
                                    }
                                    placeholder="0.00"
                                    className={`w-full px-4 py-3 rounded-lg bg-slate-900/50 border transition-all duration-200 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-offset-0 ${
                                        errors.price
                                            ? "border-red-500/50 focus:ring-red-500/50 focus:border-red-500"
                                            : "border-slate-700/50 focus:ring-cyan-500/50 focus:border-cyan-500"
                                    }`}
                                />
                                {errors.price && (
                                    <p className="text-red-400 text-sm mt-2">
                                        {errors.price}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-200 mb-2">
                                    Stock *
                                </label>
                                <input
                                    type="number"
                                    value={data.stock}
                                    onChange={(e) =>
                                        setData("stock", e.target.value)
                                    }
                                    placeholder="0"
                                    className={`w-full px-4 py-3 rounded-lg bg-slate-900/50 border transition-all duration-200 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-offset-0 ${
                                        errors.stock
                                            ? "border-red-500/50 focus:ring-red-500/50 focus:border-red-500"
                                            : "border-slate-700/50 focus:ring-cyan-500/50 focus:border-cyan-500"
                                    }`}
                                />
                                {errors.stock && (
                                    <p className="text-red-400 text-sm mt-2">
                                        {errors.stock}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Volume */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-200 mb-3">
                                Volume
                            </label>

                            <div className="flex flex-wrap gap-2 mb-3">
                                {predefinedVolumes.map((volume) => (
                                    <button
                                        type="button"
                                        key={volume}
                                        onClick={() => {
                                            setData((data) => ({
                                                ...data,
                                                volume,
                                                slug: generateSlug(
                                                    data.name,
                                                    volume,
                                                ),
                                            }));

                                            setCustomVolume("");
                                        }}
                                        className={`px-4 py-2 rounded-lg border transition-all ${
                                            data.volume === volume
                                                ? "bg-cyan-500 text-white border-cyan-500"
                                                : "bg-slate-800 border-slate-700 text-slate-300"
                                        }`}
                                    >
                                        {volume}
                                    </button>
                                ))}

                                <button
                                    type="button"
                                    onClick={() => {
                                        setCustomVolume(
                                            predefinedVolumes.includes(
                                                data.volume,
                                            )
                                                ? ""
                                                : data.volume,
                                        );

                                        setData((data) => ({
                                            ...data,
                                            volume: "custom",
                                        }));
                                    }}
                                    className={`px-4 py-2 rounded-lg border ${
                                        !predefinedVolumes.includes(data.volume)
                                            ? "bg-cyan-500 text-white border-cyan-500"
                                            : "bg-slate-800 border-slate-700 text-slate-300"
                                    }`}
                                >
                                    Custom
                                </button>
                            </div>

                            {isCustomVolume && (
                                <input
                                    type="text"
                                    value={customVolume}
                                    onChange={(e) => {
                                        const volume = e.target.value;

                                        setCustomVolume(volume);

                                        setData((data) => ({
                                            ...data,
                                            volume: volume,
                                            slug: generateSlug(
                                                data.name,
                                                volume,
                                            ),
                                        }));
                                    }}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            e.preventDefault();

                                            const volume = customVolume.trim();

                                            if (!volume) return;

                                            setData((data) => ({
                                                ...data,
                                                volume,
                                                slug: generateSlug(
                                                    data.name,
                                                    volume,
                                                ),
                                            }));
                                        }
                                    }}
                                    onBlur={() => {
                                        const volume = customVolume.trim();

                                        if (!volume) return;

                                        setData((data) => ({
                                            ...data,
                                            volume,
                                            slug: generateSlug(
                                                data.name,
                                                volume,
                                            ),
                                        }));
                                    }}
                                    placeholder="e.g. 20ml x 4"
                                    className="w-full px-4 py-3 rounded-lg bg-slate-900/50 border border-slate-700/50 text-slate-100"
                                />
                            )}

                            {errors.volume && (
                                <p className="text-red-400 text-sm mt-2">
                                    {errors.volume}
                                </p>
                            )}
                        </div>

                        {/* Category & Brand */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-slate-200 mb-2">
                                    Category *
                                </label>
                                <select
                                    value={data.category_id}
                                    onChange={(e) =>
                                        setData("category_id", e.target.value)
                                    }
                                    className={`w-full px-4 py-3 rounded-lg bg-slate-900/50 border transition-all duration-200 text-slate-100 focus:outline-none focus:ring-2 focus:ring-offset-0 ${
                                        errors.category_id
                                            ? "border-red-500/50 focus:ring-red-500/50 focus:border-red-500"
                                            : "border-slate-700/50 focus:ring-cyan-500/50 focus:border-cyan-500"
                                    }`}
                                >
                                    <option value="">Select a category</option>
                                    {categories.map((category) => (
                                        <option
                                            key={category.id}
                                            value={category.id}
                                        >
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.category_id && (
                                    <p className="text-red-400 text-sm mt-2">
                                        {errors.category_id}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-200 mb-2">
                                    Brand *
                                </label>
                                <select
                                    value={data.brand_id}
                                    onChange={(e) =>
                                        setData("brand_id", e.target.value)
                                    }
                                    className={`w-full px-4 py-3 rounded-lg bg-slate-900/50 border transition-all duration-200 text-slate-100 focus:outline-none focus:ring-2 focus:ring-offset-0 ${
                                        errors.brand_id
                                            ? "border-red-500/50 focus:ring-red-500/50 focus:border-red-500"
                                            : "border-slate-700/50 focus:ring-cyan-500/50 focus:border-cyan-500"
                                    }`}
                                >
                                    <option value="">Select a brand</option>
                                    {brands.map((brand) => (
                                        <option key={brand.id} value={brand.id}>
                                            {brand.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.brand_id && (
                                    <p className="text-red-400 text-sm mt-2">
                                        {errors.brand_id}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Active Status */}
                        <div className="flex items-center gap-3 bg-slate-700/20 border border-slate-700/50 rounded-lg p-4">
                            <input
                                type="checkbox"
                                id="is_active"
                                checked={data.is_active}
                                onChange={(e) =>
                                    setData("is_active", e.target.checked)
                                }
                                className="w-4 h-4 rounded"
                            />
                            <label
                                htmlFor="is_active"
                                className="text-sm font-medium text-slate-200 cursor-pointer"
                            >
                                Product is active and visible in store
                            </label>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3 pt-4">
                            <button
                                type="submit"
                                disabled={processing}
                                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold hover:shadow-lg hover:shadow-green-500/20 transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:shadow-none disabled:hover:translate-y-0"
                            >
                                <Save size={18} />
                                {processing ? "Saving..." : "Save Changes"}
                            </button>

                            <Link
                                href={route("products.index")}
                                className="px-6 py-3 rounded-lg bg-slate-800/40 text-slate-300 font-semibold hover:bg-slate-800/60 border border-slate-700/50 transition-all duration-200"
                            >
                                Cancel
                            </Link>
                        </div>
                    </form>
                </div>

                {/* Images Sidebar */}
                <div className="col-span-1">
                    <div className="bg-slate-800/20 border border-slate-700/50 rounded-lg p-6 backdrop-blur-sm space-y-4 sticky top-32">
                        <h2 className="text-lg font-bold text-slate-100">
                            📸 Images
                        </h2>

                        {uploadError && (
                            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                                <p className="text-red-300 text-sm font-medium">
                                    ❌ Error
                                </p>
                                <p className="text-red-300/80 text-xs mt-1 break-words">
                                    {uploadError}
                                </p>
                            </div>
                        )}

                        <label className="block cursor-pointer group">
                            <div className="border-2 border-dashed border-slate-700 rounded-lg p-6 text-center hover:border-cyan-500 hover:bg-cyan-500/5 transition-all">
                                {uploading ? (
                                    <div className="space-y-2">
                                        <div className="text-2xl animate-spin">
                                            ⏳
                                        </div>
                                        <p className="text-sm text-slate-300">
                                            Uploading...
                                        </p>
                                    </div>
                                ) : (
                                    <div className="space-y-2">
                                        <Upload
                                            size={24}
                                            className="mx-auto text-slate-400 group-hover:text-cyan-400 transition-colors"
                                        />
                                        <p className="text-slate-200 font-medium text-sm">
                                            Click to upload
                                        </p>
                                        <p className="text-xs text-slate-500">
                                            JPG, PNG, WEBP (max 5MB)
                                        </p>
                                    </div>
                                )}
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    disabled={uploading}
                                    className="hidden"
                                />
                            </div>
                        </label>

                        {/* Image List */}
                        <div className="space-y-3 max-h-96 overflow-y-auto">
                            {images.length > 0 ? (
                                images.map((image) => (
                                    <div
                                        key={image.id}
                                        className="bg-slate-700/20 border border-slate-700/50 rounded-lg overflow-hidden hover:border-slate-700 transition-all"
                                    >
                                        <div className="bg-slate-800/40 h-24 flex items-center justify-center overflow-hidden">
                                            <img
                                                src={image.url}
                                                alt="Product"
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    e.target.style.display =
                                                        "none";
                                                    e.target.parentElement.innerHTML =
                                                        '<div class="w-full h-full flex items-center justify-center text-slate-500"><span>Failed to load</span></div>';
                                                }}
                                            />
                                        </div>

                                        <div className="p-3 space-y-2">
                                            <div className="flex gap-2">
                                                {image.is_primary ? (
                                                    <span className="flex items-center gap-1 bg-green-500/20 text-green-300 px-2 py-1 rounded text-xs font-medium">
                                                        <Star size={12} />
                                                        Primary
                                                    </span>
                                                ) : (
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            setPrimaryImage(
                                                                image.id,
                                                            )
                                                        }
                                                        className="flex items-center gap-1 bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500/20 px-2 py-1 rounded text-xs font-medium transition-all"
                                                    >
                                                        Set Primary
                                                    </button>
                                                )}

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        deleteImage(image.id)
                                                    }
                                                    className="ml-auto p-1 rounded text-red-400 hover:bg-red-500/20 transition-all"
                                                    title="Delete"
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-slate-500 text-sm text-center py-6">
                                    No images yet
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
