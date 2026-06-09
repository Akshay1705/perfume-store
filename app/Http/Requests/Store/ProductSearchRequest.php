<?php

namespace App\Http\Requests\Store;

use Illuminate\Foundation\Http\FormRequest;

class ProductSearchRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'search'    => 'nullable|string|max:100',
            'category'  => 'nullable|string',   // 'all' or a real slug — existence checked in service
            'brand'     => 'nullable|string',    // 'all' or a real slug — existence checked in service
            'gender'    => 'nullable|string|in:men,women,unisex,all',
            'volumes'   => 'nullable|array',
            'volumes.*' => 'string',
        ];
    }
}
