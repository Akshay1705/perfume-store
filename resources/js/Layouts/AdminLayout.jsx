import { Link } from "@inertiajs/react";
import { Menu, LogOut, Settings } from "lucide-react";
import { useState } from "react";

export default function AdminLayout({ children }) {
    const [sidebarOpen, setIsOpen] = useState(true);

    return (
        <div className="min-h-screen bg-slate-950">
            {/* Top Navbar */}
            <header className="sticky top-0 z-40 border-b border-slate-800/50 bg-slate-900/80 backdrop-blur-xl">
                <div className="mx-auto flex items-center justify-between px-6 py-4">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setIsOpen(!sidebarOpen)}
                            className="hidden p-2 hover:bg-slate-800 rounded-lg transition-colors lg:flex"
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
                        href="/dashboard"
                        className="group flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30 text-sm font-medium text-amber-400 hover:border-amber-500/60 hover:from-amber-500/20 hover:to-orange-500/20 transition-all duration-300"
                    >
                        Customer Dashboard
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
                    } fixed lg:sticky left-0 top-[73px] h-[calc(100vh-73px)] bg-gradient-to-b from-slate-900 to-slate-950 border-r border-slate-800/50 transition-all duration-300 overflow-hidden lg:overflow-visible`}
                >
                    <nav className="flex flex-col gap-1 p-6">
                        {/* Navigation Items */}
                        {[
                            {
                                label: "Dashboard",
                                href: "/admin/dashboard",
                                icon: "📊",
                            },
                            {
                                label: "Categories",
                                href: "/admin/categories",
                                icon: "🏷️",
                            },
                            {
                                label: "Brands",
                                href: "/admin/brands",
                                icon: "🎨",
                            },
                            {
                                label: "Products",
                                href: "/admin/products",
                                icon: "📦",
                            },
                            {
                                label: "Discounts",
                                href: "/admin/discounts",
                                icon: "🏷️",
                            },
                        ].map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="group relative flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:text-white transition-all duration-200 hover:bg-slate-800/50"
                            >
                                <span className="text-lg">{item.icon}</span>
                                <span className="font-medium">
                                    {item.label}
                                </span>
                                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-amber-500/0 to-orange-500/0 group-hover:from-amber-500/10 group-hover:to-orange-500/10 transition-all duration-300 -z-10" />
                            </Link>
                        ))}

                        {/* Divider */}
                        <div className="my-4 h-px bg-slate-800/50" />

                        {/* Bottom Actions */}
                        <div className="space-y-1 mt-auto">
                            <button className="w-full group flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:text-white transition-all duration-200 hover:bg-slate-800/50">
                                <Settings size={18} />
                                <span className="font-medium">Settings</span>
                                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-amber-500/0 to-orange-500/0 group-hover:from-amber-500/10 group-hover:to-orange-500/10 transition-all duration-300 -z-10" />
                            </button>

                            <button className="w-full group flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:text-red-400 transition-all duration-200 hover:bg-red-950/20">
                                <LogOut size={18} />
                                <span className="font-medium">Logout</span>
                            </button>
                        </div>
                    </nav>
                </aside>

                {/* Overlay for mobile */}
                {sidebarOpen && (
                    <div
                        className="fixed inset-0 top-[73px] z-30 bg-black/50 lg:hidden"
                        onClick={() => setIsOpen(false)}
                    />
                )}

                {/* Page Content */}
                <main className="flex-1 overflow-auto">
                    <div className="px-6 py-8 lg:px-8">
                        <div className="mx-auto max-w-7xl">{children}</div>
                    </div>
                </main>
            </div>
        </div>
    );
}
