"use strict";

import AccountLayout from "@/Layouts/AccountLayout";
import { Head } from "@inertiajs/react";
import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";

export default function Edit({ mustVerifyEmail, status }) {
    return (
        <AccountLayout>
            <Head title="Account Settings" />

            <div className="bg-white min-h-screen py-12 px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-3xl space-y-16">
                    {/* Section 1: Top Navigation Identity Frame */}
                    <div className="border-b border-stone-200 pb-6">
                        <h2 className="text-xl font-serif tracking-[0.2em] text-stone-900 uppercase font-medium">
                            Account Profile
                        </h2>
                        <p className="text-xs text-stone-400 font-light mt-1 tracking-wide">
                            Manage your institutional access configuration
                            details and credentials.
                        </p>
                    </div>

                    {/* Section 2: Personal Identification Matrix */}
                    <div className="bg-white border border-stone-200/80 p-6 sm:p-8 rounded-none shadow-[0_4px_20px_-4px_rgba(28,25,23,0.02)]">
                        <div className="mb-4">
                            <h3 className="text-xs font-serif tracking-widest text-stone-900 uppercase font-medium">
                                Personal Information
                            </h3>
                        </div>
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </div>

                    {/* Section 3: Security & Protection Control Grid */}
                    <div className="bg-white border border-stone-200/80 p-6 sm:p-8 rounded-none shadow-[0_4px_20px_-4px_rgba(28,25,23,0.02)]">
                        <div className="mb-4">
                            <h3 className="text-xs font-serif tracking-widest text-stone-900 uppercase font-medium">
                                Access Password
                            </h3>
                        </div>
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>

                    {/* Section 4: Account Decommission Protocol */}
                    <div className="bg-stone-50 border border-stone-200/80 p-6 sm:p-8 rounded-none">
                        <div className="mb-4">
                            <h3 className="text-xs font-serif tracking-widest text-rose-900 uppercase font-medium">
                                Decommission Account
                            </h3>
                        </div>
                        <DeleteUserForm className="max-w-xl" />
                    </div>
                </div>
            </div>
        </AccountLayout>
    );
}
