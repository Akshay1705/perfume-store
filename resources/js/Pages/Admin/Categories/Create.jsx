"use strict";

import AdminLayout from "@/Layouts/AdminLayout";
import { useForm, Link } from "@inertiajs/react";
import { ArrowLeft, Plus } from "lucide-react";
import { useEffect } from "react";
import { usePage } from "@inertiajs/react";
import { toast } from "react-toastify";

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        slug: "",
    });

    const { flash } = usePage().props;

    useEffect(() => {
        if (flash?.success) toast.success(flash.success);
        if (flash?.error) toast.error(flash.error);
    }, [flash]);

    function submit(e) {
        e.preventDefault();
        post(route("categories.store"));
    }

    const handleNameChange = (e) => {
        const name = e.target.value;
        setData("name", name);

        // Auto-generate slug from name
        const slug = name
            .toLowerCase()
            .trim()
            .replace(/\s+/g, "-")
            .replace(/[^\w-]/g, "");

        setData("slug", slug);
    };

    return (
        <AdminLayout>
            {/* Header */}
            <div className="mb-8">
                <Link
                    href={route("categories.index")}
                    className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 text-sm font-medium mb-4 transition-colors"
                >
                    <ArrowLeft size={16} />
                    Back to Categories
                </Link>

                <div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent mb-2">
                        Create Category
                    </h1>
                    <p className="text-slate-400">
                        Add a new category to your catalog
                    </p>
                </div>
            </div>

            {/* Form Container */}
            <div className="max-w-2xl">
                <form
                    onSubmit={submit}
                    className="bg-slate-800/20 border border-slate-700/50 rounded-lg p-8 backdrop-blur-sm space-y-6"
                >
                    {/* Name Field */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-200 mb-2">
                            Category Name *
                        </label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={handleNameChange}
                            placeholder="e.g., Men's Fragrances"
                            className={`w-full px-4 py-3 rounded-lg bg-slate-900/50 border transition-all duration-200 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-offset-0 ${
                                errors.name
                                    ? "border-red-500/50 focus:ring-red-500/50 focus:border-red-500"
                                    : "border-slate-700/50 focus:ring-amber-500/50 focus:border-amber-500"
                            }`}
                        />
                        {errors.name && (
                            <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
                                <span>⚠️</span> {errors.name}
                            </p>
                        )}
                    </div>

                    {/* Slug Field */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-200 mb-2">
                            Slug *
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                value={data.slug}
                                onChange={(e) =>
                                    setData("slug", e.target.value)
                                }
                                placeholder="e.g., mens-fragrances"
                                className={`w-full px-4 py-3 rounded-lg bg-slate-900/50 border transition-all duration-200 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-offset-0 font-mono text-sm ${
                                    errors.slug
                                        ? "border-red-500/50 focus:ring-red-500/50 focus:border-red-500"
                                        : "border-slate-700/50 focus:ring-amber-500/50 focus:border-amber-500"
                                }`}
                            />
                        </div>
                        {errors.slug && (
                            <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
                                <span>⚠️</span> {errors.slug}
                            </p>
                        )}
                        <p className="text-slate-500 text-xs mt-2">
                            Auto-generated from name. Use lowercase letters,
                            numbers, and hyphens only.
                        </p>
                    </div>

                    {/* Info Box */}
                    <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
                        <p className="text-sm text-amber-300">
                            <span className="font-semibold">💡 Tip:</span> The
                            slug is used in URLs and must be unique.
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-4">
                        <button
                            type="submit"
                            disabled={processing}
                            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-semibold hover:shadow-lg hover:shadow-amber-500/20 transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:shadow-none disabled:hover:translate-y-0"
                        >
                            <Plus size={18} />
                            {processing ? "Creating..." : "Create Category"}
                        </button>

                        <Link
                            href={route("categories.index")}
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
