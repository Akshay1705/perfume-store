<?php

namespace App\Repositories;

use App\Models\Product;
use App\Models\ProductVariant;
use App\Repositories\Contracts\ProductRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;

class ProductRepository extends BaseRepository
implements ProductRepositoryInterface
{
    public function __construct(Product $product){
        parent::__construct($product);
    }

    public function countProducts(): int{
        return Product::count();
    }

    public function getLowStockProducts(int $limit = 5): Collection{
        return ProductVariant::with('product','primaryImage')
            ->where('stock', '>', 0)
            ->where('stock', '<=', 10)
            ->orderBy('stock')
            ->take($limit)
            ->get();
    }

    public function findForEdit(int $id): Product {
        return Product::with([
            'category',
            'brand',
            'variants' => function ($q) {
                $q->with(['images','primaryImage',]);
            },
        ])->findOrFail($id);
    }

    public function getFilteredProducts(array $filters): LengthAwarePaginator
    {
        $status = $filters['status'] ?? null;

        $query = Product::query()
            ->with([
                'category',
                'brand',
                'variants' => fn($q) => $q->with('images')->orderBy('id'),
            ]);

        // If viewing deleted products, scope to trashed only
        if ($status === 'deleted') {
            $query->onlyTrashed();
        }

        return $query
            ->when(
                $filters['search'] ?? null,
                fn($q, $search) => $q->where(function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                        ->orWhere('slug', 'like', "%{$search}%");
                })
            )
            ->when(
                $filters['category'] ?? null,
                fn($q, $category) => $q->where('category_id', $category)
            )
            ->when(
                $filters['brand'] ?? null,
                fn($q, $brand) => $q->where('brand_id', $brand)
            )
            ->when(
                $filters['gender'] ?? null,
                fn($q, $gender) => $q->where('gender', $gender)
            )
            ->when(
                $status && $status !== 'deleted',
                function ($q) use ($status) {
                    if ($status === 'active') $q->where('is_active', true);
                    if ($status === 'inactive') $q->where('is_active', false);
                }
            )
            ->latest()
            ->paginate($filters['per_page'] ?? 10)
            ->withQueryString();
    }

    public function findBySlug(string $slug): Product{
        return Product::where('slug', $slug)
            ->where('is_active', true)
            ->with([
                'brand',
                'category',
                'variants' => function ($q) {
                    $q->where('is_active', true)
                        ->with('images')
                        ->orderBy('id');
                },
            ])
            ->firstOrFail();
    }
}