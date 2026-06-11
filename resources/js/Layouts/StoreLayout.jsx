import { usePage } from "@inertiajs/react";
import Navbar from "@/Components/Store/Navbar";
import Footer from "@/Components/Store/Footer";


export default function StoreLayout({ children}) {
    const { categories = [], brands = [], cartCount = [] } = usePage().props;

    return (
        <div className="min-h-screen bg-store-bg text-stone-900">
            <Navbar
                categories={categories}
                brands={brands}
                cartCount={cartCount}
            />

            {children}

            {/* Comprehensive Footer Layout */}
            <Footer />
        </div>
    );
}
 