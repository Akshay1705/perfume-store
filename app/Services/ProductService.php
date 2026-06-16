<?php

namespace App\Services;

use App\Models\Product;
use Illuminate\Support\Str;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use App\Repositories\Contracts\ProductRepositoryInterface;

class ProductService
{
    protected ProductRepositoryInterface $products;

    public function __construct(ProductRepositoryInterface $products) {
        $this->products = $products;
    }
    /**
     * Store a newly created product with its variants.
     *
     * @param array $data
     *
     * @return Product
     */
    public function store(array $data): Product
    {
        $product = $this->products->create([
            'name'        => $data['name'],
            'slug'        => $data['slug'] ?: Str::slug($data['name']),
            'description' => $data['description'],
            'gender'      => $data['gender'],
            'category_id' => $data['category_id'],
            'brand_id'    => $data['brand_id'],
            'is_active'   => $data['is_active'] ?? true,
        ]);

        foreach ($data['variants'] as $variant) {
            $product->variants()->create([
                'volume'    => $variant['volume'],
                'price'     => $variant['price'],
                'stock'     => $variant['stock'],
                'sku'       => strtoupper(str_replace(' ', '', $product->name)) . '-' . strtoupper($variant['volume']),
                'is_active' => $variant['is_active'] ?? true,
            ]);
        }

        return $product;
    }

    /**
     * Update an existing product and sync its variants.
     *
     * @param Product $product
     * @param array   $data
     *
     * @return Product
     */
    public function update(Product $product, array $data): Product
    {
        $this->products->update(
            $product,
            [
                'name'        => $data['name'],
                'slug'        => $data['slug'] ?: Str::slug($data['name']),
                'description' => $data['description'],
                'gender'      => $data['gender'],
                'category_id' => $data['category_id'],
                'brand_id'    => $data['brand_id'],
                'is_active'   => $data['is_active'] ?? true,
            ]
        );

        $existingIds = [];

        foreach ($data['variants'] as $variantData) {
            if (!empty($variantData['id'])) {
                $variant = $product->variants()->find($variantData['id']);

                if ($variant) {
                    $variant->update([
                        'volume'    => $variantData['volume'],
                        'price'     => $variantData['price'],
                        'stock'     => $variantData['stock'],
                        'is_active' => $variantData['is_active'],
                    ]);

                    $existingIds[] = $variant->id;
                }
            } else {
                $newVariant = $product->variants()->create([
                    'volume'    => $variantData['volume'],
                    'price'     => $variantData['price'],
                    'stock'     => $variantData['stock'],
                    'sku'       => strtoupper(str_replace(' ', '', $product->name)) . '-' . strtoupper($variantData['volume']),
                    'is_active' => $variantData['is_active'],
                ]);

                $existingIds[] = $newVariant->id;
            }
        }

        $product->variants()
            ->whereNotIn('id', $existingIds)
            ->delete();

        return $product;
    }

    /**
     * Delete the given product.
     *
     * @param Product $product
     *
     * @return void
     */
    public function delete(Product $product): void
    {
        $this->products->delete($product);
    }

    /**
     * Get a paginated list of products with optional filters.
     *
     * @param array $filters
     *
     * @return LengthAwarePaginator
     */
    public function getProducts(array $filters): LengthAwarePaginator {
        return $this->products->getFilteredProducts($filters);
    }
}