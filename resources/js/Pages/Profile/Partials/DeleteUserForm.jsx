import DangerButton from "@/Components/DangerButton";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import { useRef, useState } from "react";

export default function DeleteUserForm({ className = "" }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
        clearErrors,
    } = useForm({
        password: "",
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser = (e) => {
        e.preventDefault();

        destroy(route("profile.destroy"), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);
        clearErrors();
        reset();
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <p className="text-xs text-stone-500 font-light tracking-wide leading-relaxed">
                    Executing this configuration command runs a destructive
                    permanent scrub block sequence. All history, transaction
                    footprints, and custom vaults will be wiped forever.
                </p>
            </header>

            <DangerButton
                onClick={confirmUserDeletion}
                className="bg-rose-950 text-rose-100 hover:bg-rose-900 border border-rose-800 text-[10px] tracking-[0.2em] uppercase font-medium px-5 py-2.5 rounded-none transition-colors shadow-none"
            >
                Decommission Vault Profile
            </DangerButton>

            {/* Modal Overlay explicitly restyled inside custom class configurations */}
            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <form
                    onSubmit={deleteUser}
                    className="p-8 bg-white rounded-none border border-stone-200"
                >
                    <h2 className="text-sm font-serif tracking-widest text-stone-900 uppercase font-medium">
                        Confirm Profile Decommissioning
                    </h2>

                    <p className="mt-2 text-xs text-stone-400 font-light tracking-wide leading-relaxed">
                        This action cannot be undone. Please authenticate your
                        identity by providing your password token to execute the
                        purge loop block.
                    </p>

                    <div className="mt-6">
                        <InputLabel
                            htmlFor="password"
                            value="Password"
                            className="sr-only"
                        />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            className="block w-full rounded-none border-stone-200 bg-stone-50/50 px-3 py-2 text-xs font-light tracking-wide focus:border-stone-900 focus:ring-0 shadow-none transition-colors"
                            isFocused
                            placeholder="Aura Security Password"
                        />

                        <InputError
                            message={errors.password}
                            className="mt-2 text-xs text-rose-600 font-light"
                        />
                    </div>

                    <div className="mt-6 flex justify-end gap-3">
                        <SecondaryButton
                            onClick={closeModal}
                            className="border border-stone-200 bg-white text-stone-600 text-[10px] tracking-widest uppercase rounded-none px-4 py-2 hover:bg-stone-50 hover:text-stone-900 font-medium transition-colors"
                        >
                            Cancel
                        </SecondaryButton>

                        <DangerButton
                            className="bg-rose-950 text-white text-[10px] tracking-widest uppercase rounded-none px-4 py-2 hover:bg-rose-900 font-medium transition-colors"
                            disabled={processing}
                        >
                            Confirm Purge
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
