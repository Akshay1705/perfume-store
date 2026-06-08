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
     * Display a listing of all product variants matching query filter strings.
     */
    public function index(Request $request)
    {
        // 1. Gather input filters safely from the query string parameters
        $search   = $request->query('search');
        $category = $request->query('category'); // Expects category slug string
        $brand    = $request->query('brand');    // Expects brand slug string
        $gender   = $request->query('gender');   // Expects 'men', 'women', or 'unisex'
        $volumes  = $request->query('volumes', []); // Expects an array of sizes (e.g. ['50ml', '100ml'])

        // 2. Build the query engine dynamically
        $productsQuery = Product::where('is_active', true)
            ->whereHas('variants', function ($q) use ($volumes) {
                $q->where('is_active', true);

                // Filter variants by volume size matrix if selected
                if (!empty($volumes)) {
                    $q->whereIn('volume', $volumes);
                }
            });

        // Apply text-search query rule
        if (!empty($search)) {
            $productsQuery->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhereHas('brand', function ($bq) use ($search) {
                        $bq->where('name', 'like', "%{$search}%");
                    });
            });
        }

        // Apply dynamic Category configuration parameter
        if (!empty($category) && $category !== 'all') {
            $productsQuery->whereHas('category', function ($q) use ($category) {
                $q->where('slug', $category);
            });
        }

        // Apply dynamic Brand configuration parameter
        if (!empty($brand) && $brand !== 'all') {
            $productsQuery->whereHas('brand', function ($q) use ($brand) {
                $q->where('slug', $brand);
            });
        }

        // Apply structural Gender classification selection
        if (!empty($gender) && $gender !== 'all') {
            $productsQuery->where('gender', $gender);
        }

        // Execute query engine with eager relationships appended cleanly
        $products = $productsQuery->with([
            'brand',
            'category',
            'variants' => function ($q) use ($volumes) {
                $q->where('is_active', true);

                if (!empty($volumes)) {
                    $q->whereIn('volume', $volumes);
                }

                $q->with('images')->orderBy('price', 'asc');
            }
        ])->get();

        // 3. Fetch lookup metadata options for the sidebar view panel
        $categories = Category::select('id', 'name', 'slug')->orderBy('name')->get();
        $brands = Brand::select('id', 'name', 'slug')->orderBy('name')->get();

        // 4. Return variables and pass 'currentFilters' back to preserve state inside React inputs
        return Inertia::render('Store/Products/Index', [
            'products'   => $products,
            'categories' => $categories,
            'brands'     => $brands,
            'currentFilters' => [
                'search'   => $search ?? '',
                'category' => $category ?? 'all',
                'brand'    => $brand ?? 'all',
                'gender'   => $gender ?? 'all',
                'volumes'  => $volumes,
            ]
        ]);
    }

    /**
     * Display a single product's comprehensive details.
     */
    public function show($slug)
    {
        $product = Product::where('slug', $slug)
            ->where('is_active', true)
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
