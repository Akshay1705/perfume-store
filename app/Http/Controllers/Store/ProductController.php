<?php

namespace App\Http\Controllers\Store;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Category;
use App\Models\Brand;
use Inertia\Inertia;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of all product variants for the catalog grid view.
     */
    public function index()
    {
        // 1. Fetch only products that actually have active variants
        $products = Product::whereHas('variants', function ($q) {
            $q->where('is_active', true);
        })
            ->with([
                'brand',
                'category',
                'variants' => function ($q) {
                    // Fetch active variants with their attached images ordered cleanly
                    $q->where('is_active', true)->with('images')->orderBy('price', 'asc');
                }
            ])
            ->get();

        // 2. Fetch dropdown lookup options for your frontend search filter blocks
        $categories = Category::select('id', 'name', 'slug')->orderBy('name')->get();
        $brands = Brand::select('id', 'name', 'slug')->orderBy('name')->get();

        return Inertia::render('Store/Products/Index', [
            'products'   => $products,
            'categories' => $categories,
            'brands'     => $brands,
        ]);
    }

    /**
     * Display a single product's comprehensive details with variant configuration selections.
     */
    public function show($slug)
    {
        // Changed lookup from ID mapping to route model matching via your luxury URLs 'slug' property
        $product = Product::where('slug', $slug)
            ->with([
                'brand',
                'category',
                'variants' => function ($q) {
                    $q->where('is_active', true)
                        ->with('images')
                        ->orderBy('id');
                },
            ])
            ->firstOrFail();

        return Inertia::render('Store/ProductShow', [
            'product' => $product,
        ]);
    }
}
