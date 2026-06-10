<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\VariantImage;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class ProductVariant extends Model
{
    protected $fillable = [
        'product_id',
        'volume',
        'price',
        'stock',
        'sku',
        'is_active',
    ];

    protected $casts = [
        'price' => 'decimal:2',
    ];

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }


    public function images(): HasMany
    {
        return $this->hasMany(VariantImage::class);
    }

    public function primaryImage(): HasOne
    {
        return $this->hasOne(VariantImage::class)
            ->where('is_primary', true);
    }

    public function orderItems(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }
}
