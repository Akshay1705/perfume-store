<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Category;
use App\Services\CategoryService;
use App\Http\Requests\Admin\CategoryRequest;
use Illuminate\Http\RedirectResponse;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index(): Response
    {
        $categories = Category::withTrashed()->latest()->get();

        return Inertia::render(
            'Admin/Categories/Index',
            [
                'categories' => $categories,
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
            'Admin/Categories/Create'
        );
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param CategoryRequest $request
     * @param CategoryService $service
     *
     * @return RedirectResponse
     */
    public function store(CategoryRequest $request, CategoryService $service): RedirectResponse
    {
        $service->store($request->validated());

        return redirect()
            ->route('categories.index')
            ->with(
                'success',
                'Category created successfully.'
            );
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param Category $category
     *
     * @return Response
     */
    public function edit(Category $category): Response
    {
        return Inertia::render(
            'Admin/Categories/Edit',
            [
                'category' => $category,
            ]
        );
    }

    /**
     * Update the specified resource in storage.
     *
     * @param CategoryRequest $request
     * @param Category        $category
     * @param CategoryService $service
     *
     * @return RedirectResponse
     */
    public function update(CategoryRequest $request, Category $category, CategoryService $service): RedirectResponse
    {
        $service->update($category, $request->validated());

        return redirect()
            ->route('categories.index')
            ->with(
                'success',
                'Category updated successfully.'
            );
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Category        $category
     * @param CategoryService $service
     *
     * @return RedirectResponse
     */
    public function destroy(Category $category, CategoryService $service): RedirectResponse
    {
        $service->delete($category);

        return redirect()
            ->route('categories.index')
            ->with(
                'success',
                'Category deleted successfully.'
            );
    }

    /**
     * Restore the specified resource from soft deletion.
     *
     * @param int             $id
     * @param CategoryService $service
     *
     * @return RedirectResponse
     */
    public function restore(int $id, CategoryService $service): RedirectResponse
    {
        $service->restore($id);

        return redirect()
            ->route('categories.index')
            ->with('success', 'Category restored successfully.');
    }

    /**
     * Permanently delete the specified resource from storage.
     *
     * @param int             $id
     * @param CategoryService $service
     *
     * @return RedirectResponse
     */
    public function forceDelete(int $id, CategoryService $service): RedirectResponse
    {
        $service->forceDelete($id);

        return redirect()
            ->route('categories.index')
            ->with('success', 'Category permanently deleted.');
    }
}