<?php

namespace App\Services;

use App\Models\Discount;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use App\Repositories\Contracts\DiscountRepositoryInterface;

class DiscountService
{
    protected DiscountRepositoryInterface $discounts;

    public function __construct(
        DiscountRepositoryInterface $discounts
    ) {
        $this->discounts = $discounts;
    }
    /**
     * Get all discounts with relationships
     */
    public function getAll(): Collection
    {
        return $this->discounts->getAllWithRelations();
    }

    /**
     * Get a single discount by ID
     */
    public function getById(int $id): ?Discount
    {
        return $this->discounts->getByIdWithRelations($id);
    }

    /**
     * Create a new discount
     */
    public function create(array $data): Discount
    {
        return $this->discounts->create($data);
    }

    /**
     * Update an existing discount
     */
    public function update(Discount $discount, array $data): Discount
    {
        $this->discounts->update($discount, $data);
        return $discount;
    }

    /**
     * Delete a discount
     */
    public function delete(Discount $discount): bool
    {
        return $this->discounts->delete($discount);
    }

    /**
     * Get discount statistics
     */
    public function getStats(): array
    {
        return $this->discounts->getStats();
    }

    public function getDiscounts(array $filters): LengthAwarePaginator 
    {
        return $this->discounts->getFilteredDiscounts($filters); 
    }

    public function countDiscounts(): int
    {
        return $this->discounts->countDiscounts();
    }
}
