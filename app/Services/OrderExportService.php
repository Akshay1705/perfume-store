<?php

namespace App\Services;

use App\Models\Order;

class OrderExportService
{
    public function generateCsv(): string
    {
        $orders = Order::with([
            'user',
            'address',
            'items.variant.product',
        ])
            ->whereNot('status', Order::STATUS_CART)
            ->orderByDesc('id')
            ->get();

        $rows = [];

        // Header row
        $rows[] = [
            'Order ID',
            'Placed At',
            'Status',
            // Customer
            'Customer Name',
            'Customer Email',
            // Address
            'Recipient Name',
            'Phone',
            'Address Line 1',
            'Address Line 2',
            'City',
            'State',
            'Postal Code',
            // Financials
            'Subtotal (₹)',
            'Discount (₹)',
            'Total (₹)',
            // Items (flattened as summary)
            'Items Count',
            'Items Summary',
        ];

        foreach ($orders as $order) {
            // Build items summary string e.g. "Rose Toner 200ml x2, Serum 30ml x1"
            $itemsSummary = $order->items->map(function ($item) {
                $name = $item->variant?->product?->name ?? 'Unknown';
                $volume = $item->variant?->volume ?? '';
                $qty = $item->quantity;
                return "{$name} {$volume} x{$qty}";
            })->join(', ');

            $address = $order->address;

            $rows[] = [
                $order->id,
                $order->placed_at?->format('d M Y H:i') ?? $order->created_at->format('d M Y H:i'),
                $order->status,
                // Customer
                $order->user?->name ?? '',
                $order->user?->email ?? '',
                // Address
                $address?->full_name ?? '',
                $address?->phone ?? '',
                $address?->address_line_1 ?? '',
                $address?->address_line_2 ?? '',
                $address?->city ?? '',
                $address?->state ?? '',
                $address?->postal_code ?? '',
                // Financials
                number_format($order->subtotal, 2),
                number_format($order->discount_amount, 2),
                number_format($order->total, 2),
                // Items
                $order->items->count(),
                $itemsSummary,
            ];
        }

        // Write to in-memory stream (no temp file needed)
        $handle = fopen('php://temp', 'r+');

        foreach ($rows as $row) {
            fputcsv($handle, $row);
        }

        rewind($handle);
        $csv = stream_get_contents($handle);
        fclose($handle);

        return $csv;
    }
}
