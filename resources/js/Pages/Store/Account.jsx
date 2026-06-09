import StoreLayout from "@/Layouts/StoreLayout";
import { usePage, Link } from "@inertiajs/react";

export default function Account() {
    const { auth } = usePage().props;

    return (
        <StoreLayout>
            <div className="max-w-4xl mx-auto py-16">
                <h1 className="text-3xl font-serif mb-4">My Account</h1>

                <p>Welcome back, {auth.user.name}</p>

                <div className="mt-8 space-y-3">
                    <Link href={route("profile.edit")}>Edit Profile</Link>

                    <br />

                    <Link href="#">My Orders</Link>

                    <br />

                    <Link href={route("logout")} method="post" as="button">
                        Logout
                    </Link>
                </div>
            </div>
        </StoreLayout>
    );
}
