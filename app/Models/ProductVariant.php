<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\VariantImage;

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

    public function product()
    {
        return $this->belongsTo(Product::class);
    }


    public function images()
    {
        return $this->hasMany(VariantImage::class);
    }

    public function primaryImage()
    {
        return $this->hasOne(VariantImage::class)
            ->where('is_primary', true);
    }
}
