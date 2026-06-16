<?php

namespace App\Repositories\Contracts;

use App\Models\Discount;

interface DiscountRepositoryInterface
{
    public function findByCode(string $code): ?Discount;
}