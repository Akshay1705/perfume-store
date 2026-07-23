<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Order;
use App\Services\OrderSnapshotService;

class BackfillOrderSnapshots extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:backfill-order-snapshots';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Backfill snapshot data for existing orders';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        Order::whereHas('items', function ($query) {
            $query->whereNull('product_name');
        })
            ->with([
                'items.variant.product.brand',
                'items.variant.primaryImage',
            ])
            ->chunk(100, function ($orders) {

                $snapshot = app(OrderSnapshotService::class);

                foreach ($orders as $order) {
                    $snapshot->capture($order);
                }
            });
    }
}
