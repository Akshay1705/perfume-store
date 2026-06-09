<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\BrandRequest;
use App\Models\Brand;
use App\Services\BrandService;
use Inertia\Inertia;
use Inertia\Response;

class BrandController extends Controller
{
    public function index(): Response
    {
        $brands = Brand::withTrashed()->latest()->get();

        return Inertia::render(
            'Admin/Brands/Index',
            [
                'brands' => $brands,
            ]
        );
    }

    public function create(): Response
    {
        return Inertia::render(
            'Admin/Brands/Create'
        );
    }

    public function store(
        BrandRequest $request,
        BrandService $service
    ) {
        $service->store(
            $request->validated()
        );

        return redirect()
            ->route('brands.index')
            ->with(
                'success',
                'Brand created successfully.'
            );
    }

    public function edit(
        Brand $brand
    ): Response {

        return Inertia::render(
            'Admin/Brands/Edit',
            [
                'brand' => $brand,
            ]
        );
    }

    public function update(
        BrandRequest $request,
        Brand $brand,
        BrandService $service
    ) {

        $service->update(
            $brand,
            $request->validated()
        );

        return redirect()
            ->route('brands.index')
            ->with(
                'success',
                'Brand updated successfully.'
            );
    }

    public function destroy(
        Brand $brand,
        BrandService $service
    ) {

        $service->delete($brand);

        return redirect()
            ->route('brands.index')
            ->with(
                'success',
                'Brand deleted successfully.'
            );
    }

    public function restore(
        int $id,
        BrandService $service
    ) {
        $service->restore($id);

        return redirect()
            ->route('brands.index')
            ->with(
                'success',
                'Brand restored successfully.'
            );
    }

    public function forceDelete(
        int $id,
        BrandService $service
    ) {
        $service->forceDelete($id);

        return redirect()
            ->route('brands.index')
            ->with(
                'success',
                'Brand permanently deleted successfully.'
            );
    }
}
