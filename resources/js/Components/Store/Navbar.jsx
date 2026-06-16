import { useState } from "react";
import { Link, usePage } from "@inertiajs/react";

export default function Navbar({
    categories = [],
    brands = [],
    cartCount = 0,
}) {
    const { auth } = usePage().props;
    const user = auth?.user;
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-100 px-4 sm:px-6 py-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Left Side: Mobile Hamburger Button & Logo */}
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden p-2 -ml-2 text-stone-600 hover:text-stone-950 focus:outline-none transition-colors"
                        aria-label="Toggle navigation menu"
                    >
                        <svg
                            className="w-5 h-5 stroke-[1.75]"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            {isMenuOpen ? (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            ) : (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            )}
                        </svg>
                    </button>

                    <Link
                        href="/"
                        className="text-xl font-serif tracking-widest text-stone-900 uppercase font-semibold"
                    >
                        AURA<span className="text-amber-700 font-light">.</span>
                    </Link>
                </div>

                {/* Nav Links (Desktop) */}
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

                {/* Actions (Untouched Login/Register/Cart UI) */}
                <div className="flex items-center space-x-4 text-stone-700">
                    {user ? (
                        <div className="relative group">
                            <button className="text-sm font-medium text-stone-700">
                                {user.name}
                            </button>

                            <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-stone-200 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                                <Link
                                    href={route("account.profile")}
                                    className="block px-4 py-3 hover:bg-stone-50"
                                >
                                    My Profile
                                </Link>

                                <Link
                                    href={route("orders.index")}
                                    className="block px-4 py-3 hover:bg-stone-50"
                                >
                                    My Orders
                                </Link>

                                <Link
                                    href="/logout"
                                    method="post"
                                    as="button"
                                    className="block w-full text-left px-4 py-3 hover:bg-red-50 text-red-600"
                                >
                                    Logout
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <div className="hidden sm:flex items-center space-x-4 text-sm font-medium">
                            <Link
                                href="/login"
                                className="hover:text-stone-950 transition-colors"
                            >
                                Login
                            </Link>
                            <Link
                                href="/register"
                                className="hover:text-stone-950 transition-colors"
                            >
                                Register
                            </Link>
                        </div>
                    )}

                    <Link
                        href={route("cart.index")}
                        className="p-2 text-stone-600 hover:text-stone-950 transition-colors relative inline-flex items-center justify-center group"
                        aria-label={`Shopping Bag containing ${cartCount} items`}
                    >
                        <svg
                            className="w-[19px] h-[19px] stroke-[1.5]"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                            ></path>
                        </svg>

                        {Number(cartCount) > 0 && (
                            <span className="absolute -top-0.5 -right-0.5 bg-stone-950 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-mono font-bold tracking-tighter">
                                {cartCount}
                            </span>
                        )}
                    </Link>
                </div>
            </div>

            {/* Mobile Navigation Drawer Panel */}
            {isMenuOpen && (
                <div className="md:hidden fixed top-[69px] left-0 w-full h-[calc(100vh-69px)] bg-white border-t border-stone-100 z-40 overflow-y-auto px-6 py-8 flex flex-col justify-between">
                    
                    <div className="space-y-8">
                        {/* Primary Core Sections */}
                        <div className="flex flex-col space-y-4 text-sm uppercase tracking-widest font-medium text-stone-900">
                            <Link
                                href="/"
                                onClick={() => setIsMenuOpen(false)}
                                className="hover:text-amber-800 transition-colors"
                            >
                                Home
                            </Link>
                            <Link
                                href="/products"
                                onClick={() => setIsMenuOpen(false)}
                                className="hover:text-amber-800 transition-colors"
                            >
                                All Products
                            </Link>
                            <Link
                                href="/our-story"
                                onClick={() => setIsMenuOpen(false)}
                                className="hover:text-amber-800 transition-colors border-b border-stone-100 pb-2"
                            >
                                Our Story
                            </Link>
                        </div>

                        {/* Mobile Categories Accordion Grid */}
                        {categories.length > 0 && (
                            <div className="space-y-3">
                                <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-stone-400">
                                    Categories
                                </h4>
                                <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-xs tracking-wide text-stone-600">
                                    {categories.map((c) => (
                                        <Link
                                            key={c.id}
                                            href={`/products?category=${c.slug}`}
                                            onClick={() => setIsMenuOpen(false)}
                                            className="hover:text-stone-900 py-0.5"
                                        >
                                            {c.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Mobile Brands Accordion Grid */}
                        {brands.length > 0 && (
                            <div className="space-y-3 pt-2">
                                <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-stone-400">
                                    Our Fragrance Houses
                                </h4>
                                <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-xs tracking-wide text-stone-600">
                                    {brands.map((b) => (
                                        <Link
                                            key={b.id}
                                            href={`/products?brand=${b.slug}`}
                                            onClick={() => setIsMenuOpen(false)}
                                            className="hover:text-stone-900 py-0.5"
                                        >
                                            {b.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Bottom Utility Actions Drawer Panel */}
                    <div className="pt-6 border-t border-stone-100 mt-auto">

                        {!user && (
                            <div className="flex flex-col gap-2">
                                <Link
                                    href="/login"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="w-full text-center bg-stone-950 text-white text-xs tracking-widest font-medium uppercase py-3 transition-colors"
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/register"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="w-full text-center border border-stone-200 bg-white text-stone-700 text-xs tracking-widest font-medium uppercase py-3 transition-colors"
                                >
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}