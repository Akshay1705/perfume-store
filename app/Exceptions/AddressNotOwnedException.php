<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class AddressNotOwnedException extends Exception
{
    public function __construct(string $message = 'This address does not belong to you.')
    {
        parent::__construct($message);
    }

    /**
     * Render the exception into an HTTP response.
     */
    public function render(Request $request): RedirectResponse
    {
        return back()->withErrors([
            'error' => $this->getMessage(),
        ]);
    }
}