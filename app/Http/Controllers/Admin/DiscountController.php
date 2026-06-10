<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Discount;
use App\Models\User;
use App\Models\Brand;
use App\Models\Category;
use App\Http\Requests\Admin\DiscountRequest;
use App\Services\DiscountService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Log;
use App\Http\Requests\Admin\DiscountIndexRequest;

class DiscountController extends Controller
{
    private DiscountService $service;

    public function __construct(DiscountService $service)
    {
        $this->service = $service;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(DiscountIndexRequest $request): Response 
    {
        $filters = $request->validated();
        $discounts = $this->service->getDiscounts($filters);
        $stats = $this->service->getStats();

        return Inertia::render(
            'Admin/Discounts/Index',
            [
                'discounts' => $discounts,
                'totalCount' => \App\Models\Discount::count(), // always unfiltered
                'stats' => $stats,
                'filters' => [
                    'search' => $filters['search'] ?? '',
                    'type' => $filters['type'] ?? '',
                    'status' => $filters['status'] ?? '',
                ],
            ]
        );
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        $users = User::select('id', 'name', 'email')->get();
        $brands = Brand::select('id', 'name')->get();
        $categories = Category::select('id', 'name')->get();

        return Inertia::render(
            'Admin/Discounts/Create',
            [
                'users' => $users,
                'brands' => $brands,
                'categories' => $categories,
            ]
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(DiscountRequest $request): RedirectResponse
    {
        try {
            $discount = $this->service->create($request->validated());

            Log::info('Discount created successfully', [
                'discount_id' => $discount->id,
                'discount_name' => $discount->name,
            ]);

            // 🌟 FIXED: Removed 'admin.' to match category/brand behavior
            return redirect()
                ->route('discounts.index')
                ->with('success', 'Discount created successfully');
        } catch (\Exception $e) {
            Log::error('Failed to create discount: ' . $e->getMessage());
            return redirect()
                ->back()
                ->withInput()
                ->withErrors(['error' => 'Failed to create discount']);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Discount $discount): Response
    {
        $discount = $this->service->getById($discount->id);
        $users = User::select('id', 'name', 'email')->get();
        $brands = Brand::select('id', 'name')->get();
        $categories = Category::select('id', 'name')->get();

        return Inertia::render(
            'Admin/Discounts/Edit',
            [
                'discount' => $discount,
                'users' => $users,
                'brands' => $brands,
                'categories' => $categories,
            ]
        );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(DiscountRequest $request, Discount $discount): RedirectResponse
    {
        try {
            $this->service->update($discount, $request->validated());

            Log::info('Discount updated successfully', [
                'discount_id' => $discount->id,
                'discount_name' => $discount->name,
            ]);

            // 🌟 FIXED: Removed 'admin.' to match category/brand behavior
            return redirect()
                ->route('discounts.index')
                ->with('success', 'Discount updated successfully');
        } catch (\Exception $e) {
            Log::error('Failed to update discount: ' . $e->getMessage());
            return redirect()
                ->back()
                ->withInput()
                ->withErrors(['error' => 'Failed to update discount']);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Discount $discount): RedirectResponse
    {
        try {
            $discountName = $discount->name;
            $this->service->delete($discount);

            Log::info('Discount deleted successfully', [
                'discount_name' => $discountName,
            ]);

            // 🌟 FIXED: Removed 'admin.' to match category/brand behavior
            return redirect()
                ->route('discounts.index')
                ->with('success', 'Discount deleted successfully');
        } catch (\Exception $e) {
            Log::error('Failed to delete discount: ' . $e->getMessage());
            return redirect()
                ->back()
                ->withErrors(['error' => 'Failed to delete discount']);
        }
    }
}
