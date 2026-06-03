import React from "react";
import { useForm, Link, usePage } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { ArrowLeft, Save } from "lucide-react";

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

    // Shared styling classes to match the Category page input rules
    const inputClasses = (errorKey) => `
        w-full px-4 py-3 rounded-lg bg-slate-900/50 border transition-all duration-200 
        text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-offset-0
        ${
            errorKey
                ? "border-red-500/50 focus:ring-red-500/50 focus:border-red-500"
                : "border-slate-700/50 focus:ring-amber-500/50 focus:border-amber-500"
        }
    `;

    return (
        <AdminLayout>
            {/* Header */}
            <div className="mb-8">
                <Link
                    href={route("discounts.index")}
                    className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 text-sm font-medium mb-4 transition-colors"
                >
                    <ArrowLeft size={16} />
                    Back to Discounts
                </Link>

                <div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent mb-2">
                        Edit Discount
                    </h1>
                    <p className="text-slate-400">
                        Update discount rules, types, and targeting rules
                    </p>
                </div>
            </div>

            {/* Form Container */}
            <div className="max-w-2xl">
                <form
                    onSubmit={handleSubmit}
                    className="bg-slate-800/20 border border-slate-700/50 rounded-lg p-8 backdrop-blur-sm space-y-6"
                >
                    {/* Discount ID Info */}
                    <div className="bg-slate-900/40 border border-slate-700/50 rounded-lg p-4">
                        <p className="text-slate-400 text-sm">
                            <span className="font-semibold text-slate-300">
                                Discount ID:
                            </span>{" "}
                            {discount.id}
                        </p>
                    </div>

                    {/* Name */}
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
                        {errors.name && (
                            <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
                                <span>⚠️</span> {errors.name}
                            </p>
                        )}
                    </div>

                    {/* Code */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-200 mb-2">
                            Discount Code (Optional)
                        </label>
                        <input
                            type="text"
                            value={data.code}
                            onChange={(e) => setData("code", e.target.value)}
                            placeholder="e.g., SUMMER2026, SAVE20"
                            className={`${inputClasses(errors.code)} font-mono uppercase text-sm`}
                        />
                        {errors.code && (
                            <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
                                <span>⚠️</span> {errors.code}
                            </p>
                        )}
                    </div>

                    {/* Type & Value Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Type */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-200 mb-2">
                                Discount Type *
                            </label>
                            <select
                                value={data.type}
                                onChange={(e) =>
                                    setData("type", e.target.value)
                                }
                                className={`${inputClasses(errors.type)} appearance-none`}
                                style={{ colorScheme: "dark" }}
                            >
                                <option value="percentage">
                                    Percentage (%)
                                </option>
                                <option value="fixed">Fixed Amount (₹)</option>
                            </select>
                            {errors.type && (
                                <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
                                    <span>⚠️</span> {errors.type}
                                </p>
                            )}
                        </div>

                        {/* Value */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-200 mb-2">
                                Value{" "}
                                {data.type === "percentage" ? "(%)" : "(₹)"} *
                            </label>
                            <input
                                type="number"
                                step="0.01"
                                value={data.value}
                                onChange={(e) =>
                                    setData("value", e.target.value)
                                }
                                placeholder="0.00"
                                className={inputClasses(errors.value)}
                            />
                            {errors.value && (
                                <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
                                    <span>⚠️</span> {errors.value}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Target Type */}
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
                        {errors.target_type && (
                            <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
                                <span>⚠️</span> {errors.target_type}
                            </p>
                        )}
                    </div>

                    {/* Conditional Selects Based on Target Type */}
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
                            {errors.user_id && (
                                <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
                                    <span>⚠️</span> {errors.user_id}
                                </p>
                            )}
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
                            {errors.brand_id && (
                                <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
                                    <span>⚠️</span> {errors.brand_id}
                                </p>
                            )}
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
                            {errors.category_id && (
                                <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
                                    <span>⚠️</span> {errors.category_id}
                                </p>
                            )}
                        </div>
                    )}

                    {/* Min Order Amount */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-200 mb-2">
                            Minimum Order Amount (₹)
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
                        {errors.min_order_amount && (
                            <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
                                <span>⚠️</span> {errors.min_order_amount}
                            </p>
                        )}
                    </div>

                    {/* Dates Grid Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Starts At */}
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
                            {errors.starts_at && (
                                <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
                                    <span>⚠️</span> {errors.starts_at}
                                </p>
                            )}
                        </div>

                        {/* Ends At */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-200 mb-2">
                                End Date
                            </label>
                            <input
                                type="datetime-local"
                                value={data.ends_at}
                                onChange={(e) =>
                                    setData("ends_at", e.target.value)
                                }
                                className={inputClasses(errors.ends_at)}
                                style={{ colorScheme: "dark" }}
                            />
                            {errors.ends_at && (
                                <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
                                    <span>⚠️</span> {errors.ends_at}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Is Active Checkbox */}
                    <div className="flex items-center gap-3 bg-slate-900/30 border border-slate-700/30 rounded-lg p-4">
                        <input
                            type="checkbox"
                            id="is_active"
                            checked={data.is_active}
                            onChange={(e) =>
                                setData("is_active", e.target.checked)
                            }
                            className="w-4 h-4 rounded text-amber-500 focus:ring-amber-500/50 bg-slate-950 border-slate-700 accent-amber-500 cursor-pointer"
                        />
                        <label
                            htmlFor="is_active"
                            className="text-sm font-semibold text-slate-200 cursor-pointer select-none"
                        >
                            Active Status
                        </label>
                    </div>

                    {/* Blue Info Box Warning */}
                    <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                        <p className="text-sm text-blue-300">
                            <span className="font-semibold">ℹ️ Note:</span>{" "}
                            Changing active settings or discount values
                            instantly applies updates across active user
                            checkouts using this ruleset.
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-4">
                        <button
                            type="submit"
                            disabled={processing}
                            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold hover:shadow-lg hover:shadow-green-500/20 transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:shadow-none disabled:hover:translate-y-0"
                        >
                            <Save size={18} />
                            {processing ? "Saving Changes..." : "Save Changes"}
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
