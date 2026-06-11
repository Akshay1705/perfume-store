import StoreLayout from "@/Layouts/StoreLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { useState } from "react";

export default function Index({ cart, addresses = [] }) {
    // Safely default state selection hook mapping sequence
    const [selectedAddress, setSelectedAddress] = useState(
        addresses.find((addr) => addr.is_default)?.id ||
            addresses[0]?.id ||
            null,
    );

    const { post, processing } = useForm();
    const form = useForm({
        address_id: selectedAddress,
    });
    const placeOrder = () => {
        form.setData("address_id", selectedAddress);

        form.post(route("checkout.place-order"));
    };

    const items = cart?.items || [];

    return (
        <StoreLayout>
            <Head title="Checkout" />

            <div className="bg-white min-h-screen py-16 px-4 sm:px-6 lg:px-8 text-stone-900 antialiased selection:bg-stone-900 selection:text-stone-50">
                <div className="mx-auto max-w-6xl">
                    {/* Minimalist Editorial Page Title Block */}
                    <div className="pb-6 border-b border-stone-200 mb-12">
                        <h1 className="text-xl font-serif tracking-[0.2em] text-stone-900 uppercase font-medium">
                            Secure Checkout
                        </h1>
                        <p className="text-xs text-stone-400 font-light mt-1 tracking-wide">
                            Finalize your transaction parameters and map
                            destination delivery routing vectors.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-12 items-start">
                        {/* LEFT ELEMENT: Delivery Configuration Engine */}
                        <div className="lg:col-span-2 space-y-8">
                            <div className="border border-stone-200 p-6 sm:p-8 rounded-none bg-white shadow-[0_4px_20px_-4px_rgba(0,0,0,0.01)]">
                                <div className="flex justify-between items-baseline mb-6 pb-4 border-b border-stone-100">
                                    <h2 className="text-xs font-serif tracking-[0.2em] uppercase font-bold text-stone-900">
                                        Shipping Destination
                                    </h2>
                                    <Link
                                        href={route("addresses.create")}
                                        className="text-[10px] uppercase tracking-widest text-stone-400 hover:text-stone-900 transition-colors underline underline-offset-4 font-medium"
                                    >
                                        + Add New
                                    </Link>
                                </div>

                                {addresses.length === 0 ? (
                                    <div className="border border-dashed border-stone-200 p-8 text-center bg-stone-50/50">
                                        <p className="text-xs text-stone-400 font-light tracking-wide mb-4">
                                            No shipping destination coordinates
                                            found inside your profile
                                            parameters.
                                        </p>
                                        <Link
                                            href={route("addresses.create")}
                                            className="inline-block bg-stone-950 text-white text-[10px] tracking-[0.25em] font-medium uppercase px-4 py-2.5 rounded-none"
                                        >
                                            Configure Address
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {addresses.map((address) => {
                                            const isCurrentSelection =
                                                selectedAddress === address.id;
                                            return (
                                                <label
                                                    key={address.id}
                                                    className={`block border p-5 rounded-none cursor-pointer transition-all duration-300 relative ${
                                                        isCurrentSelection
                                                            ? "border-stone-900 bg-stone-50/40 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.02)]"
                                                            : "border-stone-200 hover:border-stone-400 bg-white"
                                                    }`}
                                                >
                                                    <div className="flex items-start gap-4">
                                                        <div className="flex items-center h-4 pt-0.5">
                                                            <input
                                                                type="radio"
                                                                name="address_selection"
                                                                value={
                                                                    address.id
                                                                }
                                                                checked={
                                                                    isCurrentSelection
                                                                }
                                                                onChange={() =>
                                                                    setSelectedAddress(
                                                                        address.id,
                                                                    )
                                                                }
                                                                className="h-3.5 w-3.5 rounded-full border-stone-300 text-stone-950 focus:ring-0 focus:ring-offset-0 transition-colors cursor-pointer"
                                                            />
                                                        </div>

                                                        <div className="flex-1">
                                                            <div className="flex items-center gap-3">
                                                                <span className="text-xs font-serif tracking-widest text-stone-900 uppercase font-semibold">
                                                                    {
                                                                        address.full_name
                                                                    }
                                                                </span>
                                                                {address.is_default && (
                                                                    <span className="text-[8px] uppercase tracking-widest bg-stone-200 text-stone-700 px-1.5 py-0.5 font-medium">
                                                                        Primary
                                                                        Default
                                                                    </span>
                                                                )}
                                                            </div>

                                                            <p className="text-[11px] text-stone-400 font-mono mt-0.5 tracking-wide">
                                                                {address.phone}
                                                            </p>

                                                            <div className="text-xs text-stone-700 font-light tracking-wide space-y-0.5 mt-3 pt-2 border-t border-stone-100/70 leading-relaxed">
                                                                <p className="text-stone-900 font-normal">
                                                                    {
                                                                        address.address_line_1
                                                                    }
                                                                </p>
                                                                {address.address_line_2 && (
                                                                    <p>
                                                                        {
                                                                            address.address_line_2
                                                                        }
                                                                    </p>
                                                                )}
                                                                <p>
                                                                    {
                                                                        address.city
                                                                    }
                                                                    ,{" "}
                                                                    {
                                                                        address.state
                                                                    }
                                                                </p>
                                                                <p className="text-stone-400 font-mono text-[11px] mt-0.5">
                                                                    {
                                                                        address.postal_code
                                                                    }{" "}
                                                                    —{" "}
                                                                    {
                                                                        address.country
                                                                    }
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </label>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* RIGHT ELEMENT: Summary Matrix Block Container */}
                        <div className="border border-stone-200 p-6 bg-stone-50/40 rounded-none h-fit space-y-6 shadow-[0_4px_25px_-5px_rgba(0,0,0,0.01)]">
                            <div>
                                <h2 className="text-xs font-serif tracking-[0.2em] uppercase font-bold text-stone-900">
                                    Order Summary
                                </h2>
                                <p className="text-[9px] text-stone-400 font-light tracking-widest mt-0.5 uppercase">
                                    Manifest Items Verification
                                </p>
                            </div>

                            {/* Embedded Flat Micro-Items Manifest Grid Loop */}
                            <div className="space-y-4 pt-4 border-t border-stone-200/80 max-h-60 overflow-y-auto scrollbar-none pr-1">
                                {items.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex justify-between gap-4 items-start text-xs tracking-wide"
                                    >
                                        <div className="space-y-0.5">
                                            <h4 className="font-serif uppercase font-semibold text-stone-900 tracking-wider text-[11px] leading-tight">
                                                {item.variant?.product?.name}
                                            </h4>
                                            <p className="text-[10px] text-stone-400 font-light font-mono">
                                                Qty {item.quantity} ×{" "}
                                                {item.variant?.volume ||
                                                    item.variant?.name ||
                                                    "Standard"}
                                            </p>
                                        </div>

                                        <span className="font-mono text-stone-950 font-medium whitespace-nowrap text-[11px]">
                                            ₹
                                            {Number(
                                                item.unit_price * item.quantity,
                                            ).toLocaleString("en-IN")}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            {/* Ledger Accumulations Grid Layout Blocks */}
                            <div className="space-y-3 pt-4 border-t border-stone-200 text-xs tracking-wide">
                                <div className="flex justify-between text-stone-600 font-light">
                                    <span>Subtotal</span>
                                    <span className="font-mono">
                                        ₹
                                        {Number(cart.subtotal).toLocaleString(
                                            "en-IN",
                                        )}
                                    </span>
                                    {/* Subtotal is formatted with regional commas via local strings mapping */}
                                </div>

                                {Number(cart.discount_amount) > 0 && (
                                    <div className="flex justify-between text-emerald-700 font-medium">
                                        <span>
                                            Discount
                                            {cart.discount?.code && (
                                                <span className="ml-2 text-[9px] uppercase tracking-widest bg-emerald-50 px-1.5 py-0.5">
                                                    {cart.discount.code}
                                                </span>
                                            )}
                                        </span>

                                        <span className="font-mono">
                                            -₹
                                            {Number(
                                                cart.discount_amount,
                                            ).toLocaleString("en-IN")}
                                        </span>
                                    </div>
                                )}

                                {Number(cart.discount_amount) > 0 && (
                                    <div className="text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-100 px-3 py-2">
                                        You saved ₹
                                        {Number(
                                            cart.discount_amount,
                                        ).toLocaleString("en-IN")}{" "}
                                        with this order.
                                    </div>
                                )}

                                <div className="flex justify-between text-stone-600 font-light">
                                    <span>Standard Freight Delivery</span>
                                    <span className="text-[9px] uppercase tracking-widest text-emerald-700 font-medium bg-emerald-50 px-1.5 py-0.5">
                                        Complimentary
                                    </span>
                                </div>

                                <div className="flex justify-between text-stone-900 font-medium pt-3 border-t border-stone-200 text-sm">
                                    <span className="font-serif uppercase tracking-wider">
                                        Total
                                    </span>
                                    <span className="font-mono">
                                        ₹
                                        {Number(cart.total).toLocaleString(
                                            "en-IN",
                                        )}
                                    </span>
                                </div>
                            </div>

                            {/* Primary Action Button Loop Terminal */}
                            <button
                                type="button"
                                onClick={placeOrder}
                                disabled={!selectedAddress || form.processing}
                                className="mt-4 w-full bg-stone-950 text-white text-[11px] tracking-[0.25em] font-medium uppercase py-4 rounded-none hover:bg-stone-800 active:bg-stone-900 transition-colors shadow-none text-center duration-300 disabled:opacity-40 disabled:pointer-events-none"
                            >
                                Place Order
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </StoreLayout>
    );
}