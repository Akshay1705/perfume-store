import AdminLayout from "@/Layouts/AdminLayout";
import { useForm, Link, usePage } from "@inertiajs/react";
import { useState } from "react";
import {
    ArrowLeft,
    Save,
    Plus,
    Trash2,
    ChevronDown,
    ChevronUp,
} from "lucide-react";
import AppSelect from "@/Components/ui/AppSelect";
import VariantImageManager from "@/Components/Admin/VariantImageManager";

export default function Edit({ product, categories, brands }) {
    const { csrf_token } = usePage().props;

    // Images live OUTSIDE useForm — never serialized, never corrupt the id
    const [variantImages, setVariantImages] = useState(
        product.variants?.reduce((acc, variant) => {
            acc[variant.id] = variant.images || [];
            return acc;
        }, {}) || {},
    );

    // Track which variant panels are collapsed
    const [collapsed, setCollapsed] = useState({});

    // useForm only holds flat primitive values — no nested objects
    const { data, setData, put, processing, errors } = useForm({
        name: product.name,
        slug: product.slug,
        description: product.description,
        gender: product.gender,
        category_id: String(product.category_id || ""),
        brand_id: String(product.brand_id || ""),
        is_active: product.is_active,
        variants:
            product.variants?.map((variant) => ({
                id: variant.id,
                volume: variant.volume,
                price: variant.price,
                stock: variant.stock,
                is_active: variant.is_active,
            })) || [],
    });

    const isSingleVariant = data.variants.length === 1;

    function submit(e) {
        e.preventDefault();
        put(route("products.update", product.id));
    }

    const generateSlug = (name) =>
        name
            .toLowerCase()
            .trim()
            .replace(/\s+/g, "-")
            .replace(/[^\w-]/g, "");

    const addVariant = () => {
        setData("variants", [
            ...data.variants,
            { volume: "", price: "", stock: "", is_active: true },
        ]);
    };

    const removeVariant = (index) => {
        const variant = data.variants[index];
        if (variant.id) {
            setVariantImages((prev) => {
                const updated = { ...prev };
                delete updated[variant.id];
                return updated;
            });
        }
        setData(
            "variants",
            data.variants.filter((_, i) => i !== index),
        );
    };

    const updateVariant = (index, field, value) => {
        if (field === "id") return;
        const updated = [...data.variants];
        updated[index] = { ...updated[index], [field]: value };
        setData("variants", updated);
    };

    const toggleCollapse = (index) => {
        setCollapsed((prev) => ({ ...prev, [index]: !prev[index] }));
    };

    const inputClasses = (hasError) => `
        w-full px-4 py-2.5 rounded-lg bg-slate-900/60 border transition-all duration-200
        text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-offset-0
        ${
            hasError
                ? "border-red-500/50 focus:ring-red-500/30 focus:border-red-500"
                : "border-slate-700/50 focus:ring-cyan-500/30 focus:border-cyan-500/70"
        }
    `;

    const labelClasses =
        "block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5";

    const ErrorMsg = ({ field }) =>
        errors[field] ? (
            <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
                ⚠️ {errors[field]}
            </p>
        ) : null;

    return (
        <AdminLayout>
            {/* ── Page Header ── */}
            <div className="mb-8">
                <Link
                    href={route("products.index")}
                    className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 text-sm font-medium mb-5 transition-colors"
                >
                    <ArrowLeft size={15} />
                    Back to Products
                </Link>

                <div className="flex items-center justify-between">
                    <div>
                        <div className="flex items-center gap-3 mb-1">
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                                Edit Product
                            </h1>
                            <span className="px-2.5 py-0.5 rounded-full bg-slate-700/60 text-slate-400 text-xs font-mono border border-slate-600/50">
                                #{product.id}
                            </span>
                        </div>
                        <p className="text-slate-500 text-sm">{product.name}</p>
                    </div>

                    {/* Top save button */}
                    <button
                        type="button"
                        onClick={submit}
                        disabled={processing}
                        className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm font-semibold hover:shadow-lg hover:shadow-green-500/20 transition-all hover:-translate-y-0.5 disabled:opacity-50"
                    >
                        <Save size={15} />
                        {processing ? "Saving..." : "Save Changes"}
                    </button>
                </div>
            </div>

            <form onSubmit={submit} className="space-y-6">
                {/* ── Section: Basic Info ── */}
                <div className="bg-slate-800/20 border border-slate-700/40 rounded-xl p-6 space-y-5">
                    <h2 className="text-sm font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                        <span className="w-1 h-4 bg-cyan-500 rounded-full inline-block" />
                        Basic Information
                    </h2>

                    <div className="grid grid-cols-2 gap-5">
                        <div>
                            <label className={labelClasses}>
                                Product Name *
                            </label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) => {
                                    const name = e.target.value;
                                    setData((prev) => ({
                                        ...prev,
                                        name,
                                        slug: generateSlug(name),
                                    }));
                                }}
                                placeholder="e.g., Dior Sauvage"
                                className={inputClasses(errors.name)}
                            />
                            <ErrorMsg field="name" />
                        </div>

                        <div>
                            <label className={labelClasses}>Slug *</label>
                            <input
                                type="text"
                                value={data.slug}
                                onChange={(e) =>
                                    setData("slug", e.target.value)
                                }
                                placeholder="dior-sauvage"
                                className={`${inputClasses(errors.slug)} font-mono`}
                            />
                            <ErrorMsg field="slug" />
                        </div>
                    </div>

                    <div>
                        <label className={labelClasses}>Description *</label>
                        <textarea
                            value={data.description}
                            onChange={(e) =>
                                setData("description", e.target.value)
                            }
                            placeholder="Enter product description..."
                            rows="3"
                            className={inputClasses(errors.description)}
                        />
                        <ErrorMsg field="description" />
                    </div>

                    <div className="grid grid-cols-3 gap-5">
                        <div>
                            <label className={labelClasses}>Gender</label>
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

                        <div>
                            <label className={labelClasses}>Category *</label>
                            <AppSelect
                                value={data.category_id}
                                onChange={(val) => setData("category_id", val)}
                                placeholder="Select category"
                                options={categories.map((c) => ({
                                    value: String(c.id),
                                    label: c.name,
                                }))}
                            />
                            <ErrorMsg field="category_id" />
                        </div>

                        <div>
                            <label className={labelClasses}>Brand *</label>
                            <AppSelect
                                value={data.brand_id}
                                onChange={(val) => setData("brand_id", val)}
                                placeholder="Select brand"
                                options={brands.map((b) => ({
                                    value: String(b.id),
                                    label: b.name,
                                }))}
                            />
                            <ErrorMsg field="brand_id" />
                        </div>
                    </div>

                    {/* Active toggle */}
                    <div
                        onClick={() => setData("is_active", !data.is_active)}
                        className={`flex items-center gap-3 rounded-lg px-4 py-3 cursor-pointer border transition-all select-none
                            ${
                                data.is_active
                                    ? "bg-green-500/5 border-green-500/30 hover:bg-green-500/10"
                                    : "bg-slate-700/20 border-slate-700/50 hover:bg-slate-700/30"
                            }`}
                    >
                        {/* Toggle pill */}
                        <div
                            className={`w-9 h-5 rounded-full transition-colors flex items-center px-0.5
                            ${data.is_active ? "bg-green-500" : "bg-slate-600"}`}
                        >
                            <div
                                className={`w-4 h-4 bg-white rounded-full shadow transition-transform
                                ${data.is_active ? "translate-x-4" : "translate-x-0"}`}
                            />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-200">
                                {data.is_active
                                    ? "Product is Active"
                                    : "Product is Inactive"}
                            </p>
                            <p className="text-xs text-slate-500">
                                {data.is_active
                                    ? "Visible in store"
                                    : "Hidden from store"}
                            </p>
                        </div>
                    </div>
                </div>

                {/* ── Section: Variants ── */}
                <div className="bg-slate-800/20 border border-slate-700/40 rounded-xl p-6 space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-sm font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                            <span className="w-1 h-4 bg-purple-500 rounded-full inline-block" />
                            Variants
                            <span className="ml-1 px-2 py-0.5 rounded-full bg-slate-700/60 text-slate-400 text-xs font-mono border border-slate-600/50">
                                {data.variants.length}
                            </span>
                        </h2>

                        <button
                            type="button"
                            onClick={addVariant}
                            className="flex items-center gap-1.5 px-3 py-2 bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border border-purple-500/30 rounded-lg text-xs font-semibold transition-colors"
                        >
                            <Plus size={13} />
                            Add Variant
                        </button>
                    </div>

                    <div className="space-y-3">
                        {data.variants.map((variant, index) => {
                            const isNew = !variant.id;
                            const isCollapsed = collapsed[index];
                            const hasVolumeError =
                                errors[`variants.${index}.volume`];
                            const hasPriceError =
                                errors[`variants.${index}.price`];
                            const hasStockError =
                                errors[`variants.${index}.stock`];

                            return (
                                <div
                                    key={variant.id ?? `new-${index}`}
                                    className={`rounded-xl border transition-all ${
                                        isNew
                                            ? "border-purple-500/30 bg-purple-500/5"
                                            : "border-slate-700/50 bg-slate-900/20"
                                    }`}
                                >
                                    {/* Variant header row */}
                                    <div className="flex items-center gap-3 px-4 py-3">
                                        {/* Status dot */}
                                        <div
                                            className={`w-2 h-2 rounded-full flex-shrink-0 ${
                                                variant.is_active
                                                    ? "bg-green-400"
                                                    : "bg-slate-500"
                                            }`}
                                        />

                                        {/* Volume pill */}
                                        <span className="text-sm font-semibold text-slate-200 min-w-[60px]">
                                            {variant.volume || (
                                                <span className="text-slate-500 italic text-xs">
                                                    New variant
                                                </span>
                                            )}
                                        </span>

                                        {variant.price && (
                                            <span className="text-xs text-slate-400 font-mono">
                                                ₹
                                                {Number(
                                                    variant.price,
                                                ).toLocaleString()}
                                            </span>
                                        )}
                                        {variant.stock !== "" &&
                                            variant.stock !== undefined && (
                                                <span className="text-xs text-slate-500">
                                                    Stock: {variant.stock}
                                                </span>
                                            )}

                                        {isNew && (
                                            <span className="ml-1 text-[10px] font-bold text-purple-300 bg-purple-500/20 border border-purple-500/30 px-2 py-0.5 rounded-full">
                                                NEW — Save to enable images
                                            </span>
                                        )}

                                        <div className="ml-auto flex items-center gap-2">
                                            {/* Active toggle */}
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    updateVariant(
                                                        index,
                                                        "is_active",
                                                        !variant.is_active,
                                                    )
                                                }
                                                className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-colors ${
                                                    variant.is_active
                                                        ? "bg-green-500/10 text-green-400 border-green-500/30 hover:bg-green-500/20"
                                                        : "bg-slate-700/40 text-slate-400 border-slate-600/50 hover:bg-slate-700/60"
                                                }`}
                                            >
                                                {variant.is_active
                                                    ? "Active"
                                                    : "Inactive"}
                                            </button>

                                            {/* Remove */}
                                            {!isSingleVariant && (
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        removeVariant(index)
                                                    }
                                                    className="p-1.5 text-red-400 hover:bg-red-500/10 rounded-md transition-colors border border-transparent hover:border-red-500/20"
                                                >
                                                    <Trash2 size={13} />
                                                </button>
                                            )}

                                            {/* Collapse */}
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    toggleCollapse(index)
                                                }
                                                className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-700/40 rounded-md transition-colors"
                                            >
                                                {isCollapsed ? (
                                                    <ChevronDown size={14} />
                                                ) : (
                                                    <ChevronUp size={14} />
                                                )}
                                            </button>
                                        </div>
                                    </div>

                                    {/* Variant body — collapsible */}
                                    {!isCollapsed && (
                                        <div className="px-4 pb-4 space-y-4 border-t border-slate-700/30 pt-4">
                                            {/* Fields row */}
                                            <div className="grid grid-cols-3 gap-4">
                                                <div>
                                                    <label
                                                        className={labelClasses}
                                                    >
                                                        Volume *
                                                    </label>
                                                    <input
                                                        type="text"
                                                        placeholder="e.g. 100ml"
                                                        value={variant.volume}
                                                        onChange={(e) =>
                                                            updateVariant(
                                                                index,
                                                                "volume",
                                                                e.target.value,
                                                            )
                                                        }
                                                        className={inputClasses(
                                                            hasVolumeError,
                                                        )}
                                                    />
                                                    {hasVolumeError && (
                                                        <p className="text-red-400 text-xs mt-1">
                                                            ⚠️{" "}
                                                            {
                                                                errors[
                                                                    `variants.${index}.volume`
                                                                ]
                                                            }
                                                        </p>
                                                    )}
                                                </div>

                                                <div>
                                                    <label
                                                        className={labelClasses}
                                                    >
                                                        Price (₹) *
                                                    </label>
                                                    <input
                                                        type="number"
                                                        placeholder="e.g. 4999"
                                                        value={variant.price}
                                                        onChange={(e) =>
                                                            updateVariant(
                                                                index,
                                                                "price",
                                                                e.target.value,
                                                            )
                                                        }
                                                        className={inputClasses(
                                                            hasPriceError,
                                                        )}
                                                    />
                                                    {hasPriceError && (
                                                        <p className="text-red-400 text-xs mt-1">
                                                            ⚠️{" "}
                                                            {
                                                                errors[
                                                                    `variants.${index}.price`
                                                                ]
                                                            }
                                                        </p>
                                                    )}
                                                </div>

                                                <div>
                                                    <label
                                                        className={labelClasses}
                                                    >
                                                        Stock *
                                                    </label>
                                                    <input
                                                        type="number"
                                                        placeholder="e.g. 50"
                                                        value={variant.stock}
                                                        onChange={(e) =>
                                                            updateVariant(
                                                                index,
                                                                "stock",
                                                                e.target.value,
                                                            )
                                                        }
                                                        className={inputClasses(
                                                            hasStockError,
                                                        )}
                                                    />
                                                    {hasStockError && (
                                                        <p className="text-red-400 text-xs mt-1">
                                                            ⚠️{" "}
                                                            {
                                                                errors[
                                                                    `variants.${index}.stock`
                                                                ]
                                                            }
                                                        </p>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Images */}
                                            {variant.id ? (
                                                <VariantImageManager
                                                    variant={{
                                                        ...variant,
                                                        images:
                                                            variantImages[
                                                                variant.id
                                                            ] || [],
                                                    }}
                                                    csrf_token={csrf_token}
                                                    onImagesChange={(
                                                        updatedImages,
                                                    ) => {
                                                        setVariantImages(
                                                            (prev) => ({
                                                                ...prev,
                                                                [variant.id]:
                                                                    updatedImages,
                                                            }),
                                                        );
                                                    }}
                                                />
                                            ) : (
                                                <div className="rounded-lg border border-dashed border-purple-500/20 bg-purple-500/5 px-4 py-3 text-center">
                                                    <p className="text-purple-300/60 text-xs">
                                                        💡 Fill in the details
                                                        above, then click{" "}
                                                        <span className="font-semibold text-purple-300">
                                                            Save Changes
                                                        </span>{" "}
                                                        to persist this variant
                                                        — after that you can
                                                        upload images.
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* ── Bottom action bar ── */}
                <div className="flex items-center justify-between bg-slate-800/20 border border-slate-700/40 rounded-xl px-6 py-4">
                    <Link
                        href={route("products.index")}
                        className="px-5 py-2.5 rounded-lg bg-slate-800/60 text-slate-300 text-sm font-semibold hover:bg-slate-800 border border-slate-700/50 transition-all"
                    >
                        Cancel
                    </Link>

                    <button
                        type="submit"
                        disabled={processing}
                        className="flex items-center gap-2 px-8 py-2.5 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm font-semibold hover:shadow-lg hover:shadow-green-500/25 transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:shadow-none disabled:hover:translate-y-0"
                    >
                        <Save size={15} />
                        {processing ? "Saving..." : "Save Changes"}
                    </button>
                </div>
            </form>
        </AdminLayout>
    );
}
