import { Link } from "@inertiajs/react";

export default function AdminLayout({ children }) {
    return (
        <div className="min-h-screen bg-gray-100">
            {/* Top Navbar */}

            <header className="bg-white shadow">
                <div className="mx-auto flex items-center justify-between px-6 py-4">
                    <h1 className="text-xl font-bold">Perfume Admin</h1>

                    <Link href="/dashboard" className="text-sm text-blue-600">
                        Customer Dashboard
                    </Link>
                </div>
            </header>

            <div className="flex min-h-[calc(100vh-73px)]">
                {/* Sidebar */}

                <aside className="w-64 bg-slate-900 text-white p-6">
                    <nav className="space-y-3">
                        <Link
                            href="/admin/dashboard"
                            className="block hover:text-yellow-400"
                        >
                            Dashboard
                        </Link>

                        <Link
                            href="/admin/categories"
                            className="block hover:text-yellow-400"
                        >
                            Categories
                        </Link>

                        <Link
                            href="/admin/brands"
                            className="block hover:text-yellow-400"
                        >
                            Brands
                        </Link>

                        <Link
                            href="/admin/products"
                            className="block hover:text-yellow-400"
                        >
                            Products
                        </Link>

                        <Link
                            href="/admin/discounts"
                            className="block hover:text-yellow-400"
                        >
                            Discounts
                        </Link>
                    </nav>
                </aside>

                {/* Page Content */}

                <main className="flex-1 p-8">{children}</main>
            </div>
        </div>
    );
}
