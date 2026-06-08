import StoreLayout from "@/Layouts/StoreLayout";
import { Head } from "@inertiajs/react";
import { useState } from "react";

export default function ProductShow({ product }) {
    const firstVariant = product.variants?.[0] || null;

    const [selectedVariant, setSelectedVariant] = useState(firstVariant);

    // Active image comes from selected variant's images
    const getVariantPrimaryImage = (variant) =>
        variant?.images?.find((img) => !!img.is_primary)?.url ??
        variant?.images?.[0]?.url ??
        null;

    const [activeImageUrl, setActiveImageUrl] = useState(
        getVariantPrimaryImage(firstVariant),
    );

    // When user picks a variant — switch images automatically
    const handleVariantSelect = (variant) => {
        setSelectedVariant(variant);
        setActiveImageUrl(getVariantPrimaryImage(variant));
    };

    // Current images to show in gallery = selected variant's images
    const galleryImages = selectedVariant?.images || [];

    return (
        <StoreLayout>
            <Head
                title={`${product.name} - ${product.brand?.name || "Fragrances"}`}
            />

            <div className="max-w-6xl mx-auto px-4 md:px-8 py-12">
                <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
                    {/* ── Left: Image Gallery ── */}
                    <div className="space-y-4">
                        {/* Main image */}
                        <div className="bg-stone-50 rounded-2xl overflow-hidden border border-stone-100 flex items-center justify-center p-4">
                            {activeImageUrl ? (
                                <img
                                    key={activeImageUrl}
                                    src={activeImageUrl}
                                    alt={product.name}
                                    className="w-full h-[450px] md:h-[550px] object-contain mix-blend-multiply transition-all duration-300"
                                />
                            ) : (
                                <div className="w-full h-[450px] md:h-[550px] flex items-center justify-center text-stone-200 text-8xl">
                                    🧴
                                </div>
                            )}
                        </div>

                        {/* Thumbnails — from selected variant's images */}
                        {galleryImages.length > 1 && (
                            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
                                {galleryImages.map((image) => {
                                    const isActive =
                                        activeImageUrl === image.url;
                                    return (
                                        <button
                                            key={image.id}
                                            onClick={() =>
                                                setActiveImageUrl(image.url)
                                            }
                                            className={`relative w-20 h-20 flex-shrink-0 bg-stone-50 rounded-xl overflow-hidden border transition-all duration-200 ${
                                                isActive
                                                    ? "border-stone-900 ring-2 ring-stone-900/10"
                                                    : "border-stone-200 hover:border-stone-400"
                                            }`}
                                        >
                                            <img
                                                src={image.url}
                                                alt=""
                                                className="w-full h-full object-cover mix-blend-multiply"
                                            />
                                        </button>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {/* ── Right: Product Details ── */}
                    <div className="flex flex-col justify-between">
                        <div>
                            {/* Brand */}
                            <p className="text-xs font-semibold tracking-widest text-amber-800 uppercase">
                                {product.brand?.name}
                            </p>

                            {/* Title */}
                            <h1 className="text-3xl md:text-4xl font-serif tracking-wide text-stone-900 mt-2">
                                {product.name}
                            </h1>

                            {/* Gender tag */}
                            {product.gender && (
                                <span className="inline-block mt-3 text-[11px] font-medium tracking-wider uppercase px-2.5 py-1 bg-stone-100 text-stone-600 rounded-md">
                                    {product.gender}
                                </span>
                            )}

                            {/* Price + Stock */}
                            <div className="mt-6 flex items-baseline gap-4 border-b border-stone-100 pb-6">
                                <span className="text-3xl font-light text-stone-950">
                                    ₹
                                    {Number(
                                        selectedVariant?.price || 0,
                                    ).toLocaleString("en-IN")}
                                </span>

                                <span
                                    className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                                        selectedVariant?.stock > 0
                                            ? "bg-emerald-50 text-emerald-700"
                                            : "bg-rose-50 text-rose-700"
                                    }`}
                                >
                                    {selectedVariant?.stock > 0
                                        ? `In Stock (${selectedVariant.stock})`
                                        : "Out of Stock"}
                                </span>
                            </div>

                            {/* Description */}
                            <div className="mt-6">
                                <h3 className="text-xs font-semibold text-stone-400 uppercase tracking-wider">
                                    The Story
                                </h3>
                                <p className="mt-2 text-stone-600 leading-relaxed text-sm font-light">
                                    {product.description ||
                                        "No description provided for this luxury fragrance."}
                                </p>
                            </div>

                            {/* Variant selector */}
                            <div className="mt-8">
                                <div className="flex justify-between items-center mb-3">
                                    <h3 className="text-sm font-medium text-stone-800">
                                        Select Size
                                    </h3>
                                    {selectedVariant?.sku && (
                                        <span className="text-xs text-stone-400 font-mono">
                                            SKU: {selectedVariant.sku}
                                        </span>
                                    )}
                                </div>

                                <div className="flex flex-wrap gap-3">
                                    {product.variants?.map((variant) => {
                                        const isSelected =
                                            selectedVariant?.id === variant.id;
                                        const hasImages =
                                            variant.images?.length > 0;

                                        return (
                                            <button
                                                key={variant.id}
                                                onClick={() =>
                                                    handleVariantSelect(variant)
                                                }
                                                className={`relative px-6 py-3 border text-xs font-semibold tracking-widest uppercase rounded-sm transition-all duration-300 ${
                                                    isSelected
                                                        ? "border-yellow-500 bg-yellow-500 text-black shadow-lg shadow-yellow-500/10"
                                                        : "border-stone-200 text-slate-400 bg-white hover:border-yellow-500/50 hover:text-gray-700"
                                                }`}
                                            >
                                                {variant.volume}
                                                {/* Dot indicator if variant has images */}
                                                {hasImages && (
                                                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-amber-500 rounded-full" />
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>

                                {/* Hint text */}
                                <p className="text-xs text-stone-400 mt-2">
                                    • dot indicates variant has images
                                </p>
                            </div>
                        </div>

                        {/* CTA */}
                        <div className="mt-10 pt-6 border-t border-stone-100 space-y-6">
                            <button
                                disabled={
                                    !selectedVariant ||
                                    selectedVariant?.stock <= 0
                                }
                                className="w-full bg-stone-950 text-white text-sm font-medium tracking-wider uppercase py-4 rounded-xl shadow-sm hover:bg-stone-800 disabled:bg-stone-200 disabled:text-stone-400 disabled:cursor-not-allowed transition-all duration-200"
                            >
                                {!selectedVariant
                                    ? "Select a Size"
                                    : selectedVariant.stock > 0
                                      ? "Add To Bag"
                                      : "Sold Out"}
                            </button>

                            <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-xs text-stone-500 pt-2">
                                <p>
                                    <span className="text-stone-400 font-medium">
                                        Category:
                                    </span>{" "}
                                    {product.category?.name || "N/A"}
                                </p>
                                <p>
                                    <span className="text-stone-400 font-medium">
                                        Type:
                                    </span>{" "}
                                    Natural Spray
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </StoreLayout>
    );
}
