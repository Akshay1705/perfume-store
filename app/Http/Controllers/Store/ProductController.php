<?php

namespace App\Http\Controllers\Store;

use App\Http\Controllers\Controller;
use App\Http\Requests\Store\ProductSearchRequest;
use App\Models\Brand;
use App\Models\Category;
use App\Repositories\Contracts\ProductRepositoryInterface;
use App\Services\ProductFilterService;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    /**
     * @param ProductFilterService $filterService
     */
    public function __construct(protected ProductFilterService $filterService) {}

    /**
     * Display a listing of all products matching query filter strings.
     *
     * @param ProductSearchRequest $request
     *
     * @return Response
     */
    public function index(ProductSearchRequest $request): Response
    {
        $filters = [
            'search'   => $request->query('search'),
            'category' => $request->query('category'),
            'brand'    => $request->query('brand'),
            'gender'   => $request->query('gender'),
            'volumes'  => $request->query('volumes', []),
        ];

        $products   = $this->filterService->getPaginatedProducts($filters, $request->query('per_page', 10));
        $categories = Category::select('id', 'name', 'slug')->orderBy('name')->get();
        $brands     = Brand::select('id', 'name', 'slug')->orderBy('name')->get();

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
     * Display a single product's details.
     *
     * @param string $slug
     *
     * @return Response
     */
    public function show(string $slug, ProductRepositoryInterface $products): Response
    {
        $product = $products->findBySlug($slug);

        return Inertia::render('Store/ProductShow', [
            'product' => $product,
        ]);
    }
}