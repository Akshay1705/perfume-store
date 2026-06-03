<?php

namespace App\Services;

use App\Models\Discount;
use Illuminate\Database\Eloquent\Collection;

class DiscountService
{
    /**
     * Get all discounts with relationships
     */
    public function getAll(): Collection
    {
        return Discount::with(['user', 'brand', 'category'])
            ->latest()
            ->get();
    }

    /**
     * Get a single discount by ID
     */
    public function getById(int $id): ?Discount
    {
        return Discount::with(['user', 'brand', 'category'])
            ->find($id);
    }

    /**
     * Create a new discount
     */
    public function create(array $data): Discount
    {
        return Discount::create($data);
    }

    /**
     * Update an existing discount
     */
    public function update(Discount $discount, array $data): Discount
    {
        $discount->update($data);
        return $discount;
    }

    /**
     * Delete a discount
     */
    public function delete(Discount $discount): bool
    {
        return $discount->delete();
    }

    /**
     * Get discount statistics
     */
    public function getStats(): array
    {
        return [
            'total' => Discount::count(),
            'active' => Discount::where('is_active', true)->count(),
            'inactive' => Discount::where('is_active', false)->count(),
            'by_type' => [
                'percentage' => Discount::where('type', 'percentage')->count(),
                'fixed' => Discount::where('type', 'fixed')->count(),
            ],
        ];
    }
}
