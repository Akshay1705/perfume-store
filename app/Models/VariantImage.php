<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class VariantImage extends Model
{
    protected $fillable = [
        'product_variant_id',
        'image_path',
        'is_primary',
    ];

    protected $appends = ['url'];

    public function getUrlAttribute()
    {
        return asset('storage/' . $this->image_path);
    }

    public function variant()
    {
        return $this->belongsTo(ProductVariant::class);
    }
}
