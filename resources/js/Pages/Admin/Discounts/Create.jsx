import React from "react";
import { useForm, Link, usePage } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { ArrowLeft, Plus } from "lucide-react";

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
                    className="inline-flex items-center gap-2 text-red-400 hover:text-red-300 text-sm font-medium mb-4 transition-colors group"
                >
                    <ArrowLeft
                        size={16}
                        className="group-hover:-translate-x-0.5 transition-transform"
                    />
                    Back to Discounts
                </Link>

                <h1 className="text-4xl font-bold bg-gradient-to-r from-red-400 to-rose-500 bg-clip-text text-transparent mb-2">
                    Create Discount
                </h1>
                <p className="text-slate-400">
                    Configure promotional parameters, expiration rules, and
                    scope metrics
                </p>
            </div>

            {/* Form — full width, no max-w wrapper */}
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
                            placeholder="e.g., Summer Campaign, New User Promotion"
                            className={inputClasses(errors.name)}
                        />
                        <ErrorMsg field="name" />
                    </div>

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
                            placeholder="e.g., SUMMER2026, CRIMSON10"
                            className={`${inputClasses(errors.code)} font-mono tracking-wider text-sm`}
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
                        <select
                            value={data.type}
                            onChange={(e) => setData("type", e.target.value)}
                            className={`${inputClasses(errors.type)} appearance-none`}
                            style={{ colorScheme: "dark" }}
                        >
                            <option value="percentage">Percentage (%)</option>
                            <option value="fixed">Fixed Amount (₹)</option>
                        </select>
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

                {/* Row 3 — Apply To + Conditional Select */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-semibold text-slate-200 mb-2">
                            Apply To *
                        </label>
                        <select
                            value={data.target_type}
                            onChange={(e) =>
                                setData("target_type", e.target.value)
                            }
                            className={`${inputClasses(errors.target_type)} appearance-none`}
                            style={{ colorScheme: "dark" }}
                        >
                            <option value="all">All Products</option>
                            <option value="user">Specific User</option>
                            <option value="brand">Specific Brand</option>
                            <option value="category">Specific Category</option>
                        </select>
                        <ErrorMsg field="target_type" />
                    </div>

                    {data.target_type === "user" && (
                        <div>
                            <label className="block text-sm font-semibold text-slate-200 mb-2">
                                Select User
                            </label>
                            <select
                                value={data.user_id}
                                onChange={(e) =>
                                    setData("user_id", e.target.value)
                                }
                                className={`${inputClasses(errors.user_id)} appearance-none`}
                                style={{ colorScheme: "dark" }}
                            >
                                <option value="">Choose a user</option>
                                {users.map((user) => (
                                    <option key={user.id} value={user.id}>
                                        {user.name} ({user.email})
                                    </option>
                                ))}
                            </select>
                            <ErrorMsg field="user_id" />
                        </div>
                    )}

                    {data.target_type === "brand" && (
                        <div>
                            <label className="block text-sm font-semibold text-slate-200 mb-2">
                                Select Brand
                            </label>
                            <select
                                value={data.brand_id}
                                onChange={(e) =>
                                    setData("brand_id", e.target.value)
                                }
                                className={`${inputClasses(errors.brand_id)} appearance-none`}
                                style={{ colorScheme: "dark" }}
                            >
                                <option value="">Choose a brand</option>
                                {brands.map((brand) => (
                                    <option key={brand.id} value={brand.id}>
                                        {brand.name}
                                    </option>
                                ))}
                            </select>
                            <ErrorMsg field="brand_id" />
                        </div>
                    )}

                    {data.target_type === "category" && (
                        <div>
                            <label className="block text-sm font-semibold text-slate-200 mb-2">
                                Select Category
                            </label>
                            <select
                                value={data.category_id}
                                onChange={(e) =>
                                    setData("category_id", e.target.value)
                                }
                                className={`${inputClasses(errors.category_id)} appearance-none`}
                                style={{ colorScheme: "dark" }}
                            >
                                <option value="">Choose a category</option>
                                {categories.map((category) => (
                                    <option
                                        key={category.id}
                                        value={category.id}
                                    >
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                            <ErrorMsg field="category_id" />
                        </div>
                    )}

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

                {/* Row 5 — Active toggle + Info note */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-center gap-3 bg-slate-900/30 border border-slate-700/30 rounded-lg p-4">
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
                            className="text-sm font-semibold text-slate-200 cursor-pointer select-none"
                        >
                            Active Status
                        </label>
                    </div>

                    <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                        <p className="text-sm text-slate-300 leading-relaxed">
                            <span className="font-semibold text-red-400">
                                💡 Tip:
                            </span>{" "}
                            Leave dates blank for a discount that's always
                            active. Set an end date to auto-expire the campaign.
                        </p>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-2 border-t border-slate-700/30">
                    <button
                        type="submit"
                        disabled={processing}
                        className="flex items-center justify-center gap-2 px-8 py-3 rounded-lg bg-gradient-to-r from-red-500 to-rose-600 text-white font-semibold hover:shadow-lg hover:shadow-red-500/20 transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:shadow-none disabled:hover:translate-y-0"
                    >
                        <Plus size={18} />
                        {processing ? "Creating..." : "Create Discount"}
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
