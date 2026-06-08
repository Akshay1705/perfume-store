<?php

namespace App\Http\Requests\Store;

use Illuminate\Foundation\Http\FormRequest;

class ProductSearchRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // Allow public store customers to use filters
    }

    public function rules(): array
    {
        return [
            'search'   => 'nullable|string|max:100',
            'category' => 'nullable|string|exists:categories,slug', // Filtering by slug makes URLs look clean!
            'brand'    => 'nullable|string|exists:brands,slug',
            'gender'   => 'nullable|string|in:men,women,unisex',
            'volumes'  => 'nullable|array',
            'volumes.*' => 'string'
        ];
    }
}
