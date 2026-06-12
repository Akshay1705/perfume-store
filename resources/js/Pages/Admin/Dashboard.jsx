"use strict";

import AdminLayout from "@/Layouts/AdminLayout";

export default function Dashboard() {
    return (
        <AdminLayout>
            <h1 className="text-3xl text-white font-bold">Admin Dashboard</h1>

            <p className="mt-4 text-gray-600">
                Welcome to Perfume Store Admin Panel.
            </p>
        </AdminLayout>
    );
}
