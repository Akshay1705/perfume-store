<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Category;
use App\Http\Requests\Admin\CategoryRequest;
use App\Services\CategoryService;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
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
     */
    public function create(): Response
    {
        return Inertia::render(
            'Admin/Categories/Create'
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CategoryRequest $request,CategoryService $service) 
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
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Category $category): Response {
        return Inertia::render(
            'Admin/Categories/Edit',
            [
                'category' => $category,
            ]
        );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(CategoryRequest $request,Category $category,CategoryService $service) {
        $service->update($category,$request->validated());
        return redirect()
            ->route('categories.index')
            ->with(
                'success',
                'Category updated successfully.'
            );
    }

    public function destroy(Category $category,CategoryService $service) {
        $service->delete($category);
        return redirect()
            ->route('categories.index')
            ->with(
                'success',
                'Category deleted successfully.'
            );
    }

    /**
     * restore the specified resource from soft deletion.
     */
    public function restore(int $id, CategoryService $service){
        $service->restore($id);
        return redirect()
            ->route('categories.index')
            ->with('success', 'Category restored successfully.');
    }

    /**
     * Permanently delete the specified resource from storage.
     */
    public function forceDelete(int $id, CategoryService $service)
    {
        $service->forceDelete($id);
        return redirect()
            ->route('categories.index')
            ->with('success', 'Category permanently deleted.');
    }

}
