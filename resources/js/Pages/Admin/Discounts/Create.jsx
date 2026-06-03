import React from "react";
import { useForm, Link, usePage } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import {
    ArrowLeft,
    Plus,
    Calendar,
    Percent,
    DollarSign,
    Tag,
} from "lucide-react";

export default function Create() {
    const { users, brands, categories } = usePage().props;
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        code: "",
        type: "percentage",
        value: "",
        target_type: "all",
        user_id: "",
        brand_id: "",
        category_id: "",
        min_order_amount: "",
        starts_at: "",
        ends_at: "",
        is_active: true,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("discounts.store"));
    };

    return (
        <AdminLayout>
            {/* Header / Navigation */}
            <div className="mb-8">
                <Link
                    href={route("discounts.index")}
                    className="inline-flex items-center gap-2 text-red-400 hover:text-red-300 text-sm font-medium mb-4 transition-colors group"
                >
                    <ArrowLeft
                        size={16}
                        className="group-hover:-translate-x-0.5 transition-transform"
                    />
                    Back to Discounts
                </Link>

                <div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-red-400 to-rose-500 bg-clip-text text-transparent mb-2">
                        Create Discount
                    </h1>
                    <p className="text-slate-400">
                        Configure promotional parameters, expiration rules, and
                        scope metrics
                    </p>
                </div>
            </div>

            {/* Form Container */}
            <div className="max-w-2xl">
                <form
                    onSubmit={handleSubmit}
                    className="bg-slate-800/20 border border-slate-700/50 rounded-lg p-8 backdrop-blur-sm space-y-6"
                >
                    {/* Discount Name */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-200 mb-2">
                            Discount Name *
                        </label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            className={`w-full px-4 py-3 rounded-lg bg-slate-900/50 border transition-all duration-200 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-offset-0 ${
                                errors.name
                                    ? "border-red-500/50 focus:ring-red-500/50 focus:border-red-500"
                                    : "border-slate-700/50 focus:ring-red-500/50 focus:border-red-500"
                            }`}
                            placeholder="e.g., Summer Campaign, New User Promotion"
                        />
                        {errors.name && (
                            <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
                                <span>⚠️</span> {errors.name}
                            </p>
                        )}
                    </div>

                    {/* Discount Code */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-200 mb-2">
                            Discount Code{" "}
                            <span className="text-slate-500 font-normal">
                                (Optional — blank for auto-applied)
                            </span>
                        </label>
                        <input
                            type="text"
                            value={data.code}
                            onChange={(e) => setData("code", e.target.value)}
                            className={`w-full px-4 py-3 rounded-lg bg-slate-900/50 border transition-all duration-200 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-offset-0 font-mono tracking-wider text-sm ${
                                errors.code
                                    ? "border-red-500/50 focus:ring-red-500/50 focus:border-red-500"
                                    : "border-slate-700/50 focus:ring-red-500/50 focus:border-red-500"
                            }`}
                            placeholder="e.g., SUMMER2026, CRIMSON10"
                        />
                        {errors.code && (
                            <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
                                <span>⚠️</span> {errors.code}
                            </p>
                        )}
                    </div>

                    {/* Value Matrix Configuration */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Type Selection */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-200 mb-2">
                                Discount Type *
                            </label>
                            <select
                                value={data.type}
                                onChange={(e) =>
                                    setData("type", e.target.value)
                                }
                                className="w-full px-4 py-3 rounded-lg bg-slate-900 border border-slate-700/50 text-slate-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500"
                            >
                                <option value="percentage">
                                    Percentage (%)
                                </option>
                                <option value="fixed">Fixed Amount (₹)</option>
                            </select>
                            {errors.type && (
                                <p className="text-red-400 text-sm mt-2">
                                    {errors.type}
                                </p>
                            )}
                        </div>

                        {/* Value Field */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-200 mb-2">
                                Value Matrix{" "}
                                {data.type === "percentage" ? "(%)" : "(₹)"} *
                            </label>
                            <input
                                type="number"
                                step="0.01"
                                value={data.value}
                                onChange={(e) =>
                                    setData("value", e.target.value)
                                }
                                className={`w-full px-4 py-3 rounded-lg bg-slate-900/50 border transition-all duration-200 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-offset-0 ${
                                    errors.value
                                        ? "border-red-500/50 focus:ring-red-500/50 focus:border-red-500"
                                        : "border-slate-700/50 focus:ring-red-500/50 focus:border-red-500"
                                }`}
                                placeholder="0.00"
                            />
                            {errors.value && (
                                <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
                                    <span>⚠️</span> {errors.value}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Target Context Allocation */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-200 mb-2">
                            Target Allocation Scope *
                        </label>
                        <select
                            value={data.target_type}
                            onChange={(e) =>
                                setData("target_type", e.target.value)
                            }
                            className="w-full px-4 py-3 rounded-lg bg-slate-900 border border-slate-700/50 text-slate-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500"
                        >
                            <option value="all">
                                Entire Catalog (All Products)
                            </option>
                            <option value="user">Specific Assigned User</option>
                            <option value="brand">Target Specific Brand</option>
                            <option value="category">
                                Target Specific Category
                            </option>
                        </select>
                        {errors.target_type && (
                            <p className="text-red-400 text-sm mt-2">
                                {errors.target_type}
                            </p>
                        )}
                    </div>

                    {/* Conditional Context Relational Tables */}
                    {data.target_type === "user" && (
                        <div className="bg-slate-900/40 p-4 border border-slate-700/30 rounded-lg animate-fadeIn">
                            <label className="block text-xs uppercase tracking-wider font-semibold text-slate-400 mb-2">
                                Assign Target User
                            </label>
                            <select
                                value={data.user_id}
                                onChange={(e) =>
                                    setData("user_id", e.target.value)
                                }
                                className="w-full px-4 py-2.5 rounded-lg bg-slate-950 border border-slate-700/60 text-slate-200 focus:outline-none focus:ring-2 focus:ring-red-500/40"
                            >
                                <option value="">
                                    Select account structure...
                                </option>
                                {users.map((user) => (
                                    <option key={user.id} value={user.id}>
                                        {user.name} ({user.email})
                                    </option>
                                ))}
                            </select>
                            {errors.user_id && (
                                <p className="text-red-400 text-sm mt-2">
                                    {errors.user_id}
                                </p>
                            )}
                        </div>
                    )}

                    {data.target_type === "brand" && (
                        <div className="bg-slate-900/40 p-4 border border-slate-700/30 rounded-lg animate-fadeIn">
                            <label className="block text-xs uppercase tracking-wider font-semibold text-slate-400 mb-2">
                                Assign Target Brand
                            </label>
                            <select
                                value={data.brand_id}
                                onChange={(e) =>
                                    setData("brand_id", e.target.value)
                                }
                                className="w-full px-4 py-2.5 rounded-lg bg-slate-950 border border-slate-700/60 text-slate-200 focus:outline-none focus:ring-2 focus:ring-red-500/40"
                            >
                                <option value="">
                                    Select architectural brand...
                                </option>
                                {brands.map((brand) => (
                                    <option key={brand.id} value={brand.id}>
                                        {brand.name}
                                    </option>
                                ))}
                            </select>
                            {errors.brand_id && (
                                <p className="text-red-400 text-sm mt-2">
                                    {errors.brand_id}
                                </p>
                            )}
                        </div>
                    )}

                    {data.target_type === "category" && (
                        <div className="bg-slate-900/40 p-4 border border-slate-700/30 rounded-lg animate-fadeIn">
                            <label className="block text-xs uppercase tracking-wider font-semibold text-slate-400 mb-2">
                                Assign Target Category
                            </label>
                            <select
                                value={data.category_id}
                                onChange={(e) =>
                                    setData("category_id", e.target.value)
                                }
                                className="w-full px-4 py-2.5 rounded-lg bg-slate-950 border border-slate-700/60 text-slate-200 focus:outline-none focus:ring-2 focus:ring-red-500/40"
                            >
                                <option value="">
                                    Select deployment category...
                                </option>
                                {categories.map((category) => (
                                    <option
                                        key={category.id}
                                        value={category.id}
                                    >
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                            {errors.category_id && (
                                <p className="text-red-400 text-sm mt-2">
                                    {errors.category_id}
                                </p>
                            )}
                        </div>
                    )}

                    {/* Minimum Order Threshold Validation */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-200 mb-2">
                            Minimum Order Amount Constraint (₹)
                        </label>
                        <input
                            type="number"
                            step="0.01"
                            value={data.min_order_amount}
                            onChange={(e) =>
                                setData("min_order_amount", e.target.value)
                            }
                            className={`w-full px-4 py-3 rounded-lg bg-slate-900/50 border transition-all duration-200 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-offset-0 ${
                                errors.min_order_amount
                                    ? "border-red-500/50 focus:ring-red-500/50 focus:border-red-500"
                                    : "border-slate-700/50 focus:ring-red-500/50 focus:border-red-500"
                            }`}
                            placeholder="0.00 (Leave blank or 0 for no structural constraints)"
                        />
                        {errors.min_order_amount && (
                            <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
                                <span>⚠️</span> {errors.min_order_amount}
                            </p>
                        )}
                    </div>

                    {/* Temporal Lifespan Configurations */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-slate-200 mb-2">
                                Start Date Threshold
                            </label>
                            <input
                                type="datetime-local"
                                value={data.starts_at}
                                onChange={(e) =>
                                    setData("starts_at", e.target.value)
                                }
                                className="w-full px-4 py-3 rounded-lg bg-slate-900/50 border border-slate-700/50 text-slate-100 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 custom-datetime-picker"
                            />
                            {errors.starts_at && (
                                <p className="text-red-400 text-sm mt-2">
                                    {errors.starts_at}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-200 mb-2">
                                Expiration/End Date Threshold
                            </label>
                            <input
                                type="datetime-local"
                                value={data.ends_at}
                                onChange={(e) =>
                                    setData("ends_at", e.target.value)
                                }
                                className="w-full px-4 py-3 rounded-lg bg-slate-900/50 border border-slate-700/50 text-slate-100 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 custom-datetime-picker"
                            />
                            {errors.ends_at && (
                                <p className="text-red-400 text-sm mt-2">
                                    {errors.ends_at}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Interactive Active State Checkbox */}
                    <div className="flex items-center group pt-2">
                        <input
                            type="checkbox"
                            id="is_active"
                            checked={data.is_active}
                            onChange={(e) =>
                                setData("is_active", e.target.checked)
                            }
                            className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-red-500 focus:ring-red-500/50 focus:ring-offset-0 accent-red-500 cursor-pointer"
                        />
                        <label
                            htmlFor="is_active"
                            className="ml-2.5 text-sm font-semibold text-slate-300 group-hover:text-slate-100 cursor-pointer transition-colors selector-none"
                        >
                            Deploy immediately upon validation (Active status)
                        </label>
                    </div>

                    {/* Information Alert Metric Widget */}
                    <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 flex gap-2.5 items-start">
                        <Tag
                            className="text-red-400 shrink-0 mt-0.5"
                            size={16}
                        />
                        <p className="text-sm text-slate-300 leading-relaxed">
                            <span className="font-semibold text-red-400">
                                Campaign Logic Tip:
                            </span>{" "}
                            Temporal processing validations ensure that if
                            expiration ranges parameters sit out of scope,
                            statuses automatically reflect status limits runtime
                            hooks.
                        </p>
                    </div>

                    {/* Operational Action Footer */}
                    <div className="flex gap-3 pt-4 border-t border-slate-700/30">
                        <button
                            type="submit"
                            disabled={processing}
                            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-red-500 to-rose-600 text-white font-semibold hover:shadow-lg hover:shadow-red-500/20 transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:shadow-none disabled:hover:translate-y-0"
                        >
                            <Plus size={18} />
                            {processing
                                ? "Deploying Configuration..."
                                : "Create Campaign Rule"}
                        </button>

                        <Link
                            href={route("discounts.index")}
                            className="px-6 py-3 rounded-lg bg-slate-800/40 text-slate-300 font-semibold hover:bg-slate-800/60 border border-slate-700/50 transition-all duration-200"
                        >
                            Cancel
                        </Link>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
