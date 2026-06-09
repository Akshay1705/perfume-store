import { Link } from "@inertiajs/react";

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-stone-50 px-4 py-12 sm:px-6 lg:px-8 selection:bg-stone-900 selection:text-stone-50">
            {/* Minimalist Return-to-Store Utility Anchor */}
            <div className="absolute top-8 left-8">
                <Link
                    href="/"
                    className="text-[10px] uppercase tracking-[0.25em] text-stone-400 hover:text-stone-900 transition-colors flex items-center gap-1.5 font-light"
                >
                    <svg
                        className="w-3 h-3"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                        />
                    </svg>
                    Return to Maison
                </Link>
            </div>

            {/* Sharp Editorial Content Box Container */}
            <div className="w-full max-w-md bg-white border border-stone-200/80 px-8 py-10 shadow-[0_4px_20px_-4px_rgba(28,25,23,0.04)] rounded-none">
                {children}
            </div>

            {/* Minimal Footer Signature Tag */}
            <div className="mt-8 text-center">
                <p className="text-[10px] uppercase tracking-[0.3em] text-stone-400/80 font-light">
                    Aura Luxury Fragrances
                </p>
            </div>
        </div>
    );
}
