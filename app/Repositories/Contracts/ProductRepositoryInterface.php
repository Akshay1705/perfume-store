<?php

namespace App\Repositories\Contracts;

use App\Models\Product;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

interface ProductRepositoryInterface
{
    public function find(int $id): ?Product;

    public function create(array $data): Product;

    public function update(Product $product,array $data): bool;

    public function delete(Product $product): bool;

    public function countProducts(): int;

    public function getLowStockProducts(int $limit = 10): Collection;

    public function getFilteredProducts(array $filters): LengthAwarePaginator;

    public function findBySlug(string $slug): Product;

    public function findForEdit(int $id): Product;
}