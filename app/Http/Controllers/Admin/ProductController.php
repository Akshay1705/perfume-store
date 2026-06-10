<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Product;
use App\Models\Category;
use App\Models\Brand;
use App\Http\Requests\Admin\ProductRequest;
use App\Services\ProductService;
use App\Http\Requests\Admin\ProductIndexRequest;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(ProductIndexRequest $request,ProductService $service): Response 
    {
        $filters = $request->validated();
        $products = $service->getProducts($filters);

        return Inertia::render(
            'Admin/Products/Index',
            [
                'products' => $products,
                'totalCount' => \App\Models\Product::count(), // always unfiltered
                'filters' => [
                    'search' => $filters['search'] ?? '',
                    'category' => $filters['category'] ?? '',
                    'brand' => $filters['brand'] ?? '',
                    'status' => $filters['status'] ?? '',
                    'gender' => $filters['gender'] ?? '',
                ],
                'categories' => Category::select('id','name')->orderBy('name')->get(),
                'brands' => Brand::select('id','name')->orderBy('name')->get(),
            ]
        );
    }

    /**
     * Show the form for creating a new resource.
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
            ]
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(
        ProductRequest $request,
        ProductService $service
    ) {
        // Create the product
        $product = $service->store($request->validated());

        // Return with product data so React can capture the ID
        return redirect()
            ->route('products.index')
            ->with([
                'success' => 'Product created successfully.',
                'product' => $product, // Pass the product back
            ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
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
                                'primaryImage'
                            ]);
                        },
                    ]),
                'categories' => $categories,
                'brands' => $brands,
            ]
        );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ProductRequest $request,Product $product,ProductService $service) 
    {
        $service->update($product,$request->validated());

        return redirect()
            ->route('products.index')
            ->with(
                'success',
                'Product updated successfully.'
            );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product,ProductService $service) 
    {
        $service->delete($product);

        return redirect()
            ->route('products.index')
            ->with(
                'success',
                'Product deleted successfully.'
            );
    }
}
