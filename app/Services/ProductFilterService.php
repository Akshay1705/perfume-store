<?php

namespace App\Services;

use App\Models\Product;
use Illuminate\Database\Eloquent\Builder;

class ProductFilterService
{
    /**
     * Build the filtered Eloquent query based on incoming parameters.
     */
    public function getFilteredProductsQuery(array $filters): Builder
    {
        // Start with products that have at least one active variant
        $query = Product::where('is_active', true)
            ->whereHas('variants', function ($q) {
                $q->where('is_active', true);
            });

        // 1. Text Search Filter (Matches product name or brand name)
        if (!empty($filters['search'])) {
            $search = $filters['search'];
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhereHas('brand', function ($bQ) use ($search) {
                        $bQ->where('name', 'like', "%{$search}%");
                    });
            });
        }

        // 2. Category Slug Filter
        if (!empty($filters['category'])) {
            $query->whereHas('category', function ($q) use ($filters) {
                $q->where('slug', $filters['category']);
            });
        }

        // 3. Brand Slug Filter
        if (!empty($filters['brand'])) {
            $query->whereHas('brand', function ($q) use ($filters) {
                $q->where('slug', $filters['brand']);
            });
        }

        // 4. Gender Filter
        if (!empty($filters['gender'])) {
            $query->where('gender', $filters['gender']);
        }

        // 5. Variant Volume Multi-Select Filter
        if (!empty($filters['volumes'])) {
            $query->whereHas('variants', function ($q) use ($filters) {
                $q->where('is_active', true)
                    ->whereIn('volume', $filters['volumes']);
            });
        }

        // Always eager load relational data cleanly with sorted variants
        return $query->with([
            'brand',
            'category',
            'variants' => function ($q) use ($filters) {
                $q->where('is_active', true);

                // If specific volumes are selected, filter the loaded sub-variants too
                if (!empty($filters['volumes'])) {
                    $q->whereIn('volume', $filters['volumes']);
                }

                $q->with('images')->orderBy('price', 'asc');
            }
        ]);
    }
}
