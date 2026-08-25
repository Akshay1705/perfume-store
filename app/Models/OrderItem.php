<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class OrderItem extends Model
{
    protected $fillable = [
        'order_id',
        'product_variant_id',
        'quantity',
        'unit_price',
        // Snapshot fields
        'product_name',
        'brand_name',
        'variant_name',
        'sku',
        'image',
    ];

    protected $casts = [
        'unit_price' => 'decimal:2',
    ];

    protected $appends = ['is_available', 'unavailable_reason'];

    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class);
    }

    public function variant(): BelongsTo
    {
        return $this->belongsTo(
            ProductVariant::class,
            'product_variant_id' 
        );
    }

    public function getIsAvailableAttribute(): bool
    {
        return $this->unavailable_reason === null;
    }

    public function getUnavailableReasonAttribute(): ?string
    {
        $variant = $this->variant;

        if (!$variant || $variant->trashed()) {
            return 'deleted';
        }

        if (!$variant->is_active) {
            return 'inactive';
        }

        $product = $variant->product;

        if (!$product || $product->trashed()) {
            return 'deleted';
        }

        if ($variant->stock < $this->quantity) {
            return 'out_of_stock';
        }

        return null;
    }
}
