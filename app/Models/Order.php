<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Builder;

class Order extends Model
{
    public const STATUS_CART = 'cart';
    public const STATUS_PLACED = 'placed';
    public const STATUS_PROCESSING = 'processing';
    public const STATUS_SHIPPED = 'shipped';
    public const STATUS_DELIVERED = 'delivered';
    public const STATUS_CANCELLED = 'cancelled';
    public const STATUS_RETURNED = 'returned';

    protected $fillable = [
        'user_id',
        'address_id',
        'status',
        'subtotal',
        'discount_id',
        'discount_amount',
        'total',
        'placed_at',
        'coupon_code',
        'coupon_name',
    ];

    protected $casts = [
        'subtotal' => 'decimal:2',
        'discount_amount' => 'decimal:2',
        'total' => 'decimal:2',
        'placed_at' => 'datetime',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function items(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }

    public function address(): BelongsTo
    {
        return $this->belongsTo(Address::class);
    }

    public function discount(): BelongsTo
    {
        return $this->belongsTo(Discount::class);
    }

    public function scopeCart(Builder $query): Builder
    {
        return $query->where(
            'status',
            self::STATUS_CART,
        );
    }

    public function scopePlaced(Builder $query): Builder
    {
        return $query->where(
            'status',
            self::STATUS_PLACED,
        );
    }

    public function scopeProcessing(Builder $query)
    {
        return $query->where(
            'status',
            self::STATUS_PROCESSING,
        );
    }

    public function scopeShipped(Builder $query)
    {
        return $query->where(
            'status',
            self::STATUS_SHIPPED,
        );
    }

    public function scopeDelivered(Builder $query)
    {
        return $query->where(
            'status',
            self::STATUS_DELIVERED,
        );
    }

    public static function statuses(): array
    {
        return [
            self::STATUS_PLACED,
            self::STATUS_PROCESSING,
            self::STATUS_SHIPPED,
            self::STATUS_DELIVERED,
            self::STATUS_CANCELLED,
            self::STATUS_RETURNED,
        ];
    }
}
