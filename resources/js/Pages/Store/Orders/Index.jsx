import AccountLayout from "@/Layouts/AccountLayout";
import { Head, Link } from "@inertiajs/react";

export default function Index({ orders = [] }) {
    // Dynamic status flag indicator palette assignment mapping logic
    const getStatusStyles = (status) => {
        const base =
            "text-[9px] uppercase tracking-[0.15em] px-2 py-0.5 font-medium rounded-none inline-block ";
        switch (String(status).toLowerCase()) {
            case "delivered":
                return (
                    base +
                    "bg-emerald-50 text-emerald-800 border border-emerald-100"
                );
            case "processing":
            case "pending":
                return (
                    base + "bg-amber-50 text-amber-800 border border-amber-100"
                );
            case "cancelled":
                return base + "bg-rose-50 text-rose-800 border border-rose-100";
            default:
                return (
                    base + "bg-stone-50 text-stone-700 border border-stone-100"
                );
        }
    };

    return (
        <AccountLayout>
            <Head title="Order History" />

            <div className="text-stone-900 antialiased">
                {/* Section Header Text Alignment */}
                <div className="pb-5 border-b border-stone-200 mb-8">
                    <h1 className="text-lg font-serif tracking-[0.2em] text-stone-900 uppercase font-medium">
                        Order History
                    </h1>
                    <p className="text-[11px] text-stone-400 font-light mt-1 tracking-wide">
                        Review, monitor, and print receipts for all current and
                        historical curated manifests.
                    </p>
                </div>

                {orders.length === 0 ? (
                    /* Blank Slate Empty Account State Layout Box Container */
                    <div className="border border-dashed border-stone-200 p-16 text-center bg-stone-50/40 rounded-none">
                        <p className="text-xs text-stone-400 font-light tracking-wide">
                            No registered purchase logs associated with this
                            customer profile yet.
                        </p>
                    </div>
                ) : (
                    /* Continuous Document-style Order Timeline Structure */
                    <div className="space-y-4">
                        {orders.map((order) => (
                            <div
                                key={order.id}
                                className="border border-stone-200 p-6 rounded-none bg-white hover:border-stone-400 transition-colors duration-300 shadow-[0_2px_12px_rgba(0,0,0,0.01)]"
                            >
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    {/* Tracking ID and Creation Timestamp Data Area */}
                                    <div className="space-y-1.5">
                                        <div className="flex items-center gap-3 flex-wrap">
                                            <h3 className="text-xs font-serif tracking-widest text-stone-900 uppercase font-bold">
                                                Manifest #{order.id}
                                            </h3>

                                            <span
                                                className={getStatusStyles(
                                                    order.status,
                                                )}
                                            >
                                                {order.status || "In Queue"}
                                            </span>
                                        </div>

                                        <p className="text-[11px] text-stone-400 font-mono tracking-wide">
                                            Issued:{" "}
                                            {new Date(
                                                order.created_at,
                                            ).toLocaleDateString("en-US", {
                                                year: "numeric",
                                                month: "short",
                                                day: "numeric",
                                            })}
                                        </p>
                                    </div>

                                    {/* Financial Aggregate Summary Calculation & Deep Action Route Link */}
                                    <div className="flex sm:flex-col justify-between sm:justify-center items-baseline sm:items-end gap-1.5 pt-4 sm:pt-0 border-t sm:border-t-0 border-stone-100">
                                        <p className="text-sm font-mono font-semibold text-stone-950">
                                            ₹
                                            {Number(order.total).toLocaleString(
                                                "en-IN",
                                            )}
                                        </p>

                                        <Link
                                            href={route(
                                                "orders.show",
                                                order.id,
                                            )}
                                            className="text-[10px] uppercase tracking-[0.2em] font-medium text-stone-500 hover:text-stone-900 transition-colors underline underline-offset-4"
                                        >
                                            View Details
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </AccountLayout>
    );
}