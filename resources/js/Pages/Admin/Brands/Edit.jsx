import AdminLayout from "@/Layouts/AdminLayout";
import { useForm, Link } from "@inertiajs/react";
import { ArrowLeft, Save } from "lucide-react";

export default function Edit({ brand }) {
    const { data, setData, put, processing, errors } = useForm({
        name: brand.name,
        slug: brand.slug,
    });

    function submit(e) {
        e.preventDefault();
        put(route("brands.update", brand.id));
    }

    const handleNameChange = (e) => {
        const name = e.target.value;
        setData("name", name);
    };

    return (
        <AdminLayout>
            {/* Header */}
            <div className="mb-8">
                <Link
                    href={route("brands.index")}
                    className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 text-sm font-medium mb-4 transition-colors"
                >
                    <ArrowLeft size={16} />
                    Back to Brands
                </Link>

                <div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-2">
                        Edit Brand
                    </h1>
                    <p className="text-slate-400">Update brand information</p>
                </div>
            </div>

            {/* Form Container */}
            <div className="max-w-2xl">
                <form
                    onSubmit={submit}
                    className="bg-slate-800/20 border border-slate-700/50 rounded-lg p-8 backdrop-blur-sm space-y-6"
                >
                    {/* Brand ID Info */}
                    <div className="bg-slate-900/40 border border-slate-700/50 rounded-lg p-4">
                        <p className="text-slate-400 text-sm">
                            <span className="font-semibold text-slate-300">
                                Brand ID:
                            </span>{" "}
                            {brand.id}
                        </p>
                    </div>

                    {/* Name Field */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-200 mb-2">
                            Brand Name *
                        </label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={handleNameChange}
                            placeholder="e.g., Dior, Guerlain"
                            className={`w-full px-4 py-3 rounded-lg bg-slate-900/50 border transition-all duration-200 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-offset-0 ${
                                errors.name
                                    ? "border-red-500/50 focus:ring-red-500/50 focus:border-red-500"
                                    : "border-slate-700/50 focus:ring-purple-500/50 focus:border-purple-500"
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
                        <input
                            type="text"
                            value={data.slug}
                            onChange={(e) => setData("slug", e.target.value)}
                            placeholder="e.g., dior"
                            className={`w-full px-4 py-3 rounded-lg bg-slate-900/50 border transition-all duration-200 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-offset-0 font-mono text-sm ${
                                errors.slug
                                    ? "border-red-500/50 focus:ring-red-500/50 focus:border-red-500"
                                    : "border-slate-700/50 focus:ring-purple-500/50 focus:border-purple-500"
                            }`}
                        />
                        {errors.slug && (
                            <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
                                <span>⚠️</span> {errors.slug}
                            </p>
                        )}
                        <p className="text-slate-500 text-xs mt-2">
                            Used in URLs. Change carefully as it may affect
                            existing links.
                        </p>
                    </div>

                    {/* Info Box */}
                    <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                        <p className="text-sm text-blue-300">
                            <span className="font-semibold">ℹ️ Note:</span> Any
                            changes to the slug may affect your store's URLs.
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
                            {processing ? "Saving..." : "Save Changes"}
                        </button>

                        <Link
                            href={route("brands.index")}
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
