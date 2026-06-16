<?php

namespace App\Repositories;

use App\Models\Discount;
use App\Repositories\Contracts\DiscountRepositoryInterface;

class DiscountRepository
implements DiscountRepositoryInterface
{
    public function findByCode(string $code): ?Discount
    {
        return Discount::where('code',strtoupper(trim($code)))->first();
    }
}