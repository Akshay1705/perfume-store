"use strict";

import StoreLayout from "@/Layouts/StoreLayout";
import { Head, Link,usePage } from "@inertiajs/react";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function Success({ order }) {
    const { flash } = usePage().props;

    useEffect(() => {
        console.log("Flash data:", flash);
        if (flash?.success) toast.success(flash.success);
        if (flash?.error) toast.error(flash.error);
    }, [flash]);
    
    return (
        <StoreLayout>
            <Head title="Order Placed" />

            <div className="max-w-3xl mx-auto py-24 text-center">
                <h1 className="text-4xl font-serif mb-4">
                    Order Placed Successfully
                </h1>

                <p className="text-stone-500 mb-8">
                    Your order #{order.id} has been received.
                </p>

                <Link
                    href={route("home")}
                    className="bg-stone-950 text-white px-6 py-3"
                >
                    Continue Shopping
                </Link>
            </div>
        </StoreLayout>
    );
}
