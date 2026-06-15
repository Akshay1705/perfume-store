import { Link } from "@inertiajs/react";

export default function Hero() {
    return (
        <section className="relative overflow-hidden bg-gradient-to-r from-stone-100 to-amber-200 py-24 md:py-32 px-4 text-center rounded-3xl my-4 border border-stone-200/40">
            <div className="max-w-3xl mx-auto">
                <span className="text-[10px] tracking-[0.4em] uppercase font-bold text-amber-800">
                    100% Verified Authentic Curation
                </span>

                <h2 className="mt-4 text-4xl md:text-6xl font-serif font-light tracking-wide text-stone-900 leading-tight">
                    Rare Middle Eastern <br />& Niche{" "}
                    <span className="italic text-amber-700 font-normal">
                        Perfumeries
                    </span>
                </h2>

                <p className="mt-6 text-sm md:text-base text-stone-600 max-w-xl mx-auto font-light tracking-wide leading-relaxed">
                    Bringing hard-to-find global fragrances directly to India.
                    Explore curated luxury Perfumes, traditional Attars, daily
                    Deodorants, Body Mists, and signature Discovery Sets with
                    absolute trust.
                </p>

                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        href="/products"
                        className="w-full sm:w-auto inline-block px-8 py-4 border border-stone-900 bg-stone-900 text-white hover:bg-transparent hover:text-stone-900 text-[11px] tracking-[0.2em] font-medium uppercase transition-all duration-300"
                    >
                        Explore Collection
                    </Link>
                    <Link
                        href={`/products?category=discovery-set`}
                        className="w-full sm:w-auto inline-block px-8 py-4 border border-stone-300 text-stone-700 hover:border-stone-900 hover:text-stone-900 text-[11px] tracking-[0.2em] font-medium uppercase transition-all duration-300"
                    >
                        Try Discovery Sets
                    </Link>
                </div>
            </div>
        </section>
    );
}
