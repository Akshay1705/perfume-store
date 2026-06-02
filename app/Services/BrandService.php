<?php

namespace App\Services;

use App\Models\Brand;
use Illuminate\Support\Str;

class BrandService
{
    public function store(array $data): Brand
    {
        return Brand::create([
            'name' => $data['name'],

            'slug' => $data['slug']
                ?: Str::slug($data['name']),
        ]);
    }

    public function update(
        Brand $Brand,
        array $data
    ): Brand {

        $Brand->update([
            'name' => $data['name'],

            'slug' => $data['slug']
                ?: Str::slug($data['name']),
        ]);

        return $Brand;
    }

    public function delete(
        Brand $Brand
    ): void {

        $Brand->delete();
    }
}
