<?php

namespace App\Repositories\Contracts;

use App\Models\Discount;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

interface DiscountRepositoryInterface
{
    public function findByCode(string $code): ?Discount;

    public function find(int $id): ?Discount;

    public function create(array $data): Discount;

    public function update(Discount $discount, array $data): bool;

    public function delete(Discount $discount): bool;

    public function countDiscounts(): int;

    public function getAllWithRelations(): Collection;

    public function getByIdWithRelations(int $id): ?Discount;

    public function getFilteredDiscounts(array $filters): LengthAwarePaginator;

    public function getStats(): array;
}