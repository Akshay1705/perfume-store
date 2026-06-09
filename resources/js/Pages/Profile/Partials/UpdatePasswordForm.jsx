import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Transition } from "@headlessui/react";
import { useForm } from "@inertiajs/react";
import { useRef } from "react";

export default function UpdatePasswordForm({ className = "" }) {
    const passwordInput = useRef();
    const currentPasswordInput = useRef();

    const {
        data,
        setData,
        errors,
        put,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        current_password: "",
        password: "",
        password_confirmation: "",
    });

    const updatePassword = (e) => {
        e.preventDefault();

        put(route("password.update"), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset("password", "password_confirmation");
                    passwordInput.current.focus();
                }
                if (errors.current_password) {
                    reset("current_password");
                    currentPasswordInput.current.focus();
                }
            },
        });
    };

    return (
        <section className={className}>
            <header className="mb-6">
                <p className="text-xs text-stone-400 font-light tracking-wide">
                    Ensure your profile operates under high-entropy security
                    credentials to isolate your details.
                </p>
            </header>

            <form onSubmit={updatePassword} className="space-y-5 text-black">
                {/* Current Password */}
                <div>
                    <InputLabel
                        htmlFor="current_password"
                        value="Current Password"
                        className="text-[11px] uppercase tracking-widest font-medium text-stone-500"
                    />
                    <TextInput
                        id="current_password"
                        ref={currentPasswordInput}
                        value={data.current_password}
                        onChange={(e) =>
                            setData("current_password", e.target.value)
                        }
                        type="password"
                        className="mt-1.5 block w-full rounded-none border-stone-200 bg-stone-50/30 px-3 py-2 text-xs font-light tracking-wide focus:border-stone-900 focus:ring-0 shadow-none transition-colors"
                        autoComplete="current-password"
                    />
                    <InputError
                        message={errors.current_password}
                        className="mt-1.5 text-xs text-rose-600 font-light"
                    />
                </div>

                {/* New Password */}
                <div>
                    <InputLabel
                        htmlFor="password"
                        value="New Secure Password"
                        className="text-[11px] uppercase tracking-widest font-medium text-stone-500"
                    />
                    <TextInput
                        id="password"
                        ref={passwordInput}
                        value={data.password}
                        onChange={(e) => setData("password", e.target.value)}
                        type="password"
                        className="mt-1.5 block w-full rounded-none border-stone-200 bg-stone-50/30 px-3 py-2 text-xs font-light tracking-wide focus:border-stone-900 focus:ring-0 shadow-none transition-colors"
                        autoComplete="new-password"
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
                        value="Confirm Strategic Password"
                        className="text-[11px] uppercase tracking-widest font-medium text-stone-500"
                    />
                    <TextInput
                        id="password_confirmation"
                        value={data.password_confirmation}
                        onChange={(e) =>
                            setData("password_confirmation", e.target.value)
                        }
                        type="password"
                        className="mt-1.5 block w-full rounded-none border-stone-200 bg-stone-50/30 px-3 py-2 text-xs font-light tracking-wide focus:border-stone-900 focus:ring-0 shadow-none transition-colors"
                        autoComplete="new-password"
                    />
                    <InputError
                        message={errors.password_confirmation}
                        className="mt-1.5 text-xs text-rose-600 font-light"
                    />
                </div>

                {/* Trigger Matrix Action Button */}
                <div className="flex items-center gap-4 pt-2">
                    <PrimaryButton
                        className="bg-stone-950 text-white text-[11px] tracking-[0.25em] font-medium uppercase px-6 py-2.5 rounded-none hover:bg-stone-800 active:bg-stone-900 transition-all shadow-none duration-300 disabled:opacity-50"
                        disabled={processing}
                    >
                        {processing
                            ? "Rewriting Secure Key..."
                            : "Update Password"}
                    </PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out duration-300"
                        enterFrom="opacity-0 translate-x-2"
                        leave="transition ease-in-out duration-300"
                        leaveTo="opacity-0"
                    >
                        <p className="text-xs font-medium tracking-wide text-emerald-700">
                            Security Credentials Renewed.
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
