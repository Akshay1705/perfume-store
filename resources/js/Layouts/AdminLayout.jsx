'use client';

import { Link, usePage } from "@inertiajs/react";
import {Menu, LayoutDashboard, Tags, Palette, Package, TicketPercent, ShoppingBag,} from "lucide-react";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

export default function AdminLayout({ children }) {
    const [sidebarOpen, setIsOpen] = useState(window.innerWidth >= 1024);
    const { url } = usePage();

    const navItems = [
        { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
        { label: "Orders", href: "/admin/orders", icon: ShoppingBag },
        { label: "Categories", href: "/admin/categories", icon: Tags },
        { label: "Brands", href: "/admin/brands", icon: Palette },
        { label: "Products", href: "/admin/products", icon: Package },
        { label: "Discounts", href: "/admin/discounts", icon: TicketPercent },
    ];

    return (
        <div className="min-h-screen bg-slate-950">
            {/* Top Navbar */}
            <header className="sticky top-0 z-40 border-b border-slate-800/50 bg-slate-900/80 backdrop-blur-xl">
                <div className="mx-auto flex items-center justify-between px-6 py-4">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setIsOpen(!sidebarOpen)}
                            className="flex p-2 hover:bg-slate-800 rounded-lg transition-colors"
                        >
                            <Menu size={20} className="text-slate-400" />
                        </button>

                        <div>
                            <h1 className="text-xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                                Perfume Admin
                            </h1>
                            <p className="text-xs text-slate-500">
                                Management Dashboard
                            </p>
                        </div>
                    </div>

                    <Link
                        href="/"
                        className="group flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30 text-sm font-medium text-amber-400 hover:border-amber-500/60 hover:from-amber-500/20 hover:to-orange-500/20 transition-all duration-300"
                    >
                        Aura.com
                        <span className="group-hover:translate-x-0.5 transition-transform">
                            →
                        </span>
                    </Link>
                </div>
            </header>

            <div className="flex min-h-[calc(100vh-73px)]">
                {/* Sidebar */}
                <aside
                    className={`${
                        sidebarOpen ? "w-64" : "w-0"
                    } fixed lg:sticky left-0 top-[73px] h-[calc(100vh-73px)] bg-gradient-to-b from-slate-900 to-slate-950 border-r border-slate-800/50 transition-all duration-300 overflow-hidden z-30`}
                >
                    <div className="w-64">
                        <nav className="flex flex-col gap-1 p-6">
                            {navItems.map((item) => {
                                const isActive = url.startsWith(item.href);
                                const Icon = item.icon;
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        onClick={() => {
                                            // Close sidebar on mobile after clicking a nav item
                                            if (window.innerWidth < 1024) {
                                                setIsOpen(false);
                                            }
                                        }}
                                        className={`relative flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                                            isActive
                                                ? "text-amber-400 bg-amber-500/10 border border-amber-500/30"
                                                : "text-slate-400 hover:text-white hover:bg-slate-800/50 border border-transparent"
                                        }`}
                                    >
                                        <Icon size={18} />
                                        <span>{item.label}</span>
                                        {isActive && (
                                            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-gradient-to-b from-amber-400 to-orange-500 rounded-full" />
                                        )}
                                    </Link>
                                );
                            })}

                            <div className="my-4 h-px bg-slate-800/50" />
                        </nav>
                    </div>
                </aside>

                {/* Overlay for mobile */}
                {sidebarOpen && (
                    <div
                        className="fixed inset-0 top-[73px] z-20 bg-black/50 lg:hidden"
                        onClick={() => setIsOpen(false)}
                    />
                )}

                {/* Page Content */}
                <main className="flex-1 overflow-auto min-w-0">
                    <div className="px-6 py-8 lg:px-8">
                        <div className="mx-auto max-w-7xl">{children}</div>
                    </div>
                </main>
            </div>

            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                pauseOnHover
                theme="dark"
            />
        </div>
    );
}