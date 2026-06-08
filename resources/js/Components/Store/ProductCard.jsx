import { Link } from "@inertiajs/react";

export default function ProductCard({ product }) {
    const minPrice = Math.min(...product.variants.map((v) => Number(v.price)));

    return (
        <Link
            href={route("products.show", product.slug)}
            className="block border rounded-lg overflow-hidden hover:shadow-lg"
        >
            <img
                src={product.primary_image?.url}
                alt={product.name}
                className="w-full h-64 object-cover"
            />

            <div className="p-4">
                <p className="text-sm text-gray-500">{product.brand?.name}</p>

                <h3 className="font-semibold">{product.name}</h3>

                <p className="font-bold mt-2">₹{minPrice}</p>
            </div>
        </Link>
    );
}
