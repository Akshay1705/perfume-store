<?php

namespace App\Services;

use App\Models\Order;

class OrderSnapshotService
{
    public function capture(Order $order): void
    {
        $order->loadMissing([
            'items.variant.product.brand',
            'items.variant.primaryImage',
        ]);
        // dd('Snapshot service called');


        foreach ($order->items as $item) {
            // dd($item->variant);

            $variant = $item->variant;

            if (!$variant) {
                continue;
            }

            $item->product_name = $variant->product->name;
            $item->brand_name = $variant->product->brand?->name;
            $item->variant_name = $variant->volume;
            $item->sku = $variant->sku;
            $item->image = $variant->primaryImage?->image_path;

            // dd($item->getAttributes());
            $item->save();
            // $item->refresh();

            // dd($item->product_name);
        }
    }
}