<?php

namespace App\Http\Middleware;

use App\Models\Brand;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     *
     * @param Request $request
     *
     * @return string|null
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @param Request $request
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth'       => [
                'user' => fn() => $request->user()
                    ? [
                        'id'    => $request->user()->id,
                        'name'  => $request->user()->name,
                        'email' => $request->user()->email,
                    ]
                    : null,
            ],
            'csrf_token' => csrf_token(),
            'flash'      => [
                'success' => session()->get('success'),
                'error'   => session()->get('error'),
            ],
            'categories' => fn() =>Category::orderBy('name')->get(),
            'brands' => fn() =>Brand::orderBy('name')->get(),
            'cartCount' => function ()
            {
                if (!Auth::check()) {return 0;}

                /** @var \App\Models\User $user */
                $user = Auth::user();

                return $user->cartCount();
            },
        ];
    }
}