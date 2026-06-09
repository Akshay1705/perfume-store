import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("password.email"));
    };

    return (
        <GuestLayout>
            <Head title="Reset Password" />

            {/* Header Identity Block */}
            <div className="mb-6 text-center sm:text-left">
                <h2 className="text-xl font-serif tracking-[0.2em] text-stone-900 uppercase font-medium">
                    Password Recovery
                </h2>
                <p className="text-xs text-stone-400 font-light mt-2 tracking-wide leading-relaxed">
                    Enter your registered email address below. We will transmit
                    an official recovery configuration link to your inbox.
                </p>
            </div>

            {status && (
                <div className="mb-6 text-xs tracking-wide font-medium text-amber-800 bg-amber-50 border border-amber-200/60 p-3 rounded-none">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-5">
                {/* Email Input Field */}
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
                        isFocused={true}
                        onChange={(e) => setData("email", e.target.value)}
                        required
                    />

                    <InputError
                        message={errors.email}
                        className="mt-1.5 text-xs text-rose-600 font-light"
                    />
                </div>

                {/* Form Actions */}
                <div className="pt-2 flex flex-col gap-3">
                    <PrimaryButton
                        className="w-full justify-center bg-stone-950 text-white text-[11px] tracking-[0.25em] font-medium uppercase py-3 rounded-none hover:bg-stone-800 active:bg-stone-900 transition-all shadow-none duration-300 disabled:opacity-50"
                        disabled={processing}
                    >
                        {processing
                            ? "Transmitting Link..."
                            : "Send Recovery Link"}
                    </PrimaryButton>

                    <div className="text-center pt-2">
                        <Link
                            href={route("login")}
                            className="text-xs font-medium text-stone-400 tracking-wide hover:text-stone-900 transition-colors underline underline-offset-4"
                        >
                            Back to Sign In
                        </Link>
                    </div>
                </div>
            </form>
        </GuestLayout>
    );
}
