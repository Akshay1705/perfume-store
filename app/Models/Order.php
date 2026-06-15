<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Builder;
use App\Enums\OrderStatus;

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
            OrderStatus::CART->value,
        );
    }

    public function scopePlaced(Builder $query): Builder
    {
        return $query->where(
            'status',
            OrderStatus::PLACED->value,
        );
    }

    public function scopeProcessing(Builder $query)
    {
        return $query->where(
            'status',
            OrderStatus::PROCESSING->value,
        );
    }

    public function scopeShipped(Builder $query)
    {
        return $query->where(
            'status',
            OrderStatus::SHIPPED->value,
        );
    }

    public function scopeDelivered(Builder $query)
    {
        return $query->where(
            'status',
            OrderStatus::DELIVERED->value,
        );
    }

    public static function statuses(): array
    {
        return array_map(
            fn($status) => $status->value,
            [
                OrderStatus::PLACED,
                OrderStatus::PROCESSING,
                OrderStatus::SHIPPED,
                OrderStatus::DELIVERED,
                OrderStatus::CANCELLED,
                OrderStatus::RETURNED,
            ]
        );
    }
}
