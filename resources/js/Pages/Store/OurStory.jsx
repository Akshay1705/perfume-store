"use strict";

import StoreLayout from "@/Layouts/StoreLayout";
import { Link } from "@inertiajs/react";
import { ArrowRight, ShieldCheck } from "lucide-react";

export default function OurStory() {
    return (
        <StoreLayout>
            <div className="bg-[#FAF9F6] min-h-screen text-stone-900 pb-24 selection:bg-amber-100">
                {/* ── HERO BANNER ── */}
                <header className="max-w-4xl mx-auto px-6 pt-20 pb-16 text-center">
                    <p className="text-[10px] tracking-[0.4em] uppercase text-amber-800 font-semibold mb-3">
                        Bridging Fragrance Worlds
                    </p>
                    <h1 className="font-serif text-4xl md:text-5xl tracking-wide text-stone-900 mb-6 font-light leading-tight">
                        Rare Middle Eastern & niche <br />
                        scents, delivered with{" "}
                        <span className="italic text-amber-700 font-normal">
                            absolute trust.
                        </span>
                    </h1>
                    <p className="max-w-xl mx-auto text-stone-500 text-xs md:text-sm tracking-wide font-light leading-relaxed">
                        We bring the world’s most elusive olfactory masterpieces
                        directly to your doorstep in India, making luxury
                        accessible.
                    </p>
                    <div className="h-px w-16 bg-amber-700/30 mx-auto mt-8"></div>
                </header>

                {/* ── THE PROBLEM & SOLUTION CONCEPT GRID ── */}
                <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 items-center mb-24">
                    {/* Left Side: Story Prose */}
                    <div className="md:col-span-5 space-y-6">
                        <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-stone-400 block">
                            01 / Our Mission
                        </span>
                        <h2 className="font-serif text-2xl md:text-3xl text-stone-900 font-normal leading-snug">
                            No borders for true{" "}
                            <span className="italic text-amber-800">
                                fragrance connoisseurs.
                            </span>
                        </h2>
                        <p className="text-stone-600 text-sm leading-relaxed font-light">
                            For years, finding authentic Middle Eastern scents,
                            elite niche perfumes, and traditional premium attars
                            in India was an uphill battle. Enthusiasts were
                            forced to rely on international travel or
                            questionable third-party sellers.
                        </p>
                        <p className="text-stone-600 text-sm leading-relaxed font-light">
                            Aura was founded to change that. We curated a
                            seamless bridge to bring these hidden jewels from
                            across the oceans directly to your vanity. Every
                            spray, droplet, and mist tells a story of heritage,
                            sourced with flawless integrity.
                        </p>
                    </div>

                    {/* Right Side: Visual Frame */}
                    <div className="md:col-span-7 bg-white border border-stone-200 p-4 shadow-sm rounded-none">
                        <div className="aspect-[16/11] bg-stone-50 border border-stone-100 relative group overflow-hidden">
                            <img
                                src="/images/about-monograph.png"
                                alt="Authentic Niche Perfumery Curation"
                                className="w-full h-full object-cover grayscale-[10%] group-hover:scale-105 transition-transform duration-700 ease-out"
                            />
                            <div className="absolute inset-0 bg-stone-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                                <span className="text-[10px] uppercase tracking-[0.2em] text-white bg-stone-900/80 px-4 py-2 backdrop-blur-sm rounded-none inline-flex items-center gap-2">
                                    <ShieldCheck
                                        size={12}
                                        className="text-amber-400"
                                    />{" "}
                                    100% Verified Authentic Sourcing
                                </span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── PRODUCT LINES & CORE COMMITTMENTS ── */}
                <section className="bg-white border-y border-stone-200/60 py-20 mb-24">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="text-center mb-16">
                            <h3 className="font-serif text-2xl text-stone-900">
                                What We Bring To You
                            </h3>
                            <div className="h-px w-8 bg-amber-700/40 mx-auto mt-3"></div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                            {/* Pillar 1 */}
                            <div className="space-y-3">
                                <span className="font-serif text-amber-800 text-xl italic font-light">
                                    Middle Eastern & Niche Gems
                                </span>
                                <h4 className="text-xs uppercase tracking-widest font-semibold text-stone-800">
                                    Rare Perfumes & Attars
                                </h4>
                                <p className="text-stone-500 text-xs leading-relaxed font-light">
                                    From opulent oud-heavy blends of the East to
                                    contemporary artistic expressions from
                                    independent global fragrance houses, we
                                    secure profiles that set you apart from the
                                    crowd.
                                </p>
                            </div>

                            {/* Pillar 2 */}
                            <div className="space-y-3 border-t md:border-t-0 md:border-x border-stone-100 pt-8 md:pt-0 md:px-8">
                                <span className="font-serif text-amber-800 text-xl italic font-light">
                                    Risk-Free Exploration
                                </span>
                                <h4 className="text-xs uppercase tracking-widest font-semibold text-stone-800">
                                    Discovery Sets & Gifts
                                </h4>
                                <p className="text-stone-500 text-xs leading-relaxed font-light">
                                    Blind buying luxury items can be daunting.
                                    We offer specialized discovery vial sets,
                                    premium daily deodorants, body mists, and
                                    luxury gift collections to help you find
                                    your signature profile at your own pace.
                                </p>
                            </div>

                            {/* Pillar 3 */}
                            <div className="space-y-3 pt-8 md:pt-0">
                                <span className="font-serif text-amber-800 text-xl italic font-light">
                                    The Aura Guarantee
                                </span>
                                <h4 className="text-xs uppercase tracking-widest font-semibold text-stone-800">
                                    Uncompromising Trust
                                </h4>
                                <p className="text-stone-500 text-xs leading-relaxed font-light">
                                    Counterfeits plague the industry. At Aura,
                                    trust is our core foundation. Every single
                                    bottle is sourced directly from original
                                    manufacturers or officially authorized
                                    curators—no exceptions.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── CLOSING FOOTER STATEMENT ── */}
                <footer className="max-w-2xl mx-auto px-6 text-center space-y-8">
                    <h3 className="font-serif text-2xl md:text-3xl text-stone-900 font-light leading-relaxed">
                        "Luxury isn’t about status; it's about the feeling of
                        finding what was once{" "}
                        <span className="italic text-amber-700">
                            unreachable
                        </span>
                        ."
                    </h3>

                    <div className="pt-4">
                        <Link
                            href="/products"
                            className="group inline-flex items-center gap-3 border border-stone-900 text-stone-900 hover:bg-stone-900 hover:text-white text-xs tracking-[0.2em] font-semibold uppercase px-8 py-4 rounded-none transition-all duration-300"
                        >
                            Explore The Rare Collection
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