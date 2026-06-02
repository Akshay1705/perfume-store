<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();

            $table->foreignId('user_id')
                ->constrained()
                ->cascadeOnDelete();

            $table->enum('status', [
                'cart',
                'placed',
                'cancelled'
            ])->default('cart');

            $table->decimal('subtotal', 10, 2)->default(0);

            $table->decimal('discount_amount', 10, 2)
                ->default(0);

            $table->decimal('total', 10, 2)->default(0);

            $table->timestamp('placed_at')
                ->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
