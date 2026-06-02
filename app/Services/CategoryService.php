<?php

namespace App\Services;

use App\Models\Category;
use Illuminate\Support\Str;

class CategoryService
{
    public function store(array $data): Category
    {
        return Category::create([
            'name' => $data['name'],

            'slug' => $data['slug']
                ?: Str::slug($data['name']),
        ]);
    }

    public function update(
        Category $category,
        array $data
    ): Category {

        $category->update([
            'name' => $data['name'],

            'slug' => $data['slug']
                ?: Str::slug($data['name']),
        ]);

        return $category;
    }

    public function delete(
        Category $category
    ): void {

        $category->delete();
    }
}
