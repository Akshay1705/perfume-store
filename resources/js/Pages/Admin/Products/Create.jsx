import AdminLayout from "@/Layouts/AdminLayout";
import { useForm, Link, usePage } from "@inertiajs/react";
import { useState } from "react";
import { ArrowLeft, Plus, Upload, Trash2, Star } from "lucide-react";
import AppSelect from "@/Components/ui/AppSelect";

export default function Create({ categories, brands }) {
    const { csrf_token } = usePage().props;
    const [images, setImages] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [uploadError, setUploadError] = useState("");
    const [productId, setProductId] = useState(null);
    const [productCreated, setProductCreated] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [customVolume, setCustomVolume] = useState("");
    const [isCustomVolume, setIsCustomVolume] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        slug: "",
        description: "",
        price: "",
        stock: "",
        volume: "",
        gender: "unisex",
        category_id: "",
        brand_id: "",
        is_active: true,
        variants: [
            {
                volume: "",
                price: "",
                stock: "",
                is_active: true,
            },
        ],
    });

    const inputClasses = (errorKey) => `
        w-full px-4 py-3 rounded-lg bg-slate-900/50 border transition-all duration-200
        text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-offset-0
        ${
            errorKey
                ? "border-red-500/50 focus:ring-red-500/50 focus:border-red-500"
                : "border-slate-700/50 focus:ring-cyan-500/50 focus:border-cyan-500"
        }
    `;

    const addVariant = () => {
        setData("variants", [
            ...data.variants,
            {
                volume: "",
                price: "",
                stock: "",
                is_active: true,
            },
        ]);
    };

    const removeVariant = (index) => {
        if (data.variants.length === 1) return;

        setData(
            "variants",
            data.variants.filter((_, i) => i !== index),
        );
    };

    const updateVariant = (index, field, value) => {
        const updated = [...data.variants];

        updated[index][field] = value;

        setData("variants", updated);
    };

    const ErrorMsg = ({ field }) =>
        errors[field] ? (
            <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
                <span>⚠️</span> {errors[field]}
            </p>
        ) : null;

    function submit(e) {
        e.preventDefault();
        post(route("products.store"), {
            onSuccess: (response) => {
                const newProduct = response.props.flash?.product;
                if (newProduct?.id) {
                    setProductId(newProduct.id);
                    setProductCreated(true);
                    setSuccessMessage(
                        `✅ ${newProduct.name} created successfully! Now add images.`,
                    );
                    reset();
                    setImages([]);
                    setCustomVolume("");
                    setIsCustomVolume(false);
                }
            },
            onError: (errors) => console.error("Creation failed:", errors),
        });
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
        if (!files || files.length === 0 || !productId) return;
        setUploading(true);
        setUploadError("");
        try {
            const file = files[0];
            const formData = new FormData();
            formData.append("image", file);
            formData.append("is_primary", images.length === 0 ? "1" : "0");
            const response = await fetch(
                `/admin/products/${productId}/images`,
                {
                    method: "POST",
                    body: formData,
                    headers: { "X-CSRF-TOKEN": csrf_token },
                },
            );
            const responseData = await response.json();
            if (!response.ok)
                throw new Error(responseData.error || "Upload failed");
            setImages([...images, responseData]);
        } catch (err) {
            setUploadError(err.message || "Failed to upload image");
        } finally {
            setUploading(false);
            e.target.value = "";
        }
    }

    async function deleteImage(imageId) {
        if (!confirm("Delete this image?") || !productId) return;
        try {
            const response = await fetch(
                `/admin/products/${productId}/images/${imageId}`,
                {
                    method: "DELETE",
                    headers: { "X-CSRF-TOKEN": csrf_token },
                },
            );
            if (response.ok)
                setImages(images.filter((img) => img.id !== imageId));
        } catch (err) {
            console.error("Failed to delete image:", err);
        }
    }

    async function setPrimaryImage(imageId) {
        if (!productId) return;
        try {
            const response = await fetch(
                `/admin/products/${productId}/images/${imageId}/primary`,
                {
                    method: "PUT",
                    headers: { "X-CSRF-TOKEN": csrf_token },
                },
            );
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
                <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
                    Create Product
                </h1>
                <p className="text-slate-400">
                    Add a new product to your catalog
                </p>
            </div>

            {productCreated && successMessage && (
                <div className="mb-6 bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                    <p className="text-green-300 text-sm font-medium">
                        {successMessage}
                    </p>
                </div>
            )}

            <div className="grid grid-cols-3 gap-6">
                {/* Form */}
                <div className="col-span-2">
                    <form
                        onSubmit={submit}
                        className="bg-slate-800/20 border border-slate-700/50 rounded-lg p-8 backdrop-blur-sm space-y-6"
                    >
                        {/* Row 1 — Name + Slug */}
                        <div className="grid grid-cols-2 gap-6">
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
                                            slug: generateSlug(
                                                name,
                                                data.volume,
                                            ),
                                        }));
                                    }}
                                    placeholder="e.g., Dior Sauvage"
                                    className={inputClasses(errors.name)}
                                />
                                <ErrorMsg field="name" />
                            </div>

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
                                    className={`${inputClasses(errors.slug)} font-mono text-sm`}
                                />
                                <ErrorMsg field="slug" />
                            </div>
                        </div>

                        {/* Row 2 — Description */}
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
                                rows="3"
                                className={inputClasses(errors.description)}
                            />
                            <ErrorMsg field="description" />
                        </div>

                        {/* Row 3 — Variants */}
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <label className="block text-sm font-semibold text-slate-200">
                                    Product Variants
                                </label>

                                <button
                                    type="button"
                                    onClick={addVariant}
                                    className="px-3 py-2 bg-cyan-500 text-white rounded-lg text-sm"
                                >
                                    + Add Variant
                                </button>
                            </div>

                            <div className="space-y-4">
                                {data.variants.map((variant, index) => (
                                    <div
                                        key={index}
                                        className="grid grid-cols-4 gap-4 p-4 rounded-lg border border-slate-700 bg-slate-900/30"
                                    >
                                        <input
                                            type="text"
                                            placeholder="Volume (50ml)"
                                            value={variant.volume}
                                            onChange={(e) =>
                                                updateVariant(
                                                    index,
                                                    "volume",
                                                    e.target.value,
                                                )
                                            }
                                            className={inputClasses()}
                                        />

                                        <input
                                            type="number"
                                            step="0.01"
                                            placeholder="Price"
                                            value={variant.price}
                                            onChange={(e) =>
                                                updateVariant(
                                                    index,
                                                    "price",
                                                    e.target.value,
                                                )
                                            }
                                            className={inputClasses()}
                                        />

                                        <input
                                            type="number"
                                            placeholder="Stock"
                                            value={variant.stock}
                                            onChange={(e) =>
                                                updateVariant(
                                                    index,
                                                    "stock",
                                                    e.target.value,
                                                )
                                            }
                                            className={inputClasses()}
                                        />

                                        <button
                                            type="button"
                                            onClick={() => removeVariant(index)}
                                            className="bg-red-500 text-white rounded-lg"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>


                        <div>
                            <label className="block text-sm font-semibold text-slate-200 mb-2">
                                Gender
                            </label>

                            <AppSelect
                                value={data.gender || ""}
                                onChange={(val) => setData("gender", val)}
                                options={[
                                    { value: "men", label: "Men" },
                                    { value: "women", label: "Women" },
                                    { value: "unisex", label: "Unisex" },
                                ]}
                            />
                        </div>

                        {/* Row 5 — Category + Brand */}
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-slate-200 mb-2">
                                    Category *
                                </label>
                                <AppSelect
                                    value={data.category_id}
                                    onChange={(val) =>
                                        setData("category_id", val)
                                    }
                                    placeholder="Select a category"
                                    options={categories.map((c) => ({
                                        value: String(c.id),
                                        label: c.name,
                                    }))}
                                />
                                <ErrorMsg field="category_id" />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-200 mb-2">
                                    Brand *
                                </label>
                                <AppSelect
                                    value={data.brand_id}
                                    onChange={(val) => setData("brand_id", val)}
                                    placeholder="Select a brand"
                                    options={brands.map((b) => ({
                                        value: String(b.id),
                                        label: b.name,
                                    }))}
                                />
                                <ErrorMsg field="brand_id" />
                            </div>
                        </div>

                        {/* Row 6 — Active Status */}
                        <div className="flex items-center gap-3 bg-slate-700/20 border border-slate-700/50 rounded-lg p-4">
                            <input
                                type="checkbox"
                                id="is_active"
                                checked={data.is_active}
                                onChange={(e) =>
                                    setData("is_active", e.target.checked)
                                }
                                className="w-4 h-4 rounded accent-cyan-500 cursor-pointer"
                            />
                            <label
                                htmlFor="is_active"
                                className="text-sm font-medium text-slate-200 cursor-pointer"
                            >
                                Product is active and visible in store
                            </label>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3 pt-2">
                            <button
                                type="submit"
                                disabled={processing}
                                className="flex items-center justify-center gap-2 px-8 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:shadow-none disabled:hover:translate-y-0"
                            >
                                <Plus size={18} />
                                {processing ? "Creating..." : "Create Product"}
                            </button>
                            <Link
                                href={route("products.index")}
                                className="px-8 py-3 rounded-lg bg-slate-800/40 text-slate-300 font-semibold hover:bg-slate-800/60 border border-slate-700/50 transition-all duration-200"
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

                        {!productCreated || !productId ? (
                            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                                <p className="text-yellow-300 text-sm font-medium">
                                    ⚠️ Create product first
                                </p>
                                <p className="text-yellow-300/80 text-xs mt-1">
                                    Save the product, then add images here
                                </p>
                            </div>
                        ) : (
                            <>
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
                                                <div className="p-3">
                                                    <div className="flex gap-2">
                                                        {image.is_primary ? (
                                                            <span className="flex items-center gap-1 bg-green-500/20 text-green-300 px-2 py-1 rounded text-xs font-medium">
                                                                <Star
                                                                    size={12}
                                                                />{" "}
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
                                                                deleteImage(
                                                                    image.id,
                                                                )
                                                            }
                                                            className="ml-auto p-1 rounded text-red-400 hover:bg-red-500/20 transition-all"
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
                            </>
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
