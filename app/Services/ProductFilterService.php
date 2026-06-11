<?php

namespace App\Services;

use App\Models\Product;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class ProductFilterService
{
    /**
     * Get a filtered query builder for active products.
     *
     * @param array $filters
     *
     * @return Builder
     */
    public function getFilteredProductsQuery(array $filters): Builder
    {
        $search   = $filters['search']   ?? null;
        $category = $filters['category'] ?? null;
        $brand    = $filters['brand']    ?? null;
        $gender   = $filters['gender']   ?? null;
        $volumes  = $filters['volumes']  ?? [];

        $query = Product::where('is_active', true)
            ->whereHas('variants', function ($q) use ($volumes) {
                $q->where('is_active', true);

                if (!empty($volumes)) {
                    $q->whereIn('volume', $volumes);
                }
            });

        if (!empty($search)) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhereHas('brand', function ($bQ) use ($search) {
                        $bQ->where('name', 'like', "%{$search}%");
                    });
            });
        }

        if (!empty($category) && $category !== 'all') {
            $query->whereHas('category', function ($q) use ($category) {
                $q->where('slug', $category);
            });
        }

        if (!empty($brand) && $brand !== 'all') {
            $query->whereHas('brand', function ($q) use ($brand) {
                $q->where('slug', $brand);
            });
        }

        if (!empty($gender) && $gender !== 'all') {
            $query->where('gender', $gender);
        }

        if (!empty($volumes)) {
            $query->whereHas('variants', function ($q) use ($volumes) {
                $q->where('is_active', true)
                    ->whereIn('volume', $volumes);
            });
        }

        return $query->with([
            'brand',
            'category',
            'variants' => function ($q) use ($volumes) {
                $q->where('is_active', true);

                if (!empty($volumes)) {
                    $q->whereIn('volume', $volumes);
                }

                $q->with('images')->orderBy('price', 'asc');
            },
        ]);
    }

    /**
     * Get paginated filtered products.
     *
     * @param array $filters
     * @param int   $perPage
     *
     * @return LengthAwarePaginator
     */
    public function getPaginatedProducts(array $filters, int $perPage = 12): LengthAwarePaginator
    {
        return $this->getFilteredProductsQuery($filters)
            ->paginate($perPage)
            ->withQueryString();
    }
}