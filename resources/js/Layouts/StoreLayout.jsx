import { usePage } from "@inertiajs/react";
import Navbar from "@/Components/Store/Navbar";
import Footer from "@/Components/Store/Footer";


export default function StoreLayout({ children}) {
    const { categories = [], brands = [] } = usePage().props;

    return (
        <div className="min-h-screen bg-store-bg text-stone-900">
            <Navbar categories={categories} brands={brands} />

            {children}

            {/* Comprehensive Footer Layout */}
            <Footer />
        </div>
    );
}
 