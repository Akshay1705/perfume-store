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
                <button className="mt-8 px-8 py-3 bg-stone-950 text-white text-sm font-medium tracking-wider uppercase rounded-full hover:bg-stone-800 transition-colors shadow-sm">
                    Explore Collection
                </button>
            </div>
        </section>
    );
}
