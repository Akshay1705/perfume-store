<?php

namespace App\Enums;

enum OrderStatus: string
{
    case CART = 'cart';
    case PLACED = 'placed';
    case PROCESSING = 'processing';
    case SHIPPED = 'shipped';
    case DELIVERED = 'delivered';
    case CANCELLED = 'cancelled';
    case RETURNED = 'returned';
}