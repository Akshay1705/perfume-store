import { Link } from "@inertiajs/react";

export default function Navbar({ categories = [], brands = [] }) {
    return (
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-100 px-6 py-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Logo */}
                <Link
                    href="/"
                    className="text-xl font-serif tracking-widest text-stone-900 uppercase font-semibold"
                >
                    AURA<span className="text-amber-700 font-light">.</span>
                </Link>

                {/* Nav Links */}
                <div className="hidden md:flex items-center space-x-8 text-sm font-medium tracking-wide text-stone-600">
                    {/* Home */}
                    <Link
                        href="/"
                        className="hover:text-stone-950 transition-colors"
                    >
                        Home
                    </Link>
                    {/* Shop Dropdown */}
                    <div className="relative group">
                        <button className="hover:text-stone-950 transition-colors">
                            Shop
                        </button>

                        <div className="absolute left-0 top-full mt-3 w-56 bg-white border border-stone-200/80 shadow-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 rounded-none z-50">
                            <div className="py-1.5 text-xs font-medium tracking-wide text-stone-600">
                                {/* All Products Link */}
                                <Link
                                    href="/products"
                                    className="block px-4 py-2.5 text-stone-900 hover:bg-stone-50 hover:text-amber-800 transition-colors uppercase tracking-widest text-[10px]"
                                >
                                    All Products
                                </Link>

                                {/* Dynamic Filtered Category Links */}
                                {categories.map((category) => (
                                    <Link
                                        key={category.id}
                                        href={`/products?category=${category.slug}`}
                                        className="block px-4 py-2.5 hover:bg-stone-50 hover:text-amber-800 transition-colors"
                                    >
                                        {category.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                    {/* Brands Dropdown */}
                    <div className="relative group">
                        <button className="hover:text-stone-950 transition-colors">
                            Brands
                        </button>

                        <div className="absolute left-0 top-full mt-3 w-56 bg-white border border-stone-200 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                            <div className="py-2">
                                {brands.map((brand) => (
                                    <Link
                                        key={brand.id}
                                        href={`/products?brand=${brand.slug}`}
                                        className="block px-4 py-2 hover:bg-stone-100"
                                    >
                                        {brand.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                    <Link
                        href="/our-story"
                        className="hover:text-stone-950 transition-colors"
                    >
                        Our Story
                    </Link>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-4 text-stone-700">
                    <button
                        className="p-2 hover:text-stone-950 transition-colors"
                        aria-label="Search"
                    >
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                        >
                            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                        </svg>
                    </button>
                    <button
                        className="p-2 hover:text-stone-950 transition-colors relative"
                        aria-label="Cart"
                    >
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                        >
                            <path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                        </svg>
                        <span className="absolute top-1 right-1 bg-amber-700 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                            0
                        </span>
                    </button>
                </div>
            </div>
        </nav>
    );
}
