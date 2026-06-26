<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Admin\{CategoryController, BrandController, ProductController, DiscountController, VariantImageController, OrderController as AdminOrderController, DashboardController};
use App\Http\Controllers\Store\{HomeController, AddressController, CartController, ProductController as StoreProductController, CheckoutController, OrderController};

/*
|--------------------------------------------------------------------------
| Public Store Routes
|--------------------------------------------------------------------------
*/

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/products', [StoreProductController::class, 'index'])->name('store.products');
Route::get('/products/{product:slug}', [StoreProductController::class, 'show'])->name('store.products.show');
Route::get('/our-story', function () {
    return Inertia::render('Store/OurStory');
})->name('store.story');

// Securely serve product images (prevents directory traversal)
Route::get('/storage/products/{filename}', function ($filename) {
    $path = storage_path('app/public/products/' . $filename);
    if (!file_exists($path) || basename($path) !== $filename) {
        abort(file_exists($path) ? 403 : 404);
    }
    return response()->file($path, ['Content-Type' => mime_content_type($path) ?: 'application/octet-stream', 'Cache-Control' => 'public, max-age=31536000']);
})->name('storage.product-image');

/*
|--------------------------------------------------------------------------
| Admin Area Routes (Protected)
|--------------------------------------------------------------------------
*/
Route::middleware(['auth', 'admin'])->prefix('admin')->group(function () {
    //dashboard page
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('admin.dashboard');

    // Categories Management
    Route::resource('categories', CategoryController::class);
    Route::post('categories/{id}/restore', [CategoryController::class, 'restore'])->name('categories.restore');
    Route::delete('categories/{id}/force-delete', [CategoryController::class, 'forceDelete'])->name('categories.forceDelete');

    // Brands Management
    Route::resource('brands', BrandController::class);
    Route::post('brands/{id}/restore', [BrandController::class, 'restore'])->name('brands.restore');
    Route::delete('brands/{id}/force-delete', [BrandController::class, 'forceDelete'])->name('brands.forceDelete');

    // Products & Discounts
    Route::resource('products', ProductController::class);
    Route::resource('discounts', DiscountController::class);

    //order export
    Route::get('orders/export', [AdminOrderController::class, 'export'])->name('admin.orders.export')->withoutMiddleware(\App\Http\Middleware\HandleInertiaRequests::class);

    //order managment
    Route::resource('orders', AdminOrderController::class)
        ->names([
            'index'  => 'admin.orders.index',
            'show'   => 'admin.orders.show',
            'update' => 'admin.orders.update',
        ])
        ->only(['index', 'show', 'update',]);

    // Variant Images
    Route::post('/variants/{variant}/images', [VariantImageController::class, 'store']);
    Route::delete('/variants/{variant}/images/{image}', [VariantImageController::class, 'destroy']);
    Route::put('/variants/{variant}/images/{image}/primary', [VariantImageController::class, 'setPrimary']);
});

/*
|--------------------------------------------------------------------------
| Customer Account & Shopping Routes (Protected)
|--------------------------------------------------------------------------
*/
Route::middleware('auth')->group(function () {
    // Personal Profile
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Sub-scoped Customer Account Details
    Route::prefix('account')->group(function () {
        Route::get('/profile', [ProfileController::class, 'edit'])->name('account.profile');
        Route::resource('addresses', AddressController::class);
        Route::post('/addresses/{address}/default', [AddressController::class, 'setDefault'])->name('addresses.default');
        Route::get('/orders',[OrderController::class, 'index'])->name('orders.index');
        Route::get('/orders/{order}',[OrderController::class, 'show'])->name('orders.show');
    });

    // Shopping Cart System
    Route::get('/cart', [CartController::class, 'index'])->name('cart.index');
    Route::post('/cart/add', [CartController::class, 'add'])->name('cart.add');
    Route::patch('/cart/items/{item}', [CartController::class, 'updateQuantity'])->name('cart.items.update');
    Route::delete('/cart/items/{item}', [CartController::class, 'destroy'])->name('cart.items.destroy');
    Route::post('/cart/apply-discount',[CartController::class, 'applyDiscount'])->name('cart.discount');
    Route::post('/cart/remove-discount',[CartController::class, 'removeDiscount'])->name('cart.discount.remove');

    //checkout flow
    Route::get('/checkout',[CheckoutController::class, 'index'])->name('checkout.index');
    Route::post('/checkout/place-order',[CheckoutController::class, 'placeOrder'])->name('checkout.place-order');
    Route::get('/checkout/success/{order}', [CheckoutController::class, 'success'])->name('checkout.success');});

require __DIR__ . '/auth.php';
