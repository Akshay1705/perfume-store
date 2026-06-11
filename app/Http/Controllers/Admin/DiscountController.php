<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\DiscountIndexRequest;
use App\Http\Requests\Admin\DiscountRequest;
use App\Models\Brand;
use App\Models\Category;
use App\Models\Discount;
use App\Models\User;
use App\Services\DiscountService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;

class DiscountController extends Controller
{
    /**
     * @var DiscountService
     */
    private DiscountService $service;

    /**
     * @param DiscountService $service
     */
    public function __construct(DiscountService $service)
    {
        $this->service = $service;
    }

    /**
     * Display a listing of the resource.
     *
     * @param DiscountIndexRequest $request
     *
     * @return Response
     */
    public function index(DiscountIndexRequest $request): Response
    {
        $filters   = $request->validated();
        $discounts = $this->service->getDiscounts($filters);
        $stats     = $this->service->getStats();

        return Inertia::render(
            'Admin/Discounts/Index',
            [
                'discounts'  => $discounts,
                'totalCount' => Discount::count(),
                'stats'      => $stats,
                'filters'    => [
                    'search' => $filters['search'] ?? '',
                    'type'   => $filters['type'] ?? '',
                    'status' => $filters['status'] ?? '',
                ],
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
        $users      = User::select('id', 'name', 'email')->get();
        $brands     = Brand::select('id', 'name')->get();
        $categories = Category::select('id', 'name')->get();

        return Inertia::render(
            'Admin/Discounts/Create',
            [
                'users'      => $users,
                'brands'     => $brands,
                'categories' => $categories,
            ]
        );
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param DiscountRequest $request
     *
     * @return RedirectResponse
     */
    public function store(DiscountRequest $request): RedirectResponse
    {
        try {
            $discount = $this->service->create($request->validated());

            Log::info('Discount created successfully', [
                'discount_id'   => $discount->id,
                'discount_name' => $discount->name,
            ]);

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
     *
     * @param Discount $discount
     *
     * @return Response
     */
    public function edit(Discount $discount): Response
    {
        $discount   = $this->service->getById($discount->id);
        $users      = User::select('id', 'name', 'email')->get();
        $brands     = Brand::select('id', 'name')->get();
        $categories = Category::select('id', 'name')->get();

        return Inertia::render(
            'Admin/Discounts/Edit',
            [
                'discount'   => $discount,
                'users'      => $users,
                'brands'     => $brands,
                'categories' => $categories,
            ]
        );
    }

    /**
     * Update the specified resource in storage.
     *
     * @param DiscountRequest $request
     * @param Discount        $discount
     *
     * @return RedirectResponse
     */
    public function update(DiscountRequest $request, Discount $discount): RedirectResponse
    {
        try {
            $this->service->update($discount, $request->validated());

            Log::info('Discount updated successfully', [
                'discount_id'   => $discount->id,
                'discount_name' => $discount->name,
            ]);

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
     *
     * @param Discount $discount
     *
     * @return RedirectResponse
     */
    public function destroy(Discount $discount): RedirectResponse
    {
        try {
            $discountName = $discount->name;
            $this->service->delete($discount);

            Log::info('Discount deleted successfully', [
                'discount_name' => $discountName,
            ]);

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