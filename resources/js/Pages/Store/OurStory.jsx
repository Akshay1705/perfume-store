import StoreLayout from "@/Layouts/StoreLayout";
import { Link } from "@inertiajs/react";
import { ArrowRight, Sparkles } from "lucide-react";

export default function OurStory() {
    return (
        <StoreLayout>
            <div className="bg-[#FAF9F6] min-h-screen text-stone-900 pb-24 selection:bg-amber-100">
                {/* ── HERO BANNER ── */}
                <header className="max-w-4xl mx-auto px-6 pt-20 pb-16 text-center">
                    <p className="text-[10px] tracking-[0.4em] uppercase text-amber-800 font-semibold mb-3">
                        The Heritage of Aura
                    </p>
                    <h1 className="font-serif text-4xl md:text-6xl tracking-wide text-stone-900 mb-6 font-light leading-tight">
                        Liquid memories, captured <br />
                        in{" "}
                        <span className="italic text-amber-700 font-normal">
                            obsidian glass.
                        </span>
                    </h1>
                    <div className="h-px w-16 bg-amber-700/30 mx-auto mt-8"></div>
                </header>

                {/* ── ASYMMETRIC CONCEPT GRID ── */}
                <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 items-center mb-24">
                    {/* Left: Philosophy Prose */}
                    <div className="md:col-span-5 space-y-6">
                        <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-stone-400 block">
                            01 / Olfactory Artistry
                        </span>
                        <h2 className="font-serif text-2xl md:text-3xl text-stone-900 font-normal leading-snug">
                            We don't create perfumes. We compose{" "}
                            <span className="italic text-amber-800">
                                atmospheres
                            </span>
                            .
                        </h2>
                        <p className="text-stone-600 text-sm leading-relaxed font-light">
                            Aura was born out of a radical dissatisfaction with
                            mass-market uniformity. Founded by a collective of
                            renegade perfumers, our maison operates in absolute
                            creative freedom, completely unburdened by
                            commercial trends or budget restraints.
                        </p>
                        <p className="text-stone-600 text-sm leading-relaxed font-light">
                            Every single curation is hand-blended using rare,
                            raw botanical extractions, sustainably harvested
                            from small-batch global estates.
                        </p>
                    </div>

                    {/* Right: Minimal Aesthetic Picture Frame with Actual Image */}
                    <div className="md:col-span-7 bg-white border border-stone-200 p-4 shadow-sm rounded-none">
                        <div className="aspect-[16/11] bg-stone-50 border border-stone-100 relative group overflow-hidden">
                            <img
                                src="/images/about-monograph.png"
                                alt="Maison Aura Attar Monograph Laboratory"
                                className="w-full h-full object-cover grayscale-[20%] group-hover:scale-105 transition-transform duration-700 ease-out"
                            />

                            {/* Elegant Minimalist Text Overlay on Hover */}
                            <div className="absolute inset-0 bg-stone-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                                <span className="text-[10px] uppercase tracking-[0.2em] text-white bg-stone-900/80 px-3 py-1.5 backdrop-blur-sm rounded-none">
                                    The Laboratory Monograph
                                </span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── THE THREE CORE PILLARS ── */}
                <section className="bg-white border-y border-stone-200/60 py-20 mb-24">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="text-center mb-16">
                            <h3 className="font-serif text-2xl text-stone-900">
                                Our Commitments
                            </h3>
                            <div className="h-px w-8 bg-amber-700/40 mx-auto mt-3"></div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                            {/* Pillar 1 */}
                            <div className="space-y-3">
                                <span className="font-serif text-amber-800 text-xl italic font-light">
                                    Uncompromised Sourcing
                                </span>
                                <h4 className="text-xs uppercase tracking-widest font-semibold text-stone-800">
                                    Rare Materials
                                </h4>
                                <p className="text-stone-500 text-xs leading-relaxed font-light">
                                    From real, hand-scraped Cambodian Oud to
                                    night-blooming Moroccan Jasmine, we source
                                    materials purely for their unadulterated
                                    depth.
                                </p>
                            </div>

                            {/* Pillar 2 */}
                            <div className="space-y-3 border-t md:border-t-0 md:border-x border-stone-100 pt-8 md:pt-0 md:px-8">
                                <span className="font-serif text-amber-800 text-xl italic font-light">
                                    Micro-Batch Aging
                                </span>
                                <h4 className="text-xs uppercase tracking-widest font-semibold text-stone-800">
                                    Slow Maceration
                                </h4>
                                <p className="text-stone-500 text-xs leading-relaxed font-light">
                                    Our formulas macerate in dark chambers for a
                                    minimum of 90 days before bottling. This
                                    gives the extracts structural time to bind
                                    seamlessly together.
                                </p>
                            </div>

                            {/* Pillar 3 */}
                            <div className="space-y-3 pt-8 md:pt-0">
                                <span className="font-serif text-amber-800 text-xl italic font-light">
                                    Gender-Fluid Chemistry
                                </span>
                                <h4 className="text-xs uppercase tracking-widest font-semibold text-stone-800">
                                    No Classification
                                </h4>
                                <p className="text-stone-500 text-xs leading-relaxed font-light">
                                    Scent has no gender. We design profiles that
                                    adapt strictly to the warmth and natural
                                    chemistry of individual skin topography.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── CLOSING FOOTER STATEMENT ── */}
                <footer className="max-w-2xl mx-auto px-6 text-center space-y-8">
                    <h3 className="font-serif text-2xl md:text-3xl text-stone-900 font-light">
                        "A perfume is a piece of clothing, a message, a way of{" "}
                        <span className="italic text-amber-700">traveling</span>
                        ."
                    </h3>

                    <div className="pt-4">
                        <Link
                            href="/products"
                            className="group inline-flex items-center gap-3 border border-stone-900 text-stone-900 hover:bg-stone-900 hover:text-white text-xs tracking-[0.2em] font-semibold uppercase px-8 py-4 rounded-none transition-all duration-300"
                        >
                            Explore The Collection
                            <ArrowRight
                                size={14}
                                className="transform group-hover:translate-x-1.5 transition-transform duration-300"
                            />
                        </Link>
                    </div>
                </footer>
            </div>
        </StoreLayout>
    );
}