import { Link } from "@inertiajs/react";

export default function CategoryGrid({ categories = [] }) {
    if (!categories.length) return null;

    return (
        <section className="py-16 px-4">
            <div className="flex flex-col items-center mb-10">
                <h2 className="text-2xl md:text-3xl font-serif tracking-wide text-stone-900">
                    Shop By Category
                </h2>
                <div className="h-0.5 w-12 bg-amber-600 mt-3"></div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-4 max-w-6xl mx-auto">
                {categories.map((category) => (
                    <Link
                        key={category.id}
                        href={`/products?category=${category.slug}`}
                        className="group cursor-pointer border border-stone-200 rounded-xl p-6 text-center bg-white shadow-sm hover:shadow-md hover:border-stone-400 hover:-translate-y-0.5 transition-all duration-300"
                    >
                        <span className="text-stone-800 font-medium text-sm tracking-wide group-hover:text-amber-800 transition-colors">
                            {category.name}
                        </span>
                    </Link>
                ))}
            </div>
        </section>
    );
}
