import { Link } from "@inertiajs/react";

export default function BrandGrid({ brands = [] }) {
    if (!brands.length) return null;

    return (
        <section className="py-16 px-4">
            <div className="flex flex-col items-center mb-10">
                <h2 className="text-2xl md:text-3xl font-serif tracking-wide text-stone-900">
                    Shop By Brand
                </h2>
                <div className="h-0.5 w-12 bg-amber-600 mt-3"></div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
                {brands.map((brand) => (
                    <Link
                        key={brand.id}
                        href={`/products?brand=${brand.slug}`}
                        className="flex items-center justify-center border border-stone-200 rounded-xl p-8 text-center bg-white hover:border-stone-900 cursor-pointer transition-colors duration-200 group"
                    >
                        <span className="font-serif tracking-widest text-stone-500 uppercase text-xs group-hover:text-stone-900 transition-colors">
                            {brand.name}
                        </span>
                    </Link>
                ))}
            </div>
        </section>
    );
}
