<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\BrandController;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Admin\ProductImageController;
use App\Http\Controllers\Admin\DiscountController;
use App\Http\Controllers\Store\HomeController;
use App\Http\Controllers\Store\ProductController as StoreProductController;
use App\Http\Controllers\Admin\VariantImageController;


// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

Route::get('/', [HomeController::class, 'index'])
    ->name('home');

Route::get('/products/{product:slug}', [StoreProductController::class, 'show'])
    ->name('products.show');

Route::get('/products', [StoreProductController::class, 'index'])->name('store.products');


// Serve product images - must be before the storage symlink
Route::get('/storage/products/{filename}', function ($filename) {
    $path = storage_path('app/public/products/' . $filename);
    
    if (!file_exists($path)) {
        abort(404);
    }
    
    // Validate filename to prevent directory traversal
    if (basename($path) !== $filename) {
        abort(403);
    }
    
    return response()->file($path, [
        'Content-Type' => mime_content_type($path) ?: 'application/octet-stream',
        'Cache-Control' => 'public, max-age=31536000',
    ]);
})->name('storage.product-image');

Route::middleware(['auth', 'admin'])
    ->prefix('admin')
    ->group(function () {

        Route::get('/dashboard', function () {

            return Inertia::render(
                'Admin/Dashboard'
            );
        })->name('admin.dashboard');

        Route::resource(
            'categories',
            CategoryController::class
        );

        Route::resource(
            'brands',
            BrandController::class
        );

        Route::resource(
            'products',
            ProductController::class
        );

        Route::resource(
            'discounts',
            DiscountController::class
        );

    // Variant Image Routes
    Route::post(
        '/variants/{variant}/images',
        [VariantImageController::class, 'store']
    );

    Route::delete(
        '/variants/{variant}/images/{image}',
        [VariantImageController::class, 'destroy']
    );

    Route::put(
        '/variants/{variant}/images/{image}/primary',
        [VariantImageController::class, 'setPrimary']
    );
    });


Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
