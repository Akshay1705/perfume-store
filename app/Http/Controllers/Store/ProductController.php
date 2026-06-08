<?php

namespace App\Http\Controllers\Store;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function show(Product $product)
    {
        $product->load([
            'images',
            'brand',
            'category',
            'variants' => fn($q) =>
            $q->where('is_active', true)
        ]);

        return Inertia::render(
            'Store/ProductShow',
            [
                'product' => $product,
            ]
        );
    }
}
