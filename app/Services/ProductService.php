<?php

namespace App\Services;

use App\Models\Product;
use Illuminate\Support\Str;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class ProductService
{
    public function store(array $data): Product
    {
        return Product::create([
            'name' => $data['name'],
            'slug' => $data['slug'] ?: Str::slug($data['name']),
            'description' => $data['description'],
            'price' => $data['price'],
            'stock' => $data['stock'],
            'volume' => $data['volume'] ?? null,
            'category_id' => $data['category_id'],
            'brand_id' => $data['brand_id'],
            'is_active' => $data['is_active'] ?? true,
        ]);
    }

    public function update(
        Product $product,
        array $data
    ): Product {

        $product->update([
            'name' => $data['name'],
            'slug' => $data['slug'] ?: Str::slug($data['name']),
            'description' => $data['description'],
            'price' => $data['price'],
            'stock' => $data['stock'],
            'volume' => $data['volume'] ?? null,
            'category_id' => $data['category_id'],
            'brand_id' => $data['brand_id'],
            'is_active' => $data['is_active'] ?? true,
        ]);

        return $product;
    }

    public function delete(Product $product): void
    {
        $product->delete();
    }

    public function getProducts(array $filters): LengthAwarePaginator
    {
        return Product::query()
            ->with(['category', 'brand', 'primaryImage'])

            ->when(
                $filters['search'] ?? null,
                fn($query, $search) =>
                $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                        ->orWhere('slug', 'like', "%{$search}%");
                })
            )

            ->when(
                $filters['category'] ?? null,
                fn($query, $category) =>
                $query->where('category_id', $category)
            )

            ->when(
                $filters['brand'] ?? null,
                fn($query, $brand) =>
                $query->where('brand_id', $brand)
            )

            ->when(
                $filters['status'] ?? null,
                function ($query, $status) {

                    if ($status === 'active') {
                        $query->where('is_active', true);
                    }

                    if ($status === 'inactive') {
                        $query->where('is_active', false);
                    }
                }
            )

            ->latest()
            ->paginate($filters['per_page'] ?? 10)
            ->withQueryString();
    }
}
