"use strict";

import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("register"), {
            onFinish: () => reset("password", "password_confirmation"),
        });
    };

    return (
        <GuestLayout>
            <Head title="Create Account" />

            {/* Header Identity Block */}
            <div className="mb-8 text-center sm:text-left">
                <h2 className="text-xl font-serif tracking-[0.2em] text-stone-900 uppercase font-medium">
                    Create Account
                </h2>
                <p className="text-xs text-stone-400 font-light mt-1 tracking-wide">
                    Join Maison Aura for a tailored fragrance shopping
                    experience.
                </p>
            </div>

            <form onSubmit={submit} className="space-y-5">
                {/* Full Name */}
                <div>
                    <InputLabel
                        htmlFor="name"
                        value="Full Name"
                        className="text-[11px] uppercase tracking-widest font-medium text-stone-500"
                    />

                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1.5 block w-full rounded-none border-stone-200 bg-stone-50/50 px-3 py-2 text-xs font-light tracking-wide focus:border-stone-900 focus:ring-0 shadow-none transition-colors"
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData("name", e.target.value)}
                        required
                    />

                    <InputError
                        message={errors.name}
                        className="mt-1.5 text-xs text-rose-600 font-light"
                    />
                </div>

                {/* Email Address */}
                <div>
                    <InputLabel
                        htmlFor="email"
                        value="Email Address"
                        className="text-[11px] uppercase tracking-widest font-medium text-stone-500"
                    />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1.5 block w-full rounded-none border-stone-200 bg-stone-50/50 px-3 py-2 text-xs font-light tracking-wide focus:border-stone-900 focus:ring-0 shadow-none transition-colors"
                        autoComplete="username"
                        onChange={(e) => setData("email", e.target.value)}
                        required
                    />

                    <InputError
                        message={errors.email}
                        className="mt-1.5 text-xs text-rose-600 font-light"
                    />
                </div>

                {/* Password */}
                <div>
                    <InputLabel
                        htmlFor="password"
                        value="Password"
                        className="text-[11px] uppercase tracking-widest font-medium text-stone-500"
                    />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1.5 block w-full rounded-none border-stone-200 bg-stone-50/50 px-3 py-2 text-xs font-light tracking-wide focus:border-stone-900 focus:ring-0 shadow-none transition-colors"
                        autoComplete="new-password"
                        onChange={(e) => setData("password", e.target.value)}
                        required
                    />

                    <InputError
                        message={errors.password}
                        className="mt-1.5 text-xs text-rose-600 font-light"
                    />
                </div>

                {/* Confirm Password */}
                <div>
                    <InputLabel
                        htmlFor="password_confirmation"
                        value="Confirm Password"
                        className="text-[11px] uppercase tracking-widest font-medium text-stone-500"
                    />

                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1.5 block w-full rounded-none border-stone-200 bg-stone-50/50 px-3 py-2 text-xs font-light tracking-wide focus:border-stone-900 focus:ring-0 shadow-none transition-colors"
                        autoComplete="new-password"
                        onChange={(e) =>
                            setData("password_confirmation", e.target.value)
                        }
                        required
                    />

                    <InputError
                        message={errors.password_confirmation}
                        className="mt-1.5 text-xs text-rose-600 font-light"
                    />
                </div>

                {/* Form Action Controls */}
                <div className="pt-4 flex flex-col gap-3">
                    <PrimaryButton
                        className="w-full justify-center bg-stone-950 text-white text-[11px] tracking-[0.25em] font-medium uppercase py-3 rounded-none hover:bg-stone-800 active:bg-stone-900 transition-all shadow-none duration-300 disabled:opacity-50"
                        disabled={processing}
                    >
                        {processing ? "Creating Profile..." : "Register"}
                    </PrimaryButton>

                    <div className="text-center pt-2">
                        <span className="text-xs text-stone-400 font-light tracking-wide">
                            Already have an account?{" "}
                        </span>
                        <Link
                            href={route("login")}
                            className="text-xs font-medium text-stone-900 tracking-wide hover:text-amber-800 transition-colors underline underline-offset-4"
                        >
                            Sign In
                        </Link>
                    </div>
                </div>
            </form>
        </GuestLayout>
    );
}
