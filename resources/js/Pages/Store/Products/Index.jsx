import { useState, useMemo } from "react";
import StoreLayout from "@/Layouts/StoreLayout";
import { Link, usePage } from "@inertiajs/react";
import { Search, Sparkles, ArrowRight } from "lucide-react";

export default function Index() {
    const { products = [], categories = [], brands = [] } = usePage().props;

    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [selectedBrand, setSelectedBrand] = useState("all");
    const [selectedGender, setSelectedGender] = useState("all");
    const [selectedVolumes, setSelectedVolumes] = useState([]);

    const genderOptions = [
        { label: "Pour Homme (Men)", value: "men" },
        { label: "Pour Femme (Women)", value: "women" },
        { label: "Unisex", value: "unisex" },
    ];

    const volumeOptions = ["30ml", "50ml", "100ml", "200ml"];

    const catalogItems = useMemo(() => {
        const items = [];
        products.forEach((product) => {
            if (product.is_active !== false && product.variants?.length > 0) {
                product.variants.forEach((variant) => {
                    if (variant.is_active) {
                        const primaryImage =
                            variant.images?.find((img) => img.is_primary) ||
                            variant.images?.[0];
                        items.push({
                            id: `${product.id}-${variant.id}`,
                            name: product.name,
                            slug: product.slug,
                            gender: product.gender?.toLowerCase() || "unisex",
                            brand: product.brand,
                            brandId: product.brand_id,
                            categoryId: product.category_id,
                            volume: variant.volume,
                            price: variant.price,
                            imageUrl: primaryImage?.url || null,
                        });
                    }
                });
            }
        });
        return items;
    }, [products]);

    const filteredItems = useMemo(() => {
        return catalogItems.filter((item) => {
            const matchesSearch = item.name
                .toLowerCase()
                .includes(searchQuery.toLowerCase());
            const matchesCategory =
                selectedCategory === "all" ||
                String(item.categoryId) === String(selectedCategory);
            const matchesBrand =
                selectedBrand === "all" ||
                String(item.brandId) === String(selectedBrand);
            const matchesGender =
                selectedGender === "all" || item.gender === selectedGender;
            const matchesVolume =
                selectedVolumes.length === 0 ||
                selectedVolumes.includes(item.volume.toLowerCase().trim());
            return (
                matchesSearch &&
                matchesCategory &&
                matchesBrand &&
                matchesGender &&
                matchesVolume
            );
        });
    }, [
        catalogItems,
        searchQuery,
        selectedCategory,
        selectedBrand,
        selectedGender,
        selectedVolumes,
    ]);

    const handleVolumeToggle = (volume) => {
        const val = volume.toLowerCase().trim();
        setSelectedVolumes((prev) =>
            prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val],
        );
    };

    return (
        <StoreLayout>
            {/* Soft, clean warm background */}
            <div className="bg-[#FAF9F6] min-h-screen text-stone-900 pt-12 pb-24">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="mb-12">
                        <p className="text-xs tracking-[0.3em] uppercase text-amber-700 font-medium mb-2">
                            The Collection
                        </p>
                        <h1 className="font-serif text-3xl md:text-5xl tracking-wide text-stone-900">
                            Maison{" "}
                            <span className="text-amber-700 italic">
                                Catalog
                            </span>
                        </h1>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 items-start">
                        {/* ── SIDEBAR FILTERS (LIGHT MODE FIXED) ── */}
                        <aside className="space-y-8 bg-white p-6 border border-stone-200 rounded-none shadow-sm">
                            <div>
                                <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-stone-800 mb-3">
                                    Search
                                </h3>
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Find perfume..."
                                        value={searchQuery}
                                        onChange={(e) =>
                                            setSearchQuery(e.target.value)
                                        }
                                        className="w-full bg-stone-50 border border-stone-200 text-xs text-stone-900 p-3 pl-9 placeholder-stone-400 focus:outline-none focus:border-stone-900 rounded-none"
                                    />
                                    <Search
                                        size={14}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
                                    />
                                </div>
                            </div>

                            <hr className="border-stone-100" />

                            <div>
                                <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-stone-800 mb-3">
                                    Fragrance Profile
                                </h3>
                                <div className="space-y-2">
                                    <button
                                        onClick={() => setSelectedGender("all")}
                                        className={`w-full text-left text-xs uppercase tracking-wider py-1.5 transition-colors ${selectedGender === "all" ? "text-amber-700 font-bold" : "text-stone-500 hover:text-stone-900"}`}
                                    >
                                        All Collections
                                    </button>
                                    {genderOptions.map((opt) => (
                                        <button
                                            key={opt.value}
                                            onClick={() =>
                                                setSelectedGender(opt.value)
                                            }
                                            className={`w-full text-left text-xs uppercase tracking-wider py-1.5 flex items-center justify-between transition-colors ${selectedGender === opt.value ? "text-amber-700 font-bold" : "text-stone-500 hover:text-stone-900"}`}
                                        >
                                            {opt.label}
                                            {selectedGender === opt.value && (
                                                <div className="w-1 h-1 bg-amber-700 rounded-full" />
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <hr className="border-stone-100" />

                            <div>
                                <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-stone-800 mb-3">
                                    Sizes Available
                                </h3>
                                <div className="grid grid-cols-2 gap-2">
                                    {volumeOptions.map((vol) => {
                                        const isActive =
                                            selectedVolumes.includes(
                                                vol.toLowerCase(),
                                            );
                                        return (
                                            <button
                                                key={vol}
                                                onClick={() =>
                                                    handleVolumeToggle(vol)
                                                }
                                                className={`py-2 px-3 border text-center text-xs font-medium tracking-wider transition-all rounded-none ${
                                                    isActive
                                                        ? "border-stone-900 bg-stone-900 text-white"
                                                        : "border-stone-200 text-stone-500 bg-white hover:border-stone-400 hover:text-stone-900"
                                                }`}
                                            >
                                                {vol}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            <hr className="border-stone-100" />

                            <div>
                                <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-stone-800 mb-3">
                                    Categories
                                </h3>
                                <select
                                    value={selectedCategory}
                                    onChange={(e) =>
                                        setSelectedCategory(e.target.value)
                                    }
                                    className="w-full bg-stone-50 border border-stone-200 text-xs text-stone-700 p-3 rounded-none focus:outline-none focus:border-stone-900"
                                >
                                    <option value="all">
                                        All Olfactory Families
                                    </option>
                                    {categories.map((cat) => (
                                        <option key={cat.id} value={cat.id}>
                                            {cat.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </aside>

                        {/* ── PRODUCTS CATALOG GRID ── */}
                        <main className="lg:col-span-3">
                            {filteredItems.length > 0 ? (
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-12">
                                    {filteredItems.map((item) => (
                                        <Link
                                            key={item.id}
                                            href={`/products/${item.slug}`}
                                            className="group block"
                                        >
                                            <div className="relative aspect-[3/4] bg-white border border-stone-200 overflow-hidden mb-4 rounded-none shadow-sm">
                                                {item.imageUrl ? (
                                                    <img
                                                        src={item.imageUrl}
                                                        alt={item.name}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center bg-stone-50">
                                                        <Sparkles
                                                            size={24}
                                                            className="text-stone-300"
                                                        />
                                                    </div>
                                                )}
                                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-300" />
                                                <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-stone-900 py-3 text-center">
                                                    <span className="text-white text-xs font-semibold tracking-widest uppercase flex items-center justify-center gap-1">
                                                        View Product{" "}
                                                        <ArrowRight size={12} />
                                                    </span>
                                                </div>
                                            </div>

                                            <div>
                                                <div className="flex justify-between items-start gap-2 mb-1">
                                                    <p className="text-[10px] tracking-widest uppercase text-amber-800 font-medium">
                                                        {item.brand?.name ||
                                                            "Aura Exclusives"}
                                                    </p>
                                                    <span className="text-[9px] uppercase tracking-widest text-stone-400 px-1.5 py-0.5 border border-stone-200 bg-stone-50">
                                                        {item.volume}
                                                    </span>
                                                </div>
                                                <h3 className="text-stone-900 font-serif text-base group-hover:text-amber-800 transition-colors leading-tight">
                                                    {item.name}
                                                </h3>
                                                <p className="text-stone-900 font-medium mt-2 text-sm tracking-wide">
                                                    ₹
                                                    {Number(
                                                        item.price,
                                                    ).toLocaleString("en-IN")}
                                                </p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-20 border border-stone-200 border-dashed rounded-none max-w-md mx-auto px-6 bg-white">
                                    <Sparkles
                                        className="mx-auto text-stone-300 mb-4"
                                        size={32}
                                    />
                                    <h3 className="font-serif text-lg text-stone-900 mb-1">
                                        No Fragrances Found
                                    </h3>
                                    <button
                                        onClick={() => {
                                            setSearchQuery("");
                                            setSelectedCategory("all");
                                            setSelectedBrand("all");
                                            setSelectedGender("all");
                                            setSelectedVolumes([]);
                                        }}
                                        className="text-xs font-semibold uppercase tracking-widest text-amber-700 underline underline-offset-4"
                                    >
                                        Clear Active Filters
                                    </button>
                                </div>
                            )}
                        </main>
                    </div>
                </div>
            </div>
        </StoreLayout>
    );
}
