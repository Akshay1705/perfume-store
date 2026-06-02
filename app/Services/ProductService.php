<?php

namespace App\Services;

use App\Models\Product;
use Illuminate\Support\Str;

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
}
