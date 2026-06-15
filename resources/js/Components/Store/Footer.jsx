import { Link } from "@inertiajs/react";

export default function Footer() {
    return (
        <footer className="bg-stone-950 text-stone-400 text-sm mt-24 border-t border-stone-900 rounded-none">
            <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8">
                {/* ── COLUMN 1: BRAND IDENTITY ── */}
                <div className="col-span-2 md:col-span-1 space-y-4">
                    <Link
                        href="/"
                        className="text-white font-serif tracking-[0.25em] text-lg uppercase font-semibold block transition-colors hover:text-amber-500"
                    >
                        AURA<span className="text-amber-600 font-light">.</span>
                    </Link>
                    <p className="text-stone-400 font-light leading-relaxed text-xs max-w-xs">
                        Your trusted gateway to rare Middle Eastern houses,
                        premium attars, and niche global fragrances.
                        Authenticity guaranteed, delivered seamlessly across
                        India.
                    </p>
                </div>

                {/* ── COLUMN 2: EXPANDED CATEGORY SEARCH LINKS ── */}
                <div>
                    <h4 className="text-stone-200 font-medium tracking-widest uppercase text-[11px] mb-5">
                        Shop Collection
                    </h4>
                    <ul className="space-y-3 font-light text-xs tracking-wide">
                        <li>
                            <Link
                                href="/products"
                                className="hover:text-white transition-colors text-stone-400"
                            >
                                All Fragrances
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/products?category=middle-eastern"
                                className="hover:text-white transition-colors text-stone-400"
                            >
                                Middle Eastern & Niche
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/products?category=attars"
                                className="hover:text-white transition-colors text-stone-400"
                            >
                                Pure Attar Oils
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/products?category=discovery-sets"
                                className="hover:text-white transition-colors text-stone-400"
                            >
                                Discovery & Gift Sets
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/products?category=mists-deodorants"
                                className="hover:text-white transition-colors text-stone-400"
                            >
                                Deos & Body Mists
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* ── COLUMN 3: MAISON EXPLORATION ── */}
                <div>
                    <h4 className="text-stone-200 font-medium tracking-widest uppercase text-[11px] mb-5">
                        The Maison
                    </h4>
                    <ul className="space-y-3 font-light text-xs tracking-wide">
                        <li>
                            <Link
                                href="/our-story"
                                className="hover:text-white transition-colors text-stone-400"
                            >
                                Our Story & Trust
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="#"
                                className="hover:text-white transition-colors text-stone-400"
                            >
                                Shipping & Delivery (India)
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="#"
                                className="hover:text-white transition-colors text-stone-400"
                            >
                                Authenticity Guarantee
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* ── COLUMN 4: BOUTIQUE HOURS & SOCIALS ── */}
                <div className="col-span-2 md:col-span-1 space-y-5">
                    <div>
                        <h4 className="text-stone-200 font-medium tracking-widest uppercase text-[11px] mb-3">
                            Concierge Hours
                        </h4>
                        <p className="text-xs font-light text-stone-400 leading-relaxed tracking-wide">
                            Mon — Sat: 11:00 AM — 8:00 PM <br />
                            Sunday: Closed (Online 24/7)
                        </p>
                    </div>

                    {/* Minimalist Social Icons */}
                    <div className="pt-2">
                        <h5 className="text-stone-400 font-medium text-[10px] uppercase tracking-[0.2em] mb-3">
                            Follow Our Journey
                        </h5>
                        <div className="flex space-x-4 text-stone-400">
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-white transition-colors"
                                aria-label="Instagram"
                            >
                                <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    viewBox="0 0 24 24"
                                >
                                    <rect
                                        width="20"
                                        height="20"
                                        x="2"
                                        y="2"
                                        rx="5"
                                        ry="5"
                                    ></rect>
                                    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zM17.5 6.5h.01"></path>
                                </svg>
                            </a>
                            <a
                                href="https://pinterest.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-white transition-colors"
                                aria-label="Pinterest"
                            >
                                <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M12 2a10 10 0 00-3.5 19.4c-.1-.9-.1-2.2.2-3.1.3-1.1 1.8-7.7 1.8-7.7s-.4-.9-.4-2.2c0-2 .9-3.6 2.7-3.6 1.3 0 1.9 1 1.9 2.1 0 1.3-.8 3.2-1.2 5a1.7 1.7 0 001.7 2.1c2 0 3.6-2.2 3.6-5.3 0-2.8-2-4.7-4.9-4.7-3.3 0-5.3 2.5-5.3 5.2 0 1 .4 2.1.9 2.7l-.3 1.1c-.2-.1-.7-.4-1-.9-1.2-1.5-1.1-4.1.3-5.6 2.3-2.5 5.9-2.2 7.7-.2 1.6 1.8 1.4 4.3.4 5.4-.3.4-.7.8-1.2.7a1.2 1.2 0 01-.9-1.4l.6-2.5c.2-.7.2-1.3-.1-1.8-.4-.6-1.1-.9-1.8-.9-1.5 0-2.5 1.5-2.5 3.5 0 1 .3 1.8.6 2.2l-1 4.1c-.4.8-1.2 2-1.7 2.6A10 10 0 1012 2z"></path>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── SECONDARY METADATA BAR ── */}
            <div className="border-t border-stone-900 max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-600 font-light tracking-wider gap-4">
                <div>
                    &copy; {new Date().getFullYear()} Aura Luxury Fragrances.
                    All original products are property of their respective
                    owners.
                </div>
                <div className="flex space-x-6">
                    <Link
                        href="#"
                        className="hover:text-stone-400 transition-colors"
                    >
                        Privacy Policy
                    </Link>
                    <Link
                        href="#"
                        className="hover:text-stone-400 transition-colors"
                    >
                        Terms of Service
                    </Link>
                </div>
            </div>
        </footer>
    );
}