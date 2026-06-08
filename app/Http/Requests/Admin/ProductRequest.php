<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProductRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $productId = $this->route('product')?->id;

        return [
            'name' => [
                'required',
                'string',
                'max:255',
            ],

            'slug' => [
                'required',
                'string',
                'max:255',

                Rule::unique('products', 'slug')
                    ->ignore($productId),
            ],

            'description' => [
                'required',
                'string',
            ],

            'gender' => [
                'required',
                'in:men,women,unisex'
            ],

            'category_id' => [
                'required',
                'exists:categories,id',
            ],

            'brand_id' => [
                'required',
                'exists:brands,id',
            ],

            'is_active' => [
                'boolean',
            ],

            'variants' => 'required|array|min:1',
            'variants.*.id' => 'sometimes|exists:product_variants,id',
            'variants.*.volume' => 'required|string|max:100',
            'variants.*.price' => 'required|numeric|min:0',
            'variants.*.stock' => 'required|integer|min:0',
            'variants.*.is_active' => [
                'required',
                'boolean',
            ],
        ];
    }
}
