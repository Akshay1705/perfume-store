<?php

namespace App\Http\Controllers\Store;

use App\Http\Controllers\Controller;
use App\Http\Requests\Store\ProductSearchRequest;
use App\Models\Product;
use App\Models\Category;
use App\Models\Brand;
use App\Services\ProductFilterService;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function __construct(
        protected ProductFilterService $filterService
    ) {}

    /**
     * Display a listing of all product variants matching query filter strings.
     */
    public function index(ProductSearchRequest $request)
    {
        // 1. Gather input filters safely from the query string parameters
        $filters = [
            'search'   => $request->query('search'),
            'category' => $request->query('category'),
            'brand'    => $request->query('brand'),
            'gender'   => $request->query('gender'),
            'volumes'  => $request->query('volumes', []),
        ];

        // 2. Get filtered products via service
        $products = $this->filterService->getFilteredProductsQuery($filters)->get();

        // 3. Fetch lookup metadata options for the sidebar view panel
        $categories = Category::select('id', 'name', 'slug')->orderBy('name')->get();
        $brands     = Brand::select('id', 'name', 'slug')->orderBy('name')->get();

        // 4. Return variables and pass 'currentFilters' back to preserve state inside React inputs
        return Inertia::render('Store/Products/Index', [
            'products'       => $products,
            'categories'     => $categories,
            'brands'         => $brands,
            'currentFilters' => [
                'search'   => $filters['search']   ?? '',
                'category' => $filters['category'] ?? 'all',
                'brand'    => $filters['brand']    ?? 'all',
                'gender'   => $filters['gender']   ?? 'all',
                'volumes'  => $filters['volumes'],
            ],
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
