<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Users
        \App\Models\User::create([
            'name'     => 'Admin User',
            'email'    => 'admin@perfume.com',
            'password' => bcrypt('password'),
            'role'     => 'admin',
        ]);

        \App\Models\User::create([
            'name'     => 'Test Customer',
            'email'    => 'customer@perfume.com',
            'password' => bcrypt('password'),
            'role'     => 'customer',
        ]);

        // Categories
        $categories = ['Perfume', 'Attar', 'Deo', 'Discovery Set', 'Gift Set'];
        foreach ($categories as $cat) {
            \App\Models\Category::create([
                'name' => $cat,
                'slug' => \Illuminate\Support\Str::slug($cat),
            ]);
        }

        // Brands
        $brands = ['Lattafa', 'Ajmal', 'Afnan', 'Dior', 'Rasasi'];
        foreach ($brands as $brand) {
            \App\Models\Brand::create([
                'name' => $brand,
                'slug' => \Illuminate\Support\Str::slug($brand),
            ]);
        }

        // Products
        $products = [
            [
                'name'        => 'Lattafa Khamrah',
                'slug'        => 'lattafa-khamrah',
                'description' => 'A rich oriental fragrance with oud and vanilla.',
                'price'       => 1999.00,
                'stock'       => 50,
                'volume'      => '100ml',
                'category_id' => 1,
                'brand_id'    => 1,
            ],
            [
                'name'        => 'Dior Sauvage',
                'slug'        => 'dior-sauvage',
                'description' => 'Fresh and raw with bergamot and ambroxan.',
                'price'       => 8999.00,
                'stock'       => 30,
                'volume'      => '100ml',
                'category_id' => 1,
                'brand_id'    => 4,
            ],
            [
                'name'        => 'Ajmal Amber Wood',
                'slug'        => 'ajmal-amber-wood',
                'description' => 'Warm woody amber with a touch of musk.',
                'price'       => 2499.00,
                'stock'       => 40,
                'volume'      => '50ml',
                'category_id' => 2,
                'brand_id'    => 2,
            ],
            [
                'name'        => 'Afnan 9PM',
                'slug'        => 'afnan-9pm',
                'description' => 'A seductive evening fragrance with spicy notes.',
                'price'       => 2999.00,
                'stock'       => 25,
                'volume'      => '100ml',
                'category_id' => 1,
                'brand_id'    => 3,
            ],
        ];

        foreach ($products as $product) {
            \App\Models\Product::create($product);
        }
    }
}
