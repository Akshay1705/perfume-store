import ProductCard from "@/Components/Store/ProductCard";

export default function FeaturedProducts({ products = [] }) {
    if (!products.length) return null;

    return (
        <section className="py-16 px-4 bg-stone-50/50 rounded-2xl">
            <div className="flex flex-col items-center mb-10">
                <h2 className="text-2xl md:text-3xl font-serif tracking-wide text-stone-900">
                    Featured Products
                </h2>
                <div className="h-0.5 w-12 bg-amber-600 mt-3"></div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="hover:-translate-y-1 transition-transform duration-300"
                    >
                        <ProductCard product={product} />
                    </div>
                ))}
            </div>
        </section>
    );
}
