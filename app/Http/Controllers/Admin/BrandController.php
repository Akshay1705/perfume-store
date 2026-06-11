<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\BrandRequest;
use App\Models\Brand;
use App\Services\BrandService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class BrandController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
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

    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function create(): Response
    {
        return Inertia::render(
            'Admin/Brands/Create'
        );
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param BrandRequest $request
     * @param BrandService $service
     *
     * @return RedirectResponse
     */
    public function store(BrandRequest $request, BrandService $service): RedirectResponse
    {
        $service->store($request->validated());

        return redirect()
            ->route('brands.index')
            ->with(
                'success',
                'Brand created successfully.'
            );
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param Brand $brand
     *
     * @return Response
     */
    public function edit(Brand $brand): Response
    {
        return Inertia::render(
            'Admin/Brands/Edit',
            [
                'brand' => $brand,
            ]
        );
    }

    /**
     * Update the specified resource in storage.
     *
     * @param BrandRequest $request
     * @param Brand        $brand
     * @param BrandService $service
     *
     * @return RedirectResponse
     */
    public function update(BrandRequest $request, Brand $brand, BrandService $service): RedirectResponse
    {
        $service->update($brand, $request->validated());

        return redirect()
            ->route('brands.index')
            ->with(
                'success',
                'Brand updated successfully.'
            );
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Brand        $brand
     * @param BrandService $service
     *
     * @return RedirectResponse
     */
    public function destroy(Brand $brand, BrandService $service): RedirectResponse
    {
        $service->delete($brand);

        return redirect()
            ->route('brands.index')
            ->with(
                'success',
                'Brand deleted successfully.'
            );
    }

    /**
     * Restore the specified resource from soft deletion.
     *
     * @param int          $id
     * @param BrandService $service
     *
     * @return RedirectResponse
     */
    public function restore(int $id, BrandService $service): RedirectResponse
    {
        $service->restore($id);

        return redirect()
            ->route('brands.index')
            ->with(
                'success',
                'Brand restored successfully.'
            );
    }

    /**
     * Permanently delete the specified resource from storage.
     *
     * @param int          $id
     * @param BrandService $service
     *
     * @return RedirectResponse
     */
    public function forceDelete(int $id, BrandService $service): RedirectResponse
    {
        $service->forceDelete($id);

        return redirect()
            ->route('brands.index')
            ->with(
                'success',
                'Brand permanently deleted successfully.'
            );
    }
}