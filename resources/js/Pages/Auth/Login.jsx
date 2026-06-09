import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <GuestLayout>
            <Head title="Sign In" />

            {/* Header Identity Block */}
            <div className="mb-8 text-center sm:text-left">
                <h2 className="text-xl font-serif tracking-[0.2em] text-stone-900 uppercase font-medium">
                    Maison Aura
                </h2>
                <p className="text-xs text-stone-400 font-light mt-1 tracking-wide">
                    Sign in to access your private fragrance collections.
                </p>
            </div>

            {status && (
                <div className="mb-6 text-xs tracking-wide font-medium text-amber-800 bg-amber-50 border border-amber-200/60 p-3 rounded-none">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-5">
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
                        isFocused={true}
                        onChange={(e) => setData("email", e.target.value)}
                    />

                    <InputError
                        message={errors.email}
                        className="mt-1.5 text-xs text-rose-600 font-light"
                    />
                </div>

                {/* Password */}
                <div>
                    <div className="flex items-center justify-between">
                        <InputLabel
                            htmlFor="password"
                            value="Password"
                            className="text-[11px] uppercase tracking-widest font-medium text-stone-500"
                        />

                        {canResetPassword && (
                            <Link
                                href={route("password.request")}
                                className="text-[11px] tracking-wide text-stone-400 font-light hover:text-stone-900 transition-colors underline underline-offset-4"
                            >
                                Forgot password?
                            </Link>
                        )}
                    </div>

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1.5 block w-full rounded-none border-stone-200 bg-stone-50/50 px-3 py-2 text-xs font-light tracking-wide focus:border-stone-900 focus:ring-0 shadow-none transition-colors"
                        autoComplete="current-password"
                        onChange={(e) => setData("password", e.target.value)}
                    />

                    <InputError
                        message={errors.password}
                        className="mt-1.5 text-xs text-rose-600 font-light"
                    />
                </div>

                {/* Remember Me Toggle */}
                <div className="block pt-1">
                    <label className="flex items-center cursor-pointer select-none group">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) =>
                                setData("remember", e.target.checked)
                            }
                            className="rounded-none border-stone-200 text-stone-900 focus:ring-0 focus:ring-offset-0 w-3.5 h-3.5"
                        />
                        <span className="ms-2.5 text-xs text-stone-400 font-light tracking-wide group-hover:text-stone-600 transition-colors">
                            Remember my session
                        </span>
                    </label>
                </div>

                {/* Action Submit Control Section */}
                <div className="pt-2 flex flex-col gap-3">
                    <PrimaryButton
                        className="w-full justify-center bg-stone-950 text-white text-[11px] tracking-[0.25em] font-medium uppercase py-3 rounded-none hover:bg-stone-800 active:bg-stone-900 transition-all shadow-none duration-300 disabled:opacity-50"
                        disabled={processing}
                    >
                        {processing ? "Verifying Credentials..." : "Sign In"}
                    </PrimaryButton>

                    <div className="text-center pt-2">
                        <span className="text-xs text-stone-400 font-light tracking-wide">
                            Don't have an account?{" "}
                        </span>
                        <Link
                            href={route("register")}
                            className="text-xs font-medium text-stone-900 tracking-wide hover:text-amber-800 transition-colors underline underline-offset-4"
                        >
                            Create Account
                        </Link>
                    </div>
                </div>
            </form>
        </GuestLayout>
    );
}