<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        // Drop existing FK
        DB::statement("
            ALTER TABLE order_items
            DROP FOREIGN KEY order_items_product_variant_id_foreign
        ");

        // Make column nullable
        DB::statement("
            ALTER TABLE order_items
            MODIFY product_variant_id BIGINT UNSIGNED NULL
        ");

        // Recreate FK with SET NULL
        DB::statement("
            ALTER TABLE order_items
            ADD CONSTRAINT order_items_product_variant_id_foreign
            FOREIGN KEY (product_variant_id)
            REFERENCES product_variants(id)
            ON DELETE SET NULL
        ");
    }

    public function down(): void
    {
        DB::statement("
            ALTER TABLE order_items
            DROP FOREIGN KEY order_items_product_variant_id_foreign
        ");

        DB::statement("
            ALTER TABLE order_items
            MODIFY product_variant_id BIGINT UNSIGNED NOT NULL
        ");

        DB::statement("
            ALTER TABLE order_items
            ADD CONSTRAINT order_items_product_variant_id_foreign
            FOREIGN KEY (product_variant_id)
            REFERENCES product_variants(id)
            ON DELETE CASCADE
        ");
    }
};