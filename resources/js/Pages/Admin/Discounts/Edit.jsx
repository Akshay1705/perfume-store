import React from "react";
import { useForm, Link, usePage } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { ArrowLeft, Save } from "lucide-react";
import AppSelect from "@/Components/ui/AppSelect";

export default function Edit() {
    const { discount, users, brands, categories } = usePage().props;
    const { data, setData, put, processing, errors } = useForm({
        name: discount?.name || "",
        code: discount?.code || "",
        type: discount?.type || "percentage",
        value: discount?.value || "",
        target_type: discount?.target_type || "all",
        user_id: discount?.user_id || "",
        brand_id: discount?.brand_id || "",
        category_id: discount?.category_id || "",
        min_order_amount: discount?.min_order_amount || "",
        starts_at: discount?.starts_at?.replace(" ", "T") || "",
        ends_at: discount?.ends_at?.replace(" ", "T") || "",
        is_active: discount?.is_active ?? true,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("discounts.update", discount.id));
    };

    const inputClasses = (errorKey) => `
        w-full px-4 py-3 rounded-lg bg-slate-900/50 border transition-all duration-200
        text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-offset-0
        ${
            errorKey
                ? "border-red-500/50 focus:ring-red-500/50 focus:border-red-500"
                : "border-slate-700/50 focus:ring-red-500/30 focus:border-red-500/50"
        }
    `;

    const ErrorMsg = ({ field }) =>
        errors[field] ? (
            <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
                <span>⚠️</span> {errors[field]}
            </p>
        ) : null;

    return (
        <AdminLayout>
            {/* Header */}
            <div className="mb-8">
                <Link
                    href={route("discounts.index")}
                    className="inline-flex items-center gap-2 text-red-400 hover:text-red-300 text-sm font-medium mb-4 transition-colors"
                >
                    <ArrowLeft size={16} />
                    Back to Discounts
                </Link>
                <div className="flex items-center gap-3">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-red-400 to-rose-500 bg-clip-text text-transparent">
                        Edit Discount
                    </h1>
                    <span className="px-3 py-1 rounded-full bg-slate-700/50 text-slate-400 text-sm font-mono border border-slate-600/50">
                        ID #{discount.id}
                    </span>
                </div>
                <p className="text-slate-400 mt-2">
                    Update discount rules, types, and targeting rules
                </p>
            </div>

            {/* Form Container — wider, full available width */}
            <form
                onSubmit={handleSubmit}
                className="bg-slate-800/20 border border-slate-700/50 rounded-lg p-8 backdrop-blur-sm space-y-6"
            >
                {/* Row 1 — Name + Code */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-semibold text-slate-200 mb-2">
                            Discount Name *
                        </label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            placeholder="e.g., Summer Sale, New User Discount"
                            className={inputClasses(errors.name)}
                        />
                        <ErrorMsg field="name" />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-200 mb-2">
                            Discount Code{" "}
                            <span className="text-slate-500 font-normal">
                                (Optional)
                            </span>
                        </label>
                        <input
                            type="text"
                            value={data.code}
                            onChange={(e) => setData("code", e.target.value)}
                            placeholder="e.g., SUMMER2026, SAVE20"
                            className={`${inputClasses(errors.code)} font-mono uppercase text-sm`}
                        />
                        <ErrorMsg field="code" />
                    </div>
                </div>

                {/* Row 2 — Type + Value + Min Order */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <label className="block text-sm font-semibold text-slate-200 mb-2">
                            Discount Type *
                        </label>
                        <AppSelect
                            value={data.type}
                            onChange={(val) => setData("type", val)}
                            options={[
                                {
                                    value: "percentage",
                                    label: "Percentage (%)",
                                },
                                { value: "fixed", label: "Fixed Amount (₹)" },
                            ]}
                        />
                        <ErrorMsg field="type" />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-200 mb-2">
                            Value {data.type === "percentage" ? "(%)" : "(₹)"} *
                        </label>
                        <input
                            type="number"
                            step="0.01"
                            value={data.value}
                            onChange={(e) => setData("value", e.target.value)}
                            placeholder="0.00"
                            className={inputClasses(errors.value)}
                        />
                        <ErrorMsg field="value" />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-200 mb-2">
                            Min Order Amount (₹)
                        </label>
                        <input
                            type="number"
                            step="0.01"
                            value={data.min_order_amount}
                            onChange={(e) =>
                                setData("min_order_amount", e.target.value)
                            }
                            placeholder="0.00"
                            className={inputClasses(errors.min_order_amount)}
                        />
                        <ErrorMsg field="min_order_amount" />
                    </div>
                </div>

                {/* Row 3 — Target Type + Conditional Select */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-semibold text-slate-200 mb-2">
                            Apply To *
                        </label>
                        <AppSelect
                            value={data.target_type}
                            onChange={(val) => setData("target_type", val)}
                            className={inputClasses(errors.target_type)}
                            options={[
                                { value: "all", label: "All Products" },
                                { value: "user", label: "Specific User" },
                                { value: "brand", label: "Specific Brand" },
                                {
                                    value: "category",
                                    label: "Specific Category",
                                },
                            ]}
                        />
                        <ErrorMsg field="target_type" />
                    </div>

                    {/* Conditional target select — sits in col 2 */}
                    {data.target_type === "user" && (
                        <div>
                            <label className="block text-sm font-semibold text-slate-200 mb-2">
                                Select User
                            </label>
                            <AppSelect
                                value={String(data.user_id)}
                                onChange={(val) => setData("user_id", val)}
                                placeholder="Choose a user"
                                options={users.map((u) => ({
                                    value: String(u.id),
                                    label: `${u.name} (${u.email})`,
                                }))}
                            />
                            <ErrorMsg field="user_id" />
                        </div>
                    )}

                    {data.target_type === "brand" && (
                        <div>
                            <label className="block text-sm font-semibold text-slate-200 mb-2">
                                Select Brand
                            </label>
                            <AppSelect
                                value={String(data.brand_id)}
                                onChange={(val) => setData("brand_id", val)}
                                placeholder="Choose a brand"
                                options={brands.map((b) => ({
                                    value: String(b.id),
                                    label: b.name,
                                }))}
                            />
                            <ErrorMsg field="brand_id" />
                        </div>
                    )}

                    {data.target_type === "category" && (
                        <div>
                            <label className="block text-sm font-semibold text-slate-200 mb-2">
                                Select Category
                            </label>
                            <AppSelect
                                value={String(data.category_id)}
                                onChange={(val) => setData("category_id", val)}
                                placeholder="Choose a category"
                                options={categories.map((c) => ({
                                    value: String(c.id),
                                    label: c.name,
                                }))}
                            />
                            <ErrorMsg field="category_id" />
                        </div>
                    )}

                    {/* Empty placeholder when target is "all" to keep grid balanced */}
                    {data.target_type === "all" && <div />}
                </div>

                {/* Row 4 — Start Date + End Date */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-semibold text-slate-200 mb-2">
                            Start Date
                        </label>
                        <input
                            type="datetime-local"
                            value={data.starts_at}
                            onChange={(e) =>
                                setData("starts_at", e.target.value)
                            }
                            className={inputClasses(errors.starts_at)}
                            style={{ colorScheme: "dark" }}
                        />
                        <ErrorMsg field="starts_at" />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-200 mb-2">
                            End Date
                        </label>
                        <input
                            type="datetime-local"
                            value={data.ends_at}
                            onChange={(e) => setData("ends_at", e.target.value)}
                            className={inputClasses(errors.ends_at)}
                            style={{ colorScheme: "dark" }}
                        />
                        <ErrorMsg field="ends_at" />
                    </div>
                </div>

                {/* Row 5 — Active toggle + Info box side by side */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-center gap-3 bg-slate-900/30 border border-slate-700/30 rounded-lg p-4">
                        <input
                            type="checkbox"
                            id="is_active"
                            checked={data.is_active}
                            onChange={(e) =>
                                setData("is_active", e.target.checked)
                            }
                            className="w-4 h-4 rounded text-red-500 focus:ring-red-500/50 bg-slate-950 border-slate-700 accent-red-500 cursor-pointer"
                        />
                        <label
                            htmlFor="is_active"
                            className="text-sm font-semibold text-slate-200 cursor-pointer select-none"
                        >
                            Active Status
                        </label>
                    </div>

                    <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                        <p className="text-sm text-blue-300">
                            <span className="font-semibold">ℹ️ Note:</span>{" "}
                            Changing active settings or discount values
                            instantly applies updates across active user
                            checkouts using this ruleset.
                        </p>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-2">
                    <button
                        type="submit"
                        disabled={processing}
                        className="flex items-center justify-center gap-2 px-8 py-3 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold hover:shadow-lg hover:shadow-green-500/20 transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:shadow-none disabled:hover:translate-y-0"
                    >
                        <Save size={18} />
                        {processing ? "Saving Changes..." : "Save Changes"}
                    </button>

                    <Link
                        href={route("discounts.index")}
                        className="px-8 py-3 rounded-lg bg-slate-800/40 text-slate-300 font-semibold hover:bg-slate-800/60 border border-slate-700/50 transition-all duration-200"
                    >
                        Cancel
                    </Link>
                </div>
            </form>
        </AdminLayout>
    );
}
