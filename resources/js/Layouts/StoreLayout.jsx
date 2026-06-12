import { usePage } from "@inertiajs/react";
import Navbar from "@/Components/Store/Navbar";
import Footer from "@/Components/Store/Footer";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function StoreLayout({ children}) {
    const { categories = [], brands = [], cartCount = [] } = usePage().props;

    return (
        <>
            <div className="min-h-screen bg-store-bg text-stone-900">
                <Navbar
                    categories={categories}
                    brands={brands}
                    cartCount={cartCount}
                />

                {children}

                <Footer />
            </div>
                <ToastContainer
                    position="bottom-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop
                    closeOnClick
                    pauseOnHover
                    theme="light"
                />
        </>
    );
}
 