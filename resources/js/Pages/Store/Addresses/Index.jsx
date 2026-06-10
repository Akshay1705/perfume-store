import AccountLayout from "@/Layouts/AccountLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Index({ addresses = [] }) {
    const { delete: destroy } = useForm();

    const handleDelete = (id) => {
        if (
            confirm("Are you certain you want to remove this delivery address?")
        ) {
            destroy(route("addresses.destroy", id), {
                preserveScroll: true,
            });
        }
    };

    return (
        <AccountLayout>
            <Head title="My Addresses" />

            {/* Pure white background with global typography contrast rules forced */}
            <div className="bg-white min-h-screen py-16 px-6 sm:px-8 text-stone-900 antialiased">
                <div className="mx-auto max-w-5xl">
                    {/* Header Block Section */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 pb-6 border-b border-stone-200">
                        <div>
                            <h1 className="text-xl font-serif tracking-[0.2em] text-stone-900 uppercase font-medium">
                                My Addresses
                            </h1>
                            <p className="text-xs text-stone-400 font-light mt-1 tracking-wide">
                                Manage your curated shipping destinations and
                                default delivery profiles.
                            </p>
                        </div>

                        {/* Flat, minimalist structural action button matching AURA brand style */}
                        <Link
                            href={route("addresses.create")}
                            className="inline-block bg-stone-950 text-white text-[11px] tracking-[0.25em] font-medium uppercase px-6 py-3 rounded-none hover:bg-stone-800 active:bg-stone-900 transition-colors shadow-none text-center"
                        >
                            + Add Address
                        </Link>
                    </div>

                    {/* Address Evaluation Grid Block */}
                    {addresses.length === 0 ? (
                        <div className="border border-stone-200 p-16 text-center mt-12 bg-stone-50/40 rounded-none">
                            <p className="text-xs text-stone-400 font-light tracking-wide">
                                No registered delivery addresses found inside
                                your customer profile account.
                            </p>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 gap-8 mt-12">
                            {addresses.map((address) => (
                                <div
                                    key={address.id}
                                    className="border border-stone-200 p-6 rounded-none bg-white flex flex-col justify-between hover:border-stone-400 transition-colors duration-300"
                                >
                                    {/* Data Payload Area */}
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-start gap-4">
                                            <div>
                                                {/* Text values are strictly wrapped with definitive dark typography utilities */}
                                                <h3 className="text-xs font-serif tracking-widest text-stone-900 uppercase font-bold">
                                                    {address.full_name ||
                                                        "No Name Provided"}
                                                </h3>
                                                <p className="text-[11px] text-stone-500 font-light mt-1 tracking-wide font-mono">
                                                    {address.phone ||
                                                        "No Contact Number"}
                                                </p>
                                            </div>

                                            {address.is_default && (
                                                <span className="text-[9px] uppercase tracking-[0.15em] bg-stone-900 text-white px-2 py-0.5 font-medium rounded-none">
                                                    Default
                                                </span>
                                            )}
                                        </div>

                                        {/* Physical Target Coordinates */}
                                        <div className="text-xs text-stone-800 font-light tracking-wide space-y-1.5 pt-4 border-t border-stone-100 leading-relaxed">
                                            <p className="text-stone-900 font-medium">
                                                {address.address_line_1 ||
                                                    "Empty Address Parameter"}
                                            </p>
                                            {address.address_line_2 && (
                                                <p className="text-stone-700">
                                                    {address.address_line_2}
                                                </p>
                                            )}
                                            <p className="text-stone-700">
                                                {address.city ||
                                                    "No City Specified"}
                                                ,{" "}
                                                {address.state ||
                                                    "No State Specified"}
                                            </p>
                                            <p className="text-stone-400 font-mono text-[11px] pt-0.5">
                                                {address.postal_code ||
                                                    "000000"}{" "}
                                                — {address.country || "India"}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Control Pipeline Strip */}
                                    <div className="mt-8 pt-4 border-t border-stone-100 flex items-center gap-6 text-[10px] uppercase tracking-[0.2em] font-medium">
                                        <Link
                                            href={route(
                                                "addresses.edit",
                                                address.id,
                                            )}
                                            className="text-stone-900 hover:text-stone-500 transition-colors underline underline-offset-4"
                                        >
                                            Edit
                                        </Link>

                                        <button
                                            onClick={() =>
                                                handleDelete(address.id)
                                            }
                                            className="text-stone-400 hover:text-rose-700 transition-colors underline underline-offset-4 bg-transparent border-none p-0 cursor-pointer"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AccountLayout>
    );
}
