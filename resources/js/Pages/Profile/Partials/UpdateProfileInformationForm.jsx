import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Transition } from "@headlessui/react";
import { Link, useForm, usePage } from "@inertiajs/react";

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = "",
}) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
        });

    const submit = (e) => {
        e.preventDefault();
        patch(route("profile.update"));
    };

    return (
        <section className={className}>
            <header className="mb-6">
                <p className="text-xs text-stone-400 font-light tracking-wide">
                    Update your account identify parameters and primary email
                    correspondence channels.
                </p>
            </header>

            <form onSubmit={submit} className="space-y-5">
                {/* Name Input */}
                <div>
                    <InputLabel
                        htmlFor="name"
                        value="Account Name"
                        className="text-[11px] uppercase tracking-widest font-medium text-stone-500"
                    />
                    <TextInput
                        id="name"
                        type="text"
                        className="mt-1.5 block w-full rounded-none border-stone-200 bg-stone-50/30 px-3 py-2 text-xs font-light tracking-wide focus:border-stone-900 focus:ring-0 shadow-none transition-colors"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        required
                        isFocused
                        autoComplete="name"
                    />
                    <InputError
                        className="mt-1.5 text-xs text-rose-600 font-light"
                        message={errors.name}
                    />
                </div>

                {/* Email Input */}
                <div>
                    <InputLabel
                        htmlFor="email"
                        value="Email Address"
                        className="text-[11px] uppercase tracking-widest font-medium text-stone-500"
                    />
                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1.5 block w-full rounded-none border-stone-200 bg-stone-50/30 px-3 py-2 text-xs font-light tracking-wide focus:border-stone-900 focus:ring-0 shadow-none transition-colors"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        required
                        autoComplete="username"
                    />
                    <InputError
                        className="mt-1.5 text-xs text-rose-600 font-light"
                        message={errors.email}
                    />
                </div>

                {/* Verification Check Area */}
                {mustVerifyEmail && user.email_verified_at === null && (
                    <div className="border border-amber-200/60 bg-amber-50/50 p-3 mt-4">
                        <p className="text-xs text-amber-900 font-light tracking-wide">
                            Your institutional email destination remains
                            unverified.{" "}
                            <Link
                                href={route("verification.send")}
                                method="post"
                                as="button"
                                className="text-stone-900 underline underline-offset-4 font-medium hover:text-stone-600 transition-colors focus:outline-none"
                            >
                                Dispatch verification token.
                            </Link>
                        </p>

                        {status === "verification-link-sent" && (
                            <div className="mt-2 text-xs font-medium text-emerald-800 tracking-wide">
                                A clean verification map link has been
                                transmitted to your inbox.
                            </div>
                        )}
                    </div>
                )}

                {/* Submission Actions */}
                <div className="flex items-center gap-4 pt-2">
                    <PrimaryButton
                        className="bg-stone-950 text-white text-[11px] tracking-[0.25em] font-medium uppercase px-6 py-2.5 rounded-none hover:bg-stone-800 active:bg-stone-900 transition-all shadow-none duration-300 disabled:opacity-50"
                        disabled={processing}
                    >
                        {processing ? "Saving changes..." : "Save Changes"}
                    </PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out duration-300"
                        enterFrom="opacity-0 translate-x-2"
                        leave="transition ease-in-out duration-300"
                        leaveTo="opacity-0"
                    >
                        <p className="text-xs font-medium tracking-wide text-emerald-700">
                            Profile Updated Successfully.
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
