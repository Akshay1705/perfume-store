<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

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
        // Safe resolution of the discount ID parameter for unique checks
        $discountParam = $this->route('discount');
        $discountId = is_object($discountParam) ? $discountParam->id : $discountParam;

        return [
            'name' => 'required|string|max:255',
            'code' => 'nullable|string|max:255|unique:discounts,code,' . $discountId,
            'type' => 'required|in:percentage,fixed',
            'value' => 'required|numeric|min:0.01|max:99999.99',
            'target_type' => 'required|in:all,user,brand,category',
            'user_id' => 'nullable|exists:users,id',
            'brand_id' => 'nullable|exists:brands,id',
            'category_id' => 'nullable|exists:categories,id',
            'min_order_amount' => 'nullable|numeric|min:0',
            'starts_at' => 'nullable|date',
            'ends_at' => 'nullable|date|after_or_equal:starts_at',
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
            'ends_at.after_or_equal' => 'End date must be after start date',
        ];
    }
}
