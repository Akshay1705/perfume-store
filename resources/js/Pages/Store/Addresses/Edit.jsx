"use strict";

import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import AccountLayout from "@/Layouts/AccountLayout";
import { Head, Link, useForm, usePage } from "@inertiajs/react";

export default function Edit({ address }) {
    const { data, setData, put, processing, errors } = useForm({
        full_name: address.full_name || "",
        phone: address.phone || "",
        address_line_1: address.address_line_1 || "",
        address_line_2: address.address_line_2 || "",
        city: address.city || "",
        state: address.state || "",
        postal_code: address.postal_code || "",
        country: address.country || "India",
        is_default: !!address.is_default,
    });


    const submit = (e) => {
        e.preventDefault();
        put(route("addresses.update", address.id));
    };

    return (
        <AccountLayout>
            <Head title="Edit Address" />

            <div className="bg-white min-h-screen py-12 px-4 sm:px-6 lg:px-8 selection:bg-stone-900 selection:text-stone-50">
                <div className="mx-auto max-w-2xl">
                    {/* Editorial Header Navigation Block */}
                    <div className="flex justify-between items-center pb-6 border-b border-stone-200 mb-8">
                        <div>
                            <h1 className="text-xl font-serif tracking-[0.2em] text-stone-900 uppercase font-medium">
                                Modify Address
                            </h1>
                            <p className="text-xs text-stone-400 font-light mt-1 tracking-wide">
                                Update the delivery destination coordinates for
                                this specific profile location.
                            </p>
                        </div>
                        <Link
                            href={route("addresses.index")}
                            className="text-[10px] uppercase tracking-widest text-stone-400 hover:text-stone-900 transition-colors underline underline-offset-4 font-medium"
                        >
                            Cancel
                        </Link>
                    </div>

                    {/* Architectural Modification Grid Form */}
                    <form onSubmit={submit} className="space-y-6">
                        {/* Core Identification Pair Row */}
                        <div className="grid sm:grid-cols-2 gap-5">
                            <div>
                                <InputLabel
                                    htmlFor="full_name"
                                    value="Recipient Full Name"
                                    className="text-[11px] uppercase tracking-widest font-medium text-stone-500"
                                />
                                <TextInput
                                    id="full_name"
                                    type="text"
                                    className="mt-1.5 block w-full rounded-none border-stone-200 bg-stone-50/50 px-3 py-2 text-xs font-light tracking-wide text-stone-900 placeholder-stone-400 focus:border-stone-900 focus:ring-0 shadow-none transition-colors"
                                    value={data.full_name}
                                    onChange={(e) =>
                                        setData("full_name", e.target.value)
                                    }
                                    required
                                    isFocused
                                />
                                <InputError
                                    message={errors.full_name}
                                    className="mt-1.5 text-xs text-rose-600 font-light"
                                />
                            </div>

                            <div>
                                <InputLabel
                                    htmlFor="phone"
                                    value="Contact Phone Number"
                                    className="text-[11px] uppercase tracking-widest font-medium text-stone-500"
                                />
                                <TextInput
                                    id="phone"
                                    type="text"
                                    className="mt-1.5 block w-full rounded-none border-stone-200 bg-stone-50/50 px-3 py-2 text-xs font-light tracking-wide text-stone-900 placeholder-stone-400 focus:border-stone-900 focus:ring-0 shadow-none transition-colors"
                                    value={data.phone}
                                    onChange={(e) =>
                                        setData("phone", e.target.value)
                                    }
                                    required
                                />
                                <InputError
                                    message={errors.phone}
                                    className="mt-1.5 text-xs text-rose-600 font-light"
                                />
                            </div>
                        </div>

                        {/* Physical Address Coordinates Block */}
                        <div className="space-y-5 pt-2 border-t border-stone-100">
                            <div>
                                <InputLabel
                                    htmlFor="address_line_1"
                                    value="Address Line 1"
                                    className="text-[11px] uppercase tracking-widest font-medium text-stone-500"
                                />
                                <TextInput
                                    id="address_line_1"
                                    type="text"
                                    className="mt-1.5 block w-full rounded-none border-stone-200 bg-stone-50/50 px-3 py-2 text-xs font-light tracking-wide text-stone-900 placeholder-stone-400 focus:border-stone-900 focus:ring-0 shadow-none transition-colors"
                                    value={data.address_line_1}
                                    onChange={(e) =>
                                        setData(
                                            "address_line_1",
                                            e.target.value,
                                        )
                                    }
                                    required
                                />
                                <InputError
                                    message={errors.address_line_1}
                                    className="mt-1.5 text-xs text-rose-600 font-light"
                                />
                            </div>

                            <div>
                                <InputLabel
                                    htmlFor="address_line_2"
                                    value="Address Line 2 (Optional)"
                                    className="text-[11px] uppercase tracking-widest font-medium text-stone-500"
                                />
                                <TextInput
                                    id="address_line_2"
                                    type="text"
                                    className="mt-1.5 block w-full rounded-none border-stone-200 bg-stone-50/50 px-3 py-2 text-xs font-light tracking-wide text-stone-900 placeholder-stone-400 focus:border-stone-900 focus:ring-0 shadow-none transition-colors"
                                    value={data.address_line_2}
                                    onChange={(e) =>
                                        setData(
                                            "address_line_2",
                                            e.target.value,
                                        )
                                    }
                                />
                                <InputError
                                    message={errors.address_line_2}
                                    className="mt-1.5 text-xs text-rose-600 font-light"
                                />
                            </div>
                        </div>

                        {/* Location Matrix Matrix Grid (City, State, Postal Code, Country) */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2 border-t border-stone-100">
                            <div className="col-span-1">
                                <InputLabel
                                    htmlFor="city"
                                    value="City"
                                    className="text-[11px] uppercase tracking-widest font-medium text-stone-500"
                                />
                                <TextInput
                                    id="city"
                                    type="text"
                                    className="mt-1.5 block w-full rounded-none border-stone-200 bg-stone-50/50 px-3 py-2 text-xs font-light tracking-wide text-stone-900 placeholder-stone-400 focus:border-stone-900 focus:ring-0 shadow-none transition-colors"
                                    value={data.city}
                                    onChange={(e) =>
                                        setData("city", e.target.value)
                                    }
                                    required
                                />
                                <InputError
                                    message={errors.city}
                                    className="mt-1.5 text-xs text-rose-600 font-light"
                                />
                            </div>

                            <div className="col-span-1">
                                <InputLabel
                                    htmlFor="state"
                                    value="State"
                                    className="text-[11px] uppercase tracking-widest font-medium text-stone-500"
                                />
                                <TextInput
                                    id="state"
                                    type="text"
                                    className="mt-1.5 block w-full rounded-none border-stone-200 bg-stone-50/50 px-3 py-2 text-xs font-light tracking-wide text-stone-900 placeholder-stone-400 focus:border-stone-900 focus:ring-0 shadow-none transition-colors"
                                    value={data.state}
                                    onChange={(e) =>
                                        setData("state", e.target.value)
                                    }
                                    required
                                />
                                <InputError
                                    message={errors.state}
                                    className="mt-1.5 text-xs text-rose-600 font-light"
                                />
                            </div>

                            <div className="col-span-1">
                                <InputLabel
                                    htmlFor="postal_code"
                                    value="Postal Code"
                                    className="text-[11px] uppercase tracking-widest font-medium text-stone-500"
                                />
                                <TextInput
                                    id="postal_code"
                                    type="text"
                                    className="mt-1.5 block w-full rounded-none border-stone-200 bg-stone-50/50 px-3 py-2 text-xs font-light tracking-wide text-stone-900 placeholder-stone-400 focus:border-stone-900 focus:ring-0 shadow-none transition-colors"
                                    value={data.postal_code}
                                    onChange={(e) =>
                                        setData("postal_code", e.target.value)
                                    }
                                    required
                                />
                                <InputError
                                    message={errors.postal_code}
                                    className="mt-1.5 text-xs text-rose-600 font-light"
                                />
                            </div>

                            <div className="col-span-1">
                                <InputLabel
                                    htmlFor="country"
                                    value="Country"
                                    className="text-[11px] uppercase tracking-widest font-medium text-stone-500"
                                />
                                <TextInput
                                    id="country"
                                    type="text"
                                    className="mt-1.5 block w-full rounded-none border-stone-200 bg-stone-200/60 px-3 py-2 text-xs font-normal tracking-wide text-stone-500 select-none shadow-none transition-colors"
                                    value={data.country}
                                    disabled
                                    required
                                />
                                <InputError
                                    message={errors.country}
                                    className="mt-1.5 text-xs text-rose-600 font-light"
                                />
                            </div>
                        </div>

                        {/* Minimal Operational Flag Control (Default Checkbox) */}
                        <div className="pt-4 border-t border-stone-100">
                            <label className="flex items-center gap-3 group cursor-pointer">
                                <input
                                    type="checkbox"
                                    name="is_default"
                                    checked={data.is_default}
                                    onChange={(e) =>
                                        setData("is_default", e.target.checked)
                                    }
                                    className="h-4 w-4 rounded-none border-stone-300 text-stone-950 bg-stone-50/50 focus:ring-0 focus:ring-offset-0 transition-colors"
                                />
                                <span className="text-xs text-stone-600 font-light tracking-wide group-hover:text-stone-900 transition-colors select-none">
                                    Set as primary profile default delivery
                                    destination parameters.
                                </span>
                            </label>
                            <InputError
                                message={errors.is_default}
                                className="mt-1.5 text-xs text-rose-600 font-light"
                            />
                        </div>

                        {/* Submission Action Anchor */}
                        <div className="pt-6 border-t border-stone-100 flex justify-end gap-4">
                            <PrimaryButton
                                className="bg-stone-950 text-white text-[11px] tracking-[0.25em] font-medium uppercase px-8 py-3 rounded-none hover:bg-stone-800 active:bg-stone-900 transition-all shadow-none duration-300 disabled:opacity-50"
                                disabled={processing}
                            >
                                {processing
                                    ? "Updating Address Coordinates..."
                                    : "Update Destination"}
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </AccountLayout>
    );
}
