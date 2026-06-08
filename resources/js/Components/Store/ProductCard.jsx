import { Link } from "@inertiajs/react";

export default function ProductCard({ variant }) {
    return (
        <Link
            href={route("products.show", variant.slug)}
            className="block group"
        >
            {/* Image */}
            <div className="aspect-[3/4] rounded-xl overflow-hidden bg-stone-100 mb-3">
                {variant.image ? (
                    <img
                        src={variant.image}
                        alt={variant.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-stone-300 text-4xl">
                        🧴
                    </div>
                )}
            </div>

            {/* Info */}
            <div className="space-y-0.5">
                <p className="text-xs text-amber-600 font-medium uppercase tracking-wider">
                    {variant.brand}
                </p>
                <h3 className="font-serif text-stone-900 font-semibold leading-snug">
                    {variant.name}
                </h3>
                <div className="flex items-center justify-between pt-1">
                    <span className="text-xs text-stone-400 bg-stone-100 px-2 py-0.5 rounded-full">
                        {variant.volume}
                    </span>
                    <span className="font-bold text-stone-900">
                        ₹{Number(variant.price).toLocaleString()}
                    </span>
                </div>
            </div>
        </Link>
    );
}