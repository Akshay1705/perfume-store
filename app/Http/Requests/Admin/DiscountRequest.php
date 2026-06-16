<?php

namespace App\Http\Requests\Admin;

use App\Enums\DiscountTargetType;
use App\Enums\DiscountType;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class DiscountRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Prepare the data for validation before checking rules.
     * This ensures 'is_active' checkbox boolean data is parsed correctly.
     */
    protected function prepareForValidation(): void
    {
        if ($this->has('is_active')) {
            $this->merge([
                'is_active' => filter_var($this->is_active, FILTER_VALIDATE_BOOLEAN),
            ]);
        }
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        $discountParam = $this->route('discount');
        $discountId = is_object($discountParam) ? $discountParam->id : $discountParam;

        return [
            'name' => 'required|string|max:255',

            'code' => [
                'required',
                'string',
                'max:50',
                Rule::unique('discounts', 'code')
                    ->ignore($discountId),
            ],

            'type' => 'required|in:' .
                implode(',', [
                    DiscountType::PERCENTAGE->value,
                    DiscountType::FIXED->value,
                ]),

            'value' => [
                'required',
                'numeric',
                'min:1',
                Rule::when(
                    $this->type === DiscountType::PERCENTAGE->value,
                    ['max:100']
                ),
            ],

            'target_type' => 'required|in:' .
                implode(',', [
                    DiscountTargetType::ALL->value,
                    DiscountTargetType::USER->value,
                    DiscountTargetType::BRAND->value,
                    DiscountTargetType::CATEGORY->value,
                ]),

            'user_id' => [
                'required_if:target_type,user',
                'nullable',
                'exists:users,id',
            ],

            'brand_id' => [
                'required_if:target_type,brand',
                'nullable',
                'exists:brands,id',
            ],

            'category_id' => [
                'required_if:target_type,category',
                'nullable',
                'exists:categories,id',
            ],

            'min_order_amount' => 'nullable|numeric|min:1000',

            'starts_at' => 'nullable|date',

            'ends_at' => 'nullable|date|after:starts_at',

            'is_active' => 'boolean',
        ];
    }

    /**
     * Get custom messages for validator errors.
     */
    public function messages(): array
    {
        return [
            'name.required' => 'Discount name is required',
            'code.unique' => 'This discount code already exists',
            'type.required' => 'Discount type is required',
            'value.required' => 'Discount value is required',
            'target_type.required' => 'Target type is required',
            'ends_at.after' => 'End date must be after start date',
        ];
    }
}
