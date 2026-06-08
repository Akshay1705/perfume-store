import { Link } from "@inertiajs/react";
import { ArrowRight } from "lucide-react";
import ProductCard from "@/Components/Store/ProductCard";

export default function FeaturedProducts({ variants = [] }) {
    if (!variants.length) return null;

    // Strict slice layout to display only the top 4 featured fragrance variants
    const featuredVariants = variants.slice(0, 4);

    return (
        <section className="py-20 px-6 bg-white border-y border-stone-200/60">
            <div className="max-w-7xl mx-auto">
                {/* ── HEADER ── */}
                <div className="flex flex-col items-center mb-12 text-center">
                    <p className="text-[10px] tracking-[0.3em] uppercase text-amber-800 font-semibold mb-2">
                        Handpicked Aromas
                    </p>
                    <h2 className="text-2xl md:text-3xl font-serif tracking-wide text-stone-900">
                        Featured{" "}
                        <span className="italic text-amber-800">Products</span>
                    </h2>
                    <div className="h-px w-12 bg-amber-700/40 mt-4"></div>
                </div>

                {/* ── 4-COLUMN PRODUCT MATRIX ── */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
                    {featuredVariants.map((variant) => (
                        <div
                            key={variant.id}
                            className="hover:-translate-y-1 transition-transform duration-300"
                        >
                            <ProductCard variant={variant} />
                        </div>
                    ))}
                </div>

                {/* ── LUXURY ACTION CTA BUTTON ── */}
                <div className="flex justify-center">
                    <Link
                        href="/products"
                        className="group inline-flex items-center gap-3 border border-stone-900 text-stone-900 hover:bg-stone-900 hover:text-white text-xs tracking-[0.2em] font-semibold uppercase px-8 py-4 rounded-none transition-all duration-300"
                    >
                        Explore Complete Collection
                        <ArrowRight
                            size={14}
                            className="transform group-hover:translate-x-1.5 transition-transform duration-300"
                        />
                    </Link>
                </div>
            </div>
        </section>
    );
}
