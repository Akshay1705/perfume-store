<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ProductVariant;
use App\Models\VariantImage;
use App\Services\VariantImageService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class VariantImageController extends Controller
{
    /**
     * Store a newly uploaded variant image.
     *
     * @param Request        $request
     * @param ProductVariant $variant
     *
     * @return JsonResponse
     */
    public function store(Request $request, ProductVariant $variant): JsonResponse
    {
        $validated = $request->validate([
            'image'      => 'required|image|max:5120',
            'is_primary' => 'boolean',
        ]);

        $service = new VariantImageService();

        $image = $service->store(
            $variant->id,
            $request->file('image'),
            $request->boolean('is_primary', false)
        );

        return response()->json([
            'image' => [
                'id'         => $image->id,
                'url'        => $service->getImageUrl($image),
                'is_primary' => $image->is_primary,
            ],
        ]);
    }

    /**
     * Remove the specified variant image.
     *
     * @param ProductVariant $variant
     * @param VariantImage   $image
     *
     * @return JsonResponse
     */
    public function destroy(ProductVariant $variant, VariantImage $image): JsonResponse
    {
        if ($image->product_variant_id !== $variant->id) {
            return response()->json([
                'error' => 'Image not found',
            ], 404);
        }

        $service = new VariantImageService();
        $service->delete($image);
        $variant->load('images');

        return response()->json([
            'images' => $variant->images->map(fn($img) => [
                'id'         => $img->id,
                'url'        => $service->getImageUrl($img),
                'is_primary' => $img->is_primary,
            ]),
        ]);
    }

    /**
     * Set the specified image as primary for the variant.
     *
     * @param ProductVariant $variant
     * @param VariantImage   $image
     *
     * @return JsonResponse
     */
    public function setPrimary(ProductVariant $variant, VariantImage $image): JsonResponse
    {
        if ($image->product_variant_id !== $variant->id) {
            return response()->json([
                'error' => 'Image not found',
            ], 404);
        }

        $service = new VariantImageService();
        $service->setPrimary($image);
        $variant->load('images');

        return response()->json([
            'images' => $variant->images->map(fn($img) => [
                'id'         => $img->id,
                'url'        => $service->getImageUrl($img),
                'is_primary' => $img->is_primary,
            ]),
        ]);
    }
}