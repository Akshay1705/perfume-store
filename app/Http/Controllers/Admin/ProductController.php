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
use App\Repositories\Contracts\ProductRepositoryInterface;
use Illuminate\Validation\ValidationException;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     * 
     * @param ProductIndexRequest        $request
     * @param ProductService             $service
     * @param ProductRepositoryInterface $productRepository
     * 
     * @return Response
     */
    public function index(ProductIndexRequest $request, ProductService $service, ProductRepositoryInterface $productRepository): Response
    {
        $filters = $request->validated();
        $products = $service->getProducts($filters);

        return Inertia::render(
            'Admin/Products/Index',
            [
                'products' => $products,
                'totalCount' => $productRepository->countProducts(),
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
    public function edit(Product $product, ProductRepositoryInterface $products): Response
    {
        $categories = Category::all();
        $brands = Brand::all();

        return Inertia::render(
            'Admin/Products/Edit',
            [
                'product' => $products->findForEdit($product->id),
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

    public function restore(int $id, ProductService $service): RedirectResponse
    {
        $service->restore($id);

        return redirect()
            ->route('products.index')
            ->with('success', 'Product restored successfully.');
    }

    public function forceDelete(int $id, ProductService $service): RedirectResponse
    {
        try {
            $service->forceDelete($id);

            return redirect()
                ->route('products.index')
                ->with('success', 'Product permanently deleted.');
        } catch (ValidationException $e) {
            return redirect()
                ->route('products.index')
                ->with('error', $e->validator->errors()->first('product'));
        }
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
