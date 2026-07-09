<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;

class BaseController extends Controller
{
    /**
     * Redirect to a route with a success flash message.
     */
    protected function redirectSuccess(string $route, string $message): RedirectResponse
    {
        return redirect($route)
            ->with('success', $message);
    }

    /**
     * Redirect back with an error message.
     */
    protected function redirectError(string $message): RedirectResponse
    {
        return back()
            ->withErrors([
                'error' => $message,
            ]);
    }
}