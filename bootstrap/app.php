<?php

use Illuminate\Auth\AuthenticationException;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->web(append: [
            \App\Http\Middleware\HandleInertiaRequests::class,
            \Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets::class,
        ]);

    $middleware->validateCsrfTokens(except: [
        'stripe/webhook',
    ]);

    $middleware->alias([
        'admin' => \App\Http\Middleware\AdminMiddleware::class,
    ]);
    
    })

    ->withExceptions(function (Exceptions $exceptions): void {
        $exceptions->render(function (AuthenticationException $e, Request $request) {
            return redirect()->guest(route('login'));
        });

        $exceptions->render(function (Throwable $e, Request $request) {
            // Let Laravel handle validation errors normally (per-field messages)
            if ($e instanceof \Illuminate\Validation\ValidationException) {
                return null;
            }

            report($e);

            return back()->withErrors([
                'error' => 'Something went wrong. Please try again later.',
            ]);
        });
    })->create();
