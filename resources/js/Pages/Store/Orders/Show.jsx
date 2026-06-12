"use strict";

import AccountLayout from "@/Layouts/AccountLayout";
import { Head, Link } from "@inertiajs/react";

export default function Show({ order }) {
    // Dynamic status text styling configuration matrix
    const getStatusStyles = (status) => {
        const base =
            "text-[10px] uppercase tracking-widest px-2.5 py-1 font-medium rounded-none inline-block ";
        switch (String(status).toLowerCase()) {
            case "delivered":
                return (
                    base +
                    "bg-emerald-50 text-emerald-800 border border-emerald-200"
                );
            case "processing":
            case "pending":
                return (
                    base + "bg-amber-50 text-amber-800 border border-amber-200"
                );
            case "cancelled":
                return base + "bg-rose-50 text-rose-800 border border-rose-200";
            default:
                return (
                    base + "bg-stone-50 text-stone-800 border border-stone-200"
                );
        }
    };

    return (
        <AccountLayout>
            <Head title={`Order Manifest #${order.id}`} />

            <div className="space-y-8 text-stone-900 antialiased selection:bg-stone-900 selection:text-stone-50">
                {/* Header Subsystem Navigation Strip */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-5 border-b border-stone-200">
                    <div>
                        <h1 className="text-lg font-serif tracking-[0.2em] text-stone-900 uppercase font-medium">
                            Order #{order.id}
                        </h1>
                        <p className="text-[11px] text-stone-400 font-light mt-1 tracking-wide">
                            Authorized invoice transaction state parameters
                            dashboard.
                        </p>
                    </div>

                    <Link
                        href={route("orders.index")}
                        className="text-[10px] uppercase tracking-widest text-stone-400 hover:text-stone-900 transition-colors underline underline-offset-4 font-medium"
                    >
                        Back to Orders
                    </Link>
                </div>

                {/* Grid Split Content Matrix (Shipping Context vs Financial Calculation Summary) */}
                <div className="grid md:grid-cols-2 gap-6">
                    {/* Block A: Physical Shipment Destination Address Map */}
                    <div className="border border-stone-200/80 p-6 rounded-none bg-white">
                        <h2 className="text-xs font-serif tracking-[0.15em] uppercase font-bold text-stone-900 mb-4 pb-2 border-b border-stone-100">
                            Shipping Coordinates
                        </h2>

                        <div className="space-y-4">
                            <div>
                                <span className="text-xs font-serif tracking-widest text-stone-900 uppercase font-semibold">
                                    {order.address?.full_name ||
                                        "Recipient Dynamic Fallback"}
                                </span>
                                <p className="text-[11px] text-stone-400 font-mono mt-0.5 tracking-wide">
                                    {order.address?.phone ||
                                        "No Contact Assigned"}
                                </p>
                            </div>

                            <div className="text-xs text-stone-700 font-light tracking-wide space-y-1 pt-3 border-t border-stone-100 leading-relaxed">
                                <p className="text-stone-900 font-normal">
                                    {order.address?.address_line_1}
                                </p>
                                {order.address?.address_line_2 && (
                                    <p className="text-stone-800">
                                        {order.address.address_line_2}
                                    </p>
                                )}
                                <p className="text-stone-800">
                                    {order.address?.city},{" "}
                                    {order.address?.state}
                                </p>
                                <p className="text-stone-400 font-mono text-[11px] pt-1">
                                    {order.address?.postal_code} —{" "}
                                    {order.address?.country || "India"}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Block B: Manifest Current Logistics State Framework */}
                    <div className="border border-stone-200/80 p-6 rounded-none bg-stone-50/30 flex flex-col justify-between">
                        <div>
                            <h2 className="text-xs font-serif tracking-[0.15em] uppercase font-bold text-stone-900 mb-4 pb-2 border-b border-stone-100">
                                Manifest Status
                            </h2>
                            <p className="text-[11px] text-stone-400 font-light tracking-wide leading-relaxed mb-4">
                                Current monitoring milestone logged by your
                                parcel dispatch service router.
                            </p>
                        </div>

                        <div className="pt-2">
                            <span className={getStatusStyles(order.status)}>
                                {order.status || "In Queue"}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Block C: Itemized Content Purchased Items Grid Ledger */}
                <div className="border border-stone-200/80 p-6 rounded-none bg-white">
                    <h2 className="text-xs font-serif tracking-[0.15em] uppercase font-bold text-stone-900 mb-6 pb-2 border-b border-stone-100">
                        Purchased Manifest Items ({order.items?.length || 0})
                    </h2>

                    <div className="divide-y divide-stone-100">
                        {order.items?.map((item) => (
                            <div
                                key={item.id}
                                className="flex gap-5 py-5 first:pt-0 last:pb-0 items-center"
                            >
                                <div className="w-16 h-20 bg-stone-50 border border-stone-100 overflow-hidden shrink-0">
                                    <img
                                        src={
                                            item.variant?.primary_image?.url ||
                                            "/images/placeholder.jpg"
                                        }
                                        alt=""
                                        className="w-full h-full object-cover grayscale-[10%]"
                                    />
                                </div>

                                <div className="flex-1 min-w-0">
                                    <h3 className="text-xs font-serif tracking-widest text-stone-900 uppercase font-semibold truncate">
                                        {item.variant?.product?.name ||
                                            "Premium Fragrance Compound"}
                                    </h3>
                                    <p className="text-[11px] text-stone-400 font-light mt-0.5 tracking-wide font-mono">
                                        Volume Matrix:{" "}
                                        {item.variant?.volume ||
                                            item.variant?.name ||
                                            "Standard Size"}
                                    </p>
                                    <p className="text-[11px] text-stone-500 font-light tracking-wide mt-1">
                                        Quantity Ordered:{" "}
                                        <span className="font-mono text-stone-900 font-normal">
                                            {item.quantity}
                                        </span>
                                    </p>
                                </div>

                                <div className="text-right pl-4">
                                    <span className="text-xs font-mono font-medium text-stone-950">
                                        ₹
                                        {Number(item.unit_price).toLocaleString(
                                            "en-IN",
                                        )}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Block D: Ledger Financial Summary Segment */}
                <div className="border border-stone-200/80 p-6 rounded-none bg-stone-50/40 ml-auto max-w-md">
                    <h2 className="text-xs font-serif tracking-[0.15em] uppercase font-bold text-stone-900 mb-4 pb-2 border-b border-stone-200/80">
                        Ledger Accumulations Summary
                    </h2>

                    <div className="space-y-2.5 text-xs tracking-wide">
                        <div className="flex justify-between text-stone-600 font-light">
                            <span>Basket Subtotal</span>
                            <span className="font-mono text-stone-900">
                                ₹
                                {Number(order.subtotal || 0).toLocaleString(
                                    "en-IN",
                                )}
                            </span>
                        </div>

                        {Number(order.discount_amount) > 0 && (
                            <div className="flex justify-between py-2">
                                <span>Discount</span>

                                <span className="text-green-700">
                                    -₹
                                    {Number(
                                        order.discount_amount,
                                    ).toLocaleString("en-IN")}
                                </span>
                            </div>
                        )}

                        <div className="flex justify-between text-stone-600 font-light">
                            <span>Courier Service Freight</span>
                            <span className="text-[10px] uppercase tracking-widest text-emerald-700 font-medium">
                                Complimentary
                            </span>
                        </div>

                        <div className="flex justify-between text-stone-900 font-medium pt-3 border-t border-stone-200 text-sm">
                            <span className="font-serif uppercase tracking-wider">
                                Aggregate Total
                            </span>
                            <span className="font-mono">
                                ₹
                                {Number(order.total || 0).toLocaleString(
                                    "en-IN",
                                )}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </AccountLayout>
    );
}
