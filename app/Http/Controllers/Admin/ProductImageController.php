<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\ProductImage;
use App\Services\ProductImageService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;

class ProductImageController extends Controller
{
    /**
     * Upload a product image
     */
    public function store(Request $request, Product $product): JsonResponse
    {
        try {
            $validated = $request->validate([
                'image' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:5120',
                'is_primary' => 'boolean',
            ]);

            $service = new ProductImageService();
            $image = $service->store(
                $product->id,
                $request->file('image'),
                $request->boolean('is_primary', false)
            );

            $imageUrl = $service->getImageUrl($image);
            
            Log::info('Image uploaded successfully', [
                'product_id' => $product->id,
                'image_id' => $image->id,
                'path' => $image->image_path,
                'url' => $imageUrl,
            ]);

            return response()->json([
                'id' => $image->id,
                'url' => $imageUrl,
                'is_primary' => $image->is_primary,
                'message' => 'Image uploaded successfully',
            ], 201);
        } catch (\Exception $e) {
            Log::error('Image upload failed: ' . $e->getMessage(), [
                'product_id' => $product->id,
                'error' => $e->getTraceAsString(),
            ]);
            return response()->json([
                'error' => 'Failed to upload image: ' . $e->getMessage(),
            ], 422);
        }
    }

    /**
     * Delete a product image
     */
    public function destroy(Product $product, ProductImage $image): JsonResponse
    {
        try {
            // Verify the image belongs to the product
            if ($image->product_id !== $product->id) {
                return response()->json(['error' => 'Image not found'], 404);
            }

            $service = new ProductImageService();
            $service->delete($image);

            Log::info('Image deleted successfully', [
                'product_id' => $product->id,
                'image_id' => $image->id,
            ]);

            return response()->json(['message' => 'Image deleted successfully']);
        } catch (\Exception $e) {
            Log::error('Image delete failed: ' . $e->getMessage());
            return response()->json([
                'error' => 'Failed to delete image: ' . $e->getMessage(),
            ], 422);
        }
    }

    /**
     * Set image as primary
     */
    public function setPrimary(Product $product, ProductImage $image): JsonResponse
    {
        try {
            // Verify the image belongs to the product
            if ($image->product_id !== $product->id) {
                return response()->json(['error' => 'Image not found'], 404);
            }

            $service = new ProductImageService();
            $service->setPrimary($image);

            Log::info('Image set as primary', [
                'product_id' => $product->id,
                'image_id' => $image->id,
            ]);

            return response()->json(['message' => 'Image set as primary']);
        } catch (\Exception $e) {
            Log::error('Set primary failed: ' . $e->getMessage());
            return response()->json([
                'error' => 'Failed to set primary: ' . $e->getMessage(),
            ], 422);
        }
    }

    /**
     * Debug endpoint to check image status
     */
    public function debug(Product $product): JsonResponse
    {
        try {
            $service = new ProductImageService();
            $images = $product->images()->get();
            
            $debug = [
                'app_url' => config('app.url'),
                'storage_path' => storage_path('app/public'),
                'public_disk_url' => config('filesystems.disks.public.url'),
                'images' => $images->map(function ($image) use ($service) {
                    $url = $service->getImageUrl($image);
                    $filePath = storage_path('app/public/' . $image->image_path);
                    $fileExists = file_exists($filePath);
                    
                    return [
                        'id' => $image->id,
                        'image_path' => $image->image_path,
                        'url' => $url,
                        'file_exists' => $fileExists,
                        'file_size' => $fileExists ? filesize($filePath) : 0,
                    ];
                })->toArray(),
            ];
            
            return response()->json($debug);
        } catch (\Exception $e) {
            Log::error('Debug failed: ' . $e->getMessage());
            return response()->json([
                'error' => 'Debug failed: ' . $e->getMessage(),
            ], 422);
        }
    }
}
