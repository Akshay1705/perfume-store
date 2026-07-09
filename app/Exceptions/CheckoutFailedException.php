<?php

namespace App\Exceptions;

use Throwable;

class CheckoutFailedException extends CheckoutException
{
    public function __construct(
        string $message = "We couldn't complete your order. Please try again later.",
        int $code = 0,
        ?Throwable $previous = null
    ) {
        parent::__construct($message, $code, $previous);
    }
}