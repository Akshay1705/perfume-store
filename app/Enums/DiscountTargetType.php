<?php

namespace App\Enums;

enum DiscountTargetType: string
{
    case ALL = 'all';
    case USER = 'user';
    case BRAND = 'brand';
    case CATEGORY = 'category';
}