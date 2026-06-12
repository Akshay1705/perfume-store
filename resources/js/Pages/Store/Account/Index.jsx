"use strict";

import StoreLayout from "@/Layouts/StoreLayout";
import { Link, usePage } from "@inertiajs/react";

export default function Account() {
    const { auth } = usePage().props;

    return (
        <StoreLayout>
            <div className="max-w-6xl mx-auto px-6 py-12">
                <h1 className="text-4xl font-serif mb-2">My Account</h1>

                <p className="text-stone-600 mb-10">
                    Welcome back, {auth.user.name}
                </p>

                <div className="grid md:grid-cols-3 gap-6">
                    <Link
                        href={route("profile.edit")}
                        className="border rounded-xl p-6 hover:shadow-lg transition"
                    >
                        <h3 className="text-xl font-semibold mb-2">Profile</h3>

                        <p className="text-stone-500">
                            Update your account details
                        </p>
                    </Link>

                    <Link
                        href={route("addresses.index")}
                        className="border rounded-xl p-6 hover:shadow-lg transition"
                    >
                        <h3 className="text-xl font-semibold mb-2">
                            Addresses
                        </h3>

                        <p className="text-stone-500">
                            Manage delivery addresses
                        </p>
                    </Link>

                    <Link
                        href="#"
                        className="border rounded-xl p-6 hover:shadow-lg transition"
                    >
                        <h3 className="text-xl font-semibold mb-2">Orders</h3>

                        <p className="text-stone-500">View order history</p>
                    </Link>
                </div>
            </div>
        </StoreLayout>
    );
}
