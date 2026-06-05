<?php

namespace App\Services;

use App\Models\ProductImage;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\URL;

class ProductImageService
{
    private const STORAGE_PATH = 'products';

    public function store(int $productId, UploadedFile $file, bool $isPrimary = false): ProductImage
    {
        // If this is primary, set other images to non-primary
        if ($isPrimary) {
            ProductImage::where('product_id', $productId)
                ->update(['is_primary' => false]);
        }

        // Store file
        $path = $file->store(self::STORAGE_PATH, 'public');

        // Create image record
        return ProductImage::create([
            'product_id' => $productId,
            'image_path' => $path,
            'is_primary' => $isPrimary,
        ]);
    }

    public function delete(ProductImage $image): void
    {
        $productId = $image->product_id;
        $wasPrimary = $image->is_primary;

        // Prevent deleting last image
        $imageCount = ProductImage::where(
            'product_id',
            $productId
        )->count();

        if ($imageCount <= 1) {
            throw new \Exception(
                'Product must have at least one image.'
            );
        }

        // Delete file
        if (
            Storage::disk('public')->exists(
                $image->image_path
            )
        ) {
            Storage::disk('public')->delete(
                $image->image_path
            );
        }

        // Delete record
        $image->delete();

        // Auto assign new primary
        if ($wasPrimary) {

            $newPrimary = ProductImage::where(
                'product_id',
                $productId
            )->first();

            if ($newPrimary) {
                $newPrimary->update([
                    'is_primary' => true,
                ]);
            }
        }
    }

    public function setPrimary(ProductImage $image): void
    {
        // Set all other images to non-primary
        ProductImage::where('product_id', $image->product_id)
            ->where('id', '!=', $image->id)
            ->update(['is_primary' => false]);

        // Set this as primary
        $image->update(['is_primary' => true]);
    }

    public function getImageUrl(ProductImage $image): string
    {
        // Return the direct public URL path
        // Since we have storage symlink, we can use asset() helper
        // This resolves to /storage/products/filename.jpg
        return asset('storage/' . $image->image_path);
    }
}
