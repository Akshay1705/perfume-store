<?php

namespace App\Services;

use App\Models\VariantImage;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class VariantImageService
{
    private const STORAGE_PATH = 'variants';

    public function store(
        int $variantId,
        UploadedFile $file,
        bool $isPrimary = false
    ): VariantImage {

        // If this is primary, remove primary from others
        if ($isPrimary) {
            VariantImage::where(
                'product_variant_id',
                $variantId
            )->update([
                'is_primary' => false,
            ]);
        }

        // Store file
        $path = $file->store(
            self::STORAGE_PATH,
            'public'
        );

        // Create image record
        return VariantImage::create([
            'product_variant_id' => $variantId,
            'image_path' => $path,
            'is_primary' => $isPrimary,
        ]);
    }

    public function delete(
        VariantImage $image
    ): void {

        $variantId = $image->product_variant_id;
        $wasPrimary = $image->is_primary;

        // Prevent deleting last image
        $imageCount = VariantImage::where(
            'product_variant_id',
            $variantId
        )->count();

        if ($imageCount <= 1) {
            throw new \Exception(
                'Variant must have at least one image.'
            );
        }

        // Delete physical file
        if (
            Storage::disk('public')->exists(
                $image->image_path
            )
        ) {
            Storage::disk('public')->delete(
                $image->image_path
            );
        }

        // Delete DB record
        $image->delete();

        // Auto assign new primary
        if ($wasPrimary) {

            $newPrimary = VariantImage::where(
                'product_variant_id',
                $variantId
            )->first();

            if ($newPrimary) {
                $newPrimary->update([
                    'is_primary' => true,
                ]);
            }
        }
    }

    public function setPrimary(
        VariantImage $image
    ): void {

        VariantImage::where(
            'product_variant_id',
            $image->product_variant_id
        )
            ->where('id', '!=', $image->id)
            ->update([
                'is_primary' => false,
            ]);

        $image->update([
            'is_primary' => true,
        ]);
    }

    public function getImageUrl(
        VariantImage $image
    ): string {

        return asset(
            'storage/' . $image->image_path
        );
    }
}
