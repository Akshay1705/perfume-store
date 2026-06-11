import StoreLayout from "@/Layouts/StoreLayout";
import { Link, usePage } from "@inertiajs/react";

export default function AccountLayout({ children }) {
    // Get the current URL path to highlight the active menu link
    const { url } = usePage();

    // Navigation configuration matrix
    const navItems = [
        {
            name: "Profile Information",
            href: route("account.profile"),
            active: url.startsWith("account/profile"),
        },
        {
            name: "Saved Addresses",
            href: route("addresses.index"),
            active: url.startsWith("/account/addresses"),
        },
        {
            name: "Order History",
            href: route("orders.index"),
            active: url.startsWith("/account/orders"),
        },
    ];

    return (
        <StoreLayout>
            <div className="bg-white min-h-screen text-stone-900 antialiased selection:bg-stone-900 selection:text-stone-50">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
                    {/* Responsive Grid Split System */}
                    <div className="flex flex-col lg:flex-row gap-12">
                        {/* Architectural Sidebar Block */}
                        <aside className="w-full lg:w-64 shrink-0">
                            <div className="border border-stone-200/80 p-6 rounded-none bg-white space-y-6">
                                <div>
                                    <h2 className="text-xs font-serif tracking-[0.2em] uppercase font-bold text-stone-900">
                                        My Account
                                    </h2>
                                    <p className="text-[10px] text-stone-400 font-light mt-0.5 tracking-wider uppercase">
                                        Navigation Terminal
                                    </p>
                                </div>

                                <nav className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-visible border-b lg:border-b-0 border-stone-100 pb-2 lg:pb-0 gap-1 lg:gap-0.5 scrollbar-none">
                                    {navItems.map((item, index) => (
                                        <Link
                                            key={index}
                                            href={item.href}
                                            className={`whitespace-nowrap px-4 py-2.5 text-[11px] uppercase tracking-widest font-medium transition-all duration-200 rounded-none border-b-2 lg:border-b-0 lg:border-l-2 text-center lg:text-left ${
                                                item.active
                                                    ? "border-stone-900 text-stone-900 bg-stone-50 font-semibold"
                                                    : "border-transparent text-stone-400 hover:text-stone-900 hover:bg-stone-50/50"
                                            }`}
                                        >
                                            {item.name}
                                        </Link>
                                    ))}

                                    {/* Destruction / Exit Route Action */}
                                    <Link
                                        href={route("logout")}
                                        method="post"
                                        as="button"
                                        className="w-full text-left whitespace-nowrap px-4 py-2.5 text-[11px] uppercase tracking-widest font-medium text-rose-600/70 hover:text-rose-700 hover:bg-rose-50/30 transition-all duration-200 rounded-none border-b-2 lg:border-b-0 lg:border-l-2 border-transparent lg:text-left cursor-pointer"
                                    >
                                        Log Out
                                    </Link>
                                </nav>
                            </div>
                        </aside>

                        {/* Interactive Main Viewport Canvas */}
                        <main className="flex-1 min-w-0">
                            <div className="border border-stone-200/80 p-6 sm:p-10 rounded-none bg-white shadow-[0_4px_25px_-5px_rgba(0,0,0,0.01)]">
                                {children}
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        </StoreLayout>
    );
}