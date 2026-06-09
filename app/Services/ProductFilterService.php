<?php

namespace App\Services;

use App\Models\Product;
use Illuminate\Database\Eloquent\Builder;

class ProductFilterService
{
    public function getFilteredProductsQuery(array $filters): Builder
    {
        $search   = $filters['search']   ?? null;
        $category = $filters['category'] ?? null;
        $brand    = $filters['brand']    ?? null;
        $gender   = $filters['gender']   ?? null;
        $volumes  = $filters['volumes']  ?? [];

        // Start with active products that have at least one active variant
        $query = Product::where('is_active', true)
            ->whereHas('variants', function ($q) use ($volumes) {
                $q->where('is_active', true);

                if (!empty($volumes)) {
                    $q->whereIn('volume', $volumes);
                }
            });

        // 1. Text Search Filter
        if (!empty($search)) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhereHas('brand', function ($bQ) use ($search) {
                        $bQ->where('name', 'like', "%{$search}%");
                    });
            });
        }

        // 2. Category Slug Filter — ignore 'all' sentinel value
        if (!empty($category) && $category !== 'all') {
            $query->whereHas('category', function ($q) use ($category) {
                $q->where('slug', $category);
            });
        }

        // 3. Brand Slug Filter — ignore 'all' sentinel value
        if (!empty($brand) && $brand !== 'all') {
            $query->whereHas('brand', function ($q) use ($brand) {
                $q->where('slug', $brand);
            });
        }

        // 4. Gender Filter — ignore 'all' sentinel value
        if (!empty($gender) && $gender !== 'all') {
            $query->where('gender', $gender);
        }

        // 5. Volume Multi-Select Filter
        if (!empty($volumes)) {
            $query->whereHas('variants', function ($q) use ($volumes) {
                $q->where('is_active', true)
                    ->whereIn('volume', $volumes);
            });
        }

        // Eager load with volume-filtered variants
        return $query->with([
            'brand',
            'category',
            'variants' => function ($q) use ($volumes) {
                $q->where('is_active', true);

                if (!empty($volumes)) {
                    $q->whereIn('volume', $volumes);
                }

                $q->with('images')->orderBy('price', 'asc');
            }
        ]);
    }
}
