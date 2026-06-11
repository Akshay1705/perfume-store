<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;
use App\Models\Product;
use App\Models\Category;
use App\Models\Brand;
use App\Services\ProductService;
use App\Http\Requests\Admin\ProductRequest;
use App\Http\Requests\Admin\ProductIndexRequest;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     * 
     * @param ProductIndexRequest $request
     * @param ProductService      $service
     * 
     * @return Response
     */
    public function index(ProductIndexRequest $request, ProductService $service): Response 
    {
        $filters = $request->validated();
        $products = $service->getProducts($filters);

        return Inertia::render(
            'Admin/Products/Index',
            [
                'products' => $products,
                'totalCount' => Product::count(),
                'filters' => [
                    'search' => $filters['search'] ?? '',
                    'category' => $filters['category'] ?? '',
                    'brand' => $filters['brand'] ?? '',
                    'status' => $filters['status'] ?? '',
                    'gender' => $filters['gender'] ?? '',
                ],
                'categories' => Category::select('id', 'name')->orderBy('name')->get(),
                'brands' => Brand::select('id', 'name')->orderBy('name')->get(),
            ],
        );
    }

    /**
     * Show the form for creating a new resource.
     * 
     * @return Response
     */
    public function create(): Response
    {
        $categories = Category::all();
        $brands = Brand::all();

        return Inertia::render(
            'Admin/Products/Create',
            [
                'categories' => $categories,
                'brands' => $brands,
            ],
        );
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param ProductRequest $request
     * @param ProductService $service
     *
     * @return RedirectResponse
     */
    public function store(ProductRequest $request, ProductService $service): RedirectResponse
    {
        $product = $service->store($request->validated());

        return redirect()
            ->route('products.index')
            ->with([
                'success' => 'Product created successfully.',
                'product' => $product->id,
            ]);
    }

    /**
     * Show the form for editing the specified resource.
     * 
     * @param Product $product
     * 
     * @return Response
     */
    public function edit(Product $product): Response 
    {
        $categories = Category::all();
        $brands = Brand::all();

        return Inertia::render(
            'Admin/Products/Edit',
            [
                'product' => $product->load([
                    'category', 
                    'brand',
                    'variants' => function ($q) {
                        $q->with([
                            'images',
                            'primaryImage',
                        ]);
                    },
                    ]),
                'categories' => $categories,
                'brands' => $brands,
            ],
        );
    }

    /**
     * Update the specified resource in storage.
     * 
     * @param ProductRequest  $request
     * @param Product         $product
     * @param ProductService  $service
     * 
     * @return RedirectResponse
     * 
     */
    public function update(ProductRequest $request, Product $product, ProductService $service): RedirectResponse
    {
        $service->update($product, $request->validated());

        return redirect()
            ->route('products.index')
            ->with(
                'success',
                'Product updated successfully.',
            );
    }

    /**
     * Remove the specified resource from storage.
     * 
     * @param Product        $product
     * @param ProductService $service
     * 
     * @return RedirectResponse
     */
    public function destroy(Product $product, ProductService $service): RedirectResponse
    {
        $service->delete($product);

        return redirect()
            ->route('products.index')
            ->with(
                'success',
                'Product deleted successfully.',
            );
    }
}
