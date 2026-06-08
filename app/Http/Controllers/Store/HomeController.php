<?php

namespace App\Http\Controllers\Store;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Inertia\Inertia;
use App\Models\Category;
use App\Models\Brand;

class HomeController extends Controller
{
    public function index()
    {
        $products = Product::with([
            'primaryImage',
            'brand',
            'variants' => fn($q) =>
            $q->where('is_active', true)
        ])
            ->where('is_active', true)
            ->latest()
            ->get();

        return Inertia::render(
            'Store/Home',
            [
                'products' => $products,
                'categories' => Category::orderBy('name')->get(),
                'brands' => Brand::orderBy('name')->get(),
            ]
        );
    }
}
