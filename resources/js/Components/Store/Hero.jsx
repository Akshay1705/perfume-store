import { Link } from "@inertiajs/react";

export default function Hero() {
    return (
        <section className="relative overflow-hidden bg-gradient-to-r from-stone-100 to-amber-50/40 py-24 md:py-32 px-4 text-center rounded-2xl my-4">
            <div className="max-w-3xl mx-auto">
                <span className="text-xs font-semibold tracking-widest text-amber-700 uppercase">
                    The Luxury Collection
                </span>
                <h2 className="mt-3 text-4xl md:text-6xl font-serif font-light tracking-wide text-stone-900">
                    Premium Fragrances
                </h2>
                <p className="mt-4 text-base md:text-lg text-stone-600 max-w-md mx-auto font-light">
                    Discover exquisite Perfumes, traditional Attars, and curated
                    Discovery Sets.
                </p>
                <Link
                    href="/products"
                    className="inline-block mt-8 px-8 py-4 border border-stone-900 text-stone-900 hover:bg-stone-900 hover:text-white text-xs tracking-[0.2em] font-semibold uppercase rounded-none transition-all duration-300"
                >
                    Explore Collection
                </Link>
            </div>
        </section>
    );
}
