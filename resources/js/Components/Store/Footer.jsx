export default function Footer() {
    return (
        <footer className="bg-stone-950 text-stone-400 text-sm mt-24 rounded-t-3xl">
            <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8">
                {/* Column 1: Brand Info */}
                <div className="col-span-2 md:col-span-1 space-y-4">
                    <h3 className="text-white font-serif tracking-widest text-lg uppercase">
                        AURA<span className="text-amber-600 font-light">.</span>
                    </h3>
                    <p className="text-stone-400 font-light leading-relaxed text-xs">
                        Crafting elite sensory experiences through exquisite
                        artisanal perfumes, traditional attars, and premium
                        discovery collections.
                    </p>
                </div>

                {/* Column 2: Shop Links */}
                <div>
                    <h4 className="text-stone-200 font-medium tracking-wider uppercase text-xs mb-4">
                        Shop
                    </h4>
                    <ul className="space-y-2.5 font-light text-xs">
                        <li>
                            <a
                                href="#"
                                className="hover:text-white transition-colors"
                            >
                                All Perfumes
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="hover:text-white transition-colors"
                            >
                                Attar Oils
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="hover:text-white transition-colors"
                            >
                                Discovery Sets
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="hover:text-white transition-colors"
                            >
                                New Arrivals
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Column 3: Customer Care Links */}
                <div>
                    <h4 className="text-stone-200 font-medium tracking-wider uppercase text-xs mb-4">
                        Assistance
                    </h4>
                    <ul className="space-y-2.5 font-light text-xs">
                        <li>
                            <a
                                href="#"
                                className="hover:text-white transition-colors"
                            >
                                Track Your Order
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="hover:text-white transition-colors"
                            >
                                Shipping & Returns
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="hover:text-white transition-colors"
                            >
                                Contact Support
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="hover:text-white transition-colors"
                            >
                                FAQs
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Column 4: Boutique Info & Social Links */}
                <div className="col-span-2 md:col-span-1 space-y-4">
                    <h4 className="text-stone-200 font-medium tracking-wider uppercase text-xs">
                        Boutique Hours
                    </h4>
                    <p className="text-xs font-light text-stone-400 leading-relaxed">
                        Mon — Sat: 11:00 AM — 8:00 PM <br />
                        Sunday: Closed
                    </p>

                    {/* Minimalist Socials */}
                    <div className="pt-2">
                        <h5 className="text-stone-400 font-medium text-[11px] uppercase tracking-widest mb-2.5">
                            Follow Us
                        </h5>
                        <div className="flex space-x-4 text-stone-400">
                            <a
                                href="#"
                                className="hover:text-white transition-colors"
                                aria-label="Instagram"
                            >
                                <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
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
                                href="#"
                                className="hover:text-white transition-colors"
                                aria-label="Facebook"
                            >
                                <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                                </svg>
                            </a>
                            <a
                                href="#"
                                className="hover:text-white transition-colors"
                                aria-label="Pinterest"
                            >
                                <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M12 2a10 10 0 00-3.5 19.4c-.1-.9-.1-2.2.2-3.1.3-1.1 1.8-7.7 1.8-7.7s-.4-.9-.4-2.2c0-2 .9-3.6 2.7-3.6 1.3 0 1.9 1 1.9 2.1 0 1.3-.8 3.2-1.2 5a1.7 1.7 0 001.7 2.1c2 0 3.6-2.2 3.6-5.3 0-2.8-2-4.7-4.9-4.7-3.3 0-5.3 2.5-5.3 5.2 0 1 .4 2.1.9 2.7l-.3 1.1c-.2-.1-.7-.4-1-.9-1.2-1.5-1.1-4.1.3-5.6 2.3-2.5 5.9-2.2 7.7-.2 1.6 1.8 1.4 4.3.4 5.4-.3.4-.7.8-1.2.7a1.2 1.2 0 01-.9-1.4l.6-2.5c.2-.7.2-1.3-.1-1.8-.4-.6-1.1-.9-1.8-.9-1.5 0-2.5 1.5-2.5 3.5 0 1 .3 1.8.6 2.2l-1 4.1c-.4.8-1.2 2-1.7 2.6A10 10 0 1012 2z"></path>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Copyright & Secondary Legal bar */}
            <div className="border-t border-stone-900 max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-600 font-light gap-4">
                <div>
                    &copy; {new Date().getFullYear()} Aura Luxury Fragrances.
                    All rights reserved.
                </div>
                <div className="flex space-x-6">
                    <a
                        href="#"
                        className="hover:text-stone-400 transition-colors"
                    >
                        Privacy Policy
                    </a>
                    <a
                        href="#"
                        className="hover:text-stone-400 transition-colors"
                    >
                        Terms of Service
                    </a>
                </div>
            </div>
        </footer>
    );
}
