<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class DiscountIndexRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'search' => ['nullable', 'string', 'max:255'],
            'type' => ['nullable', 'in:percentage,fixed'],
            'status' => ['nullable', 'in:active,inactive,scheduled,expired'],
            'per_page' => ['nullable', 'integer', 'min:5', 'max:100'],
        ];
    }
}
