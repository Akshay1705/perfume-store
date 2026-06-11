import StoreLayout from "@/Layouts/StoreLayout";
import { Head, router, Link, useForm} from "@inertiajs/react";
import { useState } from "react";

export default function Index({ cart }) {
    // Structural state calculations safety check
    const items = cart?.items || [];
    const hasItems = items.length > 0;

    const [couponCode, setCouponCode] = useState("");

    const form = useForm({
        code: "",
    });

    const applyCoupon = () => {
        form.post(route("cart.discount"));
    };

    const updateQuantity = (id, newQuantity) => {
        if (newQuantity < 1) return;
        router.patch(
            route("cart.items.update", id),
            {
                quantity: newQuantity,
            },
            { preserveScroll: true },
        );
    };

    const removeItem = (id) => {
        router.delete(route("cart.items.destroy", id), {
            preserveScroll: true,
        });
    };

    console.log(items.variant);
    return (
        <StoreLayout>
            <Head title="Shopping Bag" />

            <div className="bg-white min-h-screen py-16 px-4 sm:px-6 lg:px-8 text-stone-900 antialiased selection:bg-stone-900 selection:text-stone-50">
                {items.length === 0 ? (
                    <div className="py-32 text-center">
                        <h2 className="font-serif text-4xl text-stone-900">
                            Your Bag Is Empty
                        </h2>

                        <p className="mt-4 text-stone-500">
                            Discover our collection and find your next signature
                            scent.
                        </p>

                        <Link
                            href={route("store.products")}
                            className="inline-block
                                mt-10
                                bg-stone-950
                                text-white
                                px-8
                                py-4
                                uppercase
                                tracking-widest
                                text-sm"
                        >
                            Continue Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="mx-auto max-w-6xl">
                        {/* Minimalist Editorial Title Section */}
                        <div className="pb-6 border-b border-stone-200 mb-12">
                            <h1 className="text-xl font-serif tracking-[0.2em] text-stone-900 uppercase font-medium">
                                Shopping Bag
                            </h1>
                            <p className="text-xs text-stone-400 font-light mt-1 tracking-wide">
                                Review your selected items before proceeding to
                                secure terminal checkout.
                            </p>
                        </div>

                        {!hasItems ? (
                            /* Empty Bag Screen State Container */
                            <div className="border border-dashed border-stone-200 p-20 text-center bg-stone-50/40 rounded-none my-6">
                                <p className="text-xs text-stone-400 font-light tracking-widest uppercase mb-6">
                                    Your shipping bag is empty
                                </p>
                                <Link
                                    href={route("shop")} // Ensure your storefront path route identifier matches this
                                    className="inline-block bg-stone-950 text-white text-[10px] tracking-[0.25em] font-medium uppercase px-6 py-3 rounded-none hover:bg-stone-800 transition-colors"
                                >
                                    Continue Exploring
                                </Link>
                            </div>
                        ) : (
                            /* Core Split Master Screen Assembly Layout Grid */
                            <div className="grid lg:grid-cols-3 gap-12 items-start">
                                {/* Left Side: Cart Items Layout Pipeline */}
                                <div className="lg:col-span-2 space-y-6">
                                    {items.map((item) => (
                                        <div
                                            key={item.id}
                                            className="border border-stone-200/80 p-6 rounded-none bg-white flex flex-col sm:flex-row gap-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.01)]"
                                        >
                                            {/* Product Picture Framing Canvas */}
                                            <div className="w-24 h-28 sm:w-28 sm:h-32 bg-stone-50 shrink-0 border border-stone-100 overflow-hidden rounded-none">
                                                <img
                                                    src={
                                                        item.variant
                                                            ?.primary_image
                                                            ?.url ||
                                                        item.variant
                                                            ?.primaryImage
                                                            ?.url ||
                                                        "/images/placeholder.jpg"
                                                    }
                                                    alt={
                                                        item.variant?.product
                                                            ?.name || "Product"
                                                    }
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>

                                            {/* Product Content Specifications Matrix */}
                                            <div className="flex-1 flex flex-col justify-between py-0.5">
                                                <div className="flex justify-between items-start gap-4">
                                                    <div>
                                                        <h3 className="text-xs font-serif tracking-widest text-stone-900 uppercase font-semibold leading-relaxed">
                                                            {
                                                                item.variant
                                                                    ?.product
                                                                    ?.name
                                                            }
                                                        </h3>
                                                        <p className="text-[11px] text-stone-400 font-light tracking-wide mt-1 font-mono">
                                                            Volume:{" "}
                                                            {item.variant
                                                                ?.volume ||
                                                                item.variant
                                                                    ?.name ||
                                                                "N/A"}
                                                        </p>
                                                    </div>

                                                    <p className="text-xs font-serif tracking-wider text-stone-950 font-medium whitespace-nowrap">
                                                        ₹
                                                        {Number(
                                                            item.unit_price,
                                                        ).toLocaleString(
                                                            "en-IN",
                                                        )}
                                                    </p>
                                                </div>

                                                {/* Action Control Infrastructure strip */}
                                                <div className="flex items-center justify-between gap-4 mt-6 pt-4 border-t border-stone-100">
                                                    {/* Core Increment/Decrement Module */}
                                                    <div className="flex items-center border border-stone-200 bg-stone-50/50 rounded-none h-8 select-none">
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                updateQuantity(
                                                                    item.id,
                                                                    item.quantity -
                                                                        1,
                                                                )
                                                            }
                                                            disabled={
                                                                item.quantity <=
                                                                1
                                                            }
                                                            className="px-3 h-full text-xs text-stone-500 hover:text-stone-900 font-light hover:bg-stone-100/80 transition-colors disabled:opacity-30 disabled:pointer-events-none"
                                                        >
                                                            —
                                                        </button>

                                                        <span className="w-8 text-center text-[11px] font-mono font-medium text-stone-900">
                                                            {item.quantity}
                                                        </span>

                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                updateQuantity(
                                                                    item.id,
                                                                    item.quantity +
                                                                        1,
                                                                )
                                                            }
                                                            className="px-3 h-full text-xs text-stone-500 hover:text-stone-900 font-light hover:bg-stone-100/80 transition-colors"
                                                        >
                                                            +
                                                        </button>
                                                    </div>

                                                    {/* Textual Destructive Action Trigger */}
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            removeItem(item.id)
                                                        }
                                                        className="text-[10px] uppercase tracking-[0.2em] font-medium text-stone-400 hover:text-rose-700 transition-colors underline underline-offset-4 bg-transparent border-none p-0 cursor-pointer"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Right Side: Total Pricing Matrix Terminal Frame */}
                                <div className="border border-stone-200 p-6 bg-stone-50/40 rounded-none h-fit space-y-6 shadow-[0_4px_25px_-5px_rgba(0,0,0,0.01)]">
                                    <div>
                                        <h2 className="text-xs font-serif tracking-[0.2em] uppercase font-bold text-stone-900">
                                            Order Summary
                                        </h2>
                                        <p className="text-[9px] text-stone-400 font-light tracking-widest mt-0.5 uppercase">
                                            Financial Breakdown Overview
                                        </p>
                                    </div>

                                    <div className="mb-6">
                                        <label className="block text-[10px] uppercase tracking-[0.2em] text-stone-500 mb-2">
                                            Discount Code
                                        </label>

                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                value={form.data.code}
                                                onChange={(e) =>
                                                    form.setData(
                                                        "code",
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="WELCOME10"
                                                className="flex-1 border border-stone-200 px-3 py-3 text-sm focus:outline-none focus:border-stone-800"
                                            />

                                            <button
                                                type="button"
                                                disabled={form.processing}
                                                onClick={applyCoupon}
                                                className="px-5 bg-black text-white text-xs uppercase tracking-widest"
                                            >
                                                Apply
                                            </button>
                                        </div>
                                    </div>

                                    {cart.discount && (
                                        <div className="mb-4 border border-green-200 bg-green-50 p-3">
                                            <div className="flex items-center justify-between">
                                                <span className="text-xs uppercase tracking-wider">
                                                    {cart.discount.code}
                                                </span>

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        post(
                                                            route(
                                                                "cart.discount.remove",
                                                            ),
                                                        )
                                                    }
                                                    className="text-xs text-red-600 uppercase"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                    <div className="space-y-3 pt-4 border-t border-stone-200 text-xs tracking-wide">
                                        <div className="flex justify-between text-stone-600 font-light">
                                            <span>Subtotal</span>
                                            <span className="font-mono">
                                                ₹
                                                {Number(
                                                    cart.subtotal,
                                                ).toLocaleString("en-IN")}
                                            </span>
                                        </div>

                                        {Number(cart.discount_amount) > 0 && (
                                            <div className="flex justify-between py-2">
                                                <span>Discount</span>

                                                <span className="text-green-700">
                                                    -₹
                                                    {Number(
                                                        cart.discount_amount,
                                                    ).toLocaleString("en-IN")}
                                                </span>
                                            </div>
                                        )}

                                        <div className="flex justify-between text-stone-600 font-light">
                                            <span>Estimated Delivery</span>
                                            <span className="text-[10px] uppercase tracking-widest text-stone-400 font-medium">
                                                Calculated next
                                            </span>
                                        </div>

                                        <div className="flex justify-between text-stone-900 font-medium pt-3 border-t border-stone-200 text-sm">
                                            <span className="font-serif uppercase tracking-wider">
                                                Total
                                            </span>
                                            <span className="font-mono">
                                                ₹
                                                {Number(
                                                    cart.total,
                                                ).toLocaleString("en-IN")}
                                            </span>
                                        </div>
                                    </div>

                                    <Link
                                        href={route("checkout.index")}
                                        as="button"
                                        className="mt-4 w-full bg-stone-950 text-white text-[11px] tracking-[0.25em] font-medium uppercase py-4 rounded-none hover:bg-stone-800 active:bg-stone-900 transition-colors shadow-none text-center duration-300 block select-none focus:outline-none"
                                    >
                                        Proceed to Checkout
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </StoreLayout>
    );
}
