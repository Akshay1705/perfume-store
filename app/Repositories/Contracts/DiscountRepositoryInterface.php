<?php

namespace App\Repositories\Contracts;

use App\Models\Discount;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

interface DiscountRepositoryInterface
extends BaseRepositoryInterface
{
    public function findByCode(string $code): ?Discount;

    public function countDiscounts(): int;

    public function getAllWithRelations(): Collection;

    public function getByIdWithRelations(int $id): ?Discount;

    public function getFilteredDiscounts(array $filters): LengthAwarePaginator;

    public function getStats(): array;
}