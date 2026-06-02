import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Dashboard() {
    return (
        <AuthenticatedLayout>
            <div className="p-8">
                <h1 className="text-3xl font-bold">Customer Dashboard</h1>

                <p className="mt-4 text-gray-600">Customer area placeholder.</p>
            </div>
        </AuthenticatedLayout>
    );
}
