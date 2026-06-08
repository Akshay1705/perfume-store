<?php

namespace App\Http\Controllers\Store;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Inertia\Inertia;
use App\Models\Category;
use App\Models\Brand;

class HomeController extends Controller
{
    public function index()
    {
        $products = Product::with([
            'brand',
            'variants' => fn($q) => $q
                ->where('is_active', true)
                ->with('images')
                ->orderBy('id'),
        ])
            ->where('is_active', true)
            ->latest()
            ->get();

        // Flatten to one entry per variant for the frontend
        $variants = $products->flatMap(function ($product) {
            return $product->variants->map(function ($variant) use ($product) {
                return [
                    'id'          => $variant->id,
                    'product_id'  => $product->id,
                    'slug'        => $product->slug,
                    'name'        => $product->name,
                    'brand'       => $product->brand?->name,
                    'volume'      => $variant->volume,
                    'price'       => $variant->price,
                    'stock'       => $variant->stock,
                    'is_active'   => $variant->is_active,
                    'image'       => $variant->images
                        ->firstWhere('is_primary', true)
                        ?->url
                        ?? $variant->images->first()?->url,
                ];
            });
        })->values();

        return Inertia::render('Store/Home', [
            'variants'   => $variants,
            'categories' => Category::orderBy('name')->get(),
            'brands'     => Brand::orderBy('name')->get(),
        ]);
    }
}
