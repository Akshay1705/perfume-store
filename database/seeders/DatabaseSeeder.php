<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Brand;
use App\Models\Category;
use App\Models\Product;
use App\Models\ProductVariant; // Ensure this matches your variant model name
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // ── 1. USERS ──
        User::updateOrCreate(['email' => 'admin@perfume.com'], [
            'name'     => 'Admin User',
            'password' => bcrypt('password'),
            'role'     => 'admin',
        ]);

        User::updateOrCreate(['email' => 'customer@perfume.com'], [
            'name'     => 'Test Customer',
            'password' => bcrypt('password'),
            'role'     => 'customer',
        ]);

        // ── 2. CATEGORIES ──
        $categories = ['Perfume', 'Attar', 'Deo', 'Body Mist', 'Discovery Set', 'Gift Set'];
        foreach ($categories as $cat) {
            Category::updateOrCreate(
                ['slug' => Str::slug($cat)],
                ['name' => $cat]
            );
        }

        // ── 3. BRANDS ──
        $brands = [
            'Amouage', 'Parfums de Marly', 'Nishane', 'Xerjoff', 
            'Maison Francis Kurkdjian', 'Arabian Oud', 'Lattafa', 
            'Swiss Arabian', 'Rasasi', 'Ajmal', 'Afnan'
        ];
        foreach ($brands as $brand) {
            Brand::updateOrCreate(
                ['slug' => Str::slug($brand)],
                ['name' => $brand]
            );
        }

        // ── 4. 20 PREMIUM MIDDLE EASTERN & NICHE PRODUCTS DATA MAP ──
        $catalogData = [
            [
                'brand' => 'Amouage',
                'name' => 'Reflection Man',
                'category' => 'Perfume',
                'gender' => 'men',
                'description' => 'A sophisticated floral-woody fragrance displaying ultimate refinement with notes of neroli, jasmine, and precious sandalwood.',
                'variants' => [
                    ['volume' => '100ml', 'price' => 32000.00, 'stock' => 15],
                    ['volume' => '50ml', 'price' => 22000.00, 'stock' => 10]
                ]
            ],
            [
                'brand' => 'Amouage',
                'name' => 'Interlude Man',
                'category' => 'Perfume',
                'gender' => 'men',
                'description' => 'Known globally as The Blue Beast. An overwhelming, dark masterpiece of rich smoky incense, sweet myrrh, leather, and heavy oud.',
                'variants' => [
                    ['volume' => '100ml', 'price' => 34000.00, 'stock' => 8]
                ]
            ],
            [
                'brand' => 'Amouage',
                'name' => 'Guidance',
                'category' => 'Perfume',
                'gender' => 'women',
                'description' => 'An enchanting contemporary blend of pear, creamy hazelnut, frankincense, osmanthus, and rich vanilla undercurrents.',
                'variants' => [
                    ['volume' => '100ml', 'price' => 33500.00, 'stock' => 12]
                ]
            ],
            [
                'brand' => 'Parfums de Marly',
                'name' => 'Layton',
                'category' => 'Perfume',
                'gender' => 'unisex',
                'description' => 'An aristocratic olfactory signature displaying crisp green apple, lavender, sweet vanilla, and warm pepper accords.',
                'variants' => [
                    ['volume' => '125ml', 'price' => 28500.00, 'stock' => 20],
                    ['volume' => '75ml', 'price' => 19500.00, 'stock' => 15]
                ]
            ],
            [
                'brand' => 'Parfums de Marly',
                'name' => 'Delina Exclusif',
                'category' => 'Perfume',
                'gender' => 'women',
                'description' => 'A luxury oriental interpretation of fresh Turkish rose steeped in sweet pear, amber, and deep smoky oud wood bases.',
                'variants' => [
                    ['volume' => '75ml', 'price' => 29000.00, 'stock' => 14]
                ]
            ],
            [
                'brand' => 'Nishane',
                'name' => 'Hacivat',
                'category' => 'Perfume',
                'gender' => 'unisex',
                'description' => 'An elite tribute to elegance, combining heavy, juicy pineapple, oakmoss, clear jasmine, and rich cedarwood structures.',
                'variants' => [
                    ['volume' => '100ml', 'price' => 24000.00, 'stock' => 25],
                    ['volume' => '50ml', 'price' => 16000.00, 'stock' => 10]
                ]
            ],
            [
                'brand' => 'Nishane',
                'name' => 'Ani',
                'category' => 'Perfume',
                'gender' => 'unisex',
                'description' => 'Widely recognized as the absolute gold standard of vanilla fragrances, combined with bright green notes and exotic ginger.',
                'variants' => [
                    ['volume' => '100ml', 'price' => 24500.00, 'stock' => 18]
                ]
            ],
            [
                'brand' => 'Xerjoff',
                'name' => 'Erba Pura',
                'category' => 'Perfume',
                'gender' => 'unisex',
                'description' => 'A delicious, modern basket of bright Mediterranean citrus fruits wrapped smoothly in a sensual, heavy white musk blanket.',
                'variants' => [
                    ['volume' => '100ml', 'price' => 26000.00, 'stock' => 22]
                ]
            ],
            [
                'brand' => 'Xerjoff',
                'name' => 'Naxos',
                'category' => 'Perfume',
                'gender' => 'unisex',
                'description' => 'A celebration of Sicilian heritage with deep golden honey, sweet tobacco leaves, fresh lavender, and rich vanilla beans.',
                'variants' => [
                    ['volume' => '100ml', 'price' => 25500.00, 'stock' => 16]
                ]
            ],
            [
                'brand' => 'Maison Francis Kurkdjian',
                'name' => 'Baccarat Rouge 540',
                'category' => 'Perfume',
                'gender' => 'unisex',
                'description' => 'A highly poetic composition carrying an airy aura of ambergris facets, rich saffron, and freshly cut premium cedar woods.',
                'variants' => [
                    ['volume' => '70ml', 'price' => 31000.00, 'stock' => 30],
                    ['volume' => '200ml', 'price' => 58000.00, 'stock' => 5]
                ]
            ],
            [
                'brand' => 'Arabian Oud',
                'name' => 'Resala',
                'category' => 'Perfume',
                'gender' => 'unisex',
                'description' => 'A true oriental heavy-hitter featuring decadent chocolate, rich saffron, deep cambodian oud, and sweet vanilla.',
                'variants' => [
                    ['volume' => '100ml', 'price' => 18500.00, 'stock' => 12]
                ]
            ],
            [
                'brand' => 'Arabian Oud',
                'name' => 'Kalemat',
                'category' => 'Perfume',
                'gender' => 'unisex',
                'description' => 'Award-winning legendary dynamic signature containing sweet billowy amber, musk, wild honey, and dry wood notes.',
                'variants' => [
                    ['volume' => '100ml', 'price' => 12000.00, 'stock' => 40]
                ]
            ],
            [
                'brand' => 'Lattafa',
                'name' => 'Khamrah',
                'category' => 'Perfume',
                'gender' => 'unisex',
                'description' => 'A luxurious gourmand blend of sweet praline, warm dates, rich cinnamon, roasted tonka bean, and luxurious benzoin.',
                'variants' => [
                    ['volume' => '100ml', 'price' => 5999.00, 'stock' => 120]
                ]
            ],
            [
                'brand' => 'Lattafa',
                'name' => 'Bade\'e Al Oud',
                'category' => 'Perfume',
                'gender' => 'unisex',
                'description' => 'Commonly known as Oud for Glory. An intense mix of natural oud wood, clear saffron, lavender, and heavy patchouli base paths.',
                'variants' => [
                    ['volume' => '100ml', 'price' => 3500.00, 'stock' => 85]
                ]
            ],
            [
                'brand' => 'Swiss Arabian',
                'name' => 'Shaghaf Oud',
                'category' => 'Perfume',
                'gender' => 'unisex',
                'description' => 'An opulent, highly potent gourmand oriental profile blending golden saffron, premium oud, rose, and praline sweet notes.',
                'variants' => [
                    ['volume' => '75ml', 'price' => 3800.00, 'stock' => 90]
                ]
            ],
            [
                'brand' => 'Rasasi',
                'name' => 'Hawas for Him',
                'category' => 'Perfume',
                'gender' => 'men',
                'description' => 'An aquatic powerhouse combining spicy cinnamon, fresh crisp apple, sea salt water notes, and dry grey ambergris.',
                'variants' => [
                    ['volume' => '100ml', 'price' => 4999.00, 'stock' => 65],
                    ['volume' => '50ml', 'price' => 2999.00, 'stock' => 30]
                ]
            ],
            [
                'brand' => 'Afnan',
                'name' => '9PM',
                'category' => 'Perfume',
                'gender' => 'men',
                'description' => 'A seductive evening fragrance with spicy bergamot, deep cinnamon, patchouli, and clean amber configurations.',
                'variants' => [
                    ['volume' => '100ml', 'price' => 4999.00, 'stock' => 45],
                    ['volume' => '50ml', 'price' => 2299.00, 'stock' => 30]
                ]
            ],
            [
                'brand' => 'Ajmal',
                'name' => 'Amber Wood',
                'category' => 'Attar',
                'gender' => 'unisex',
                'description' => 'A masterpiece concentrate built on warm woody amber notes infused with deep lavender, cardamom, and heavy cedar.',
                'variants' => [
                    ['volume' => '10ml', 'price' => 5499.00, 'stock' => 49]
                ]
            ],
            [
                'brand' => 'Amouage',
                'name' => 'Exceptional Sampler Set',
                'category' => 'Discovery Set',
                'gender' => 'unisex',
                'description' => 'A curated collection sample discovery pack containing premium spray vials of Amouage\'s highest acclaimed artistic formulations.',
                'variants' => [
                    ['volume' => '12ml', 'price' => 4500.00, 'stock' => 50]
                ]
            ],
            [
                'brand' => 'Arabian Oud',
                'name' => 'Luxury Assortment Cabinet',
                'category' => 'Gift Set',
                'gender' => 'unisex',
                'description' => 'An exquisite dark lacquer presentation box featuring a luxury premium perfume spray and two matching pure oils.',
                'variants' => [
                    ['volume' => 'Mixed', 'price' => 22000.00, 'stock' => 15]
                ]
            ]
        ];

        // ── 5. RUN EXECUTION LOOP ──
        foreach ($catalogData as $item) {
            // Retrieve accurate IDs matching the generated configuration
            $category = Category::where('name', $item['category'])->first();
            $brand = Brand::where('name', $item['brand'])->first();

            if ($category && $brand) {
                // Seed Parent Product Block
                $product = Product::updateOrCreate([
                    'slug' => Str::slug($item['brand'] . '-' . $item['name']),
                ], [
                    'name'        => $item['brand'] . ' ' . $item['name'],
                    'description' => $item['description'],
                    'gender'      => $item['gender'],
                    'category_id' => $category->id,
                    'brand_id'    => $brand->id,
                    'is_active'   => 1,
                ]);

                // Seed Associated Children Variants Block
                foreach ($item['variants'] as $v) {
                    // Normalize SKU syntax format (e.g., AMOUAGE-REFLECTIONMAN-100ML)
                    $cleanSku = strtoupper(
                        Str::slug($item['brand'] . ' ' . $item['name'] . ' ' . $v['volume'], '')
                    );

                    ProductVariant::updateOrCreate([
                        'product_id' => $product->id,
                        'volume'     => $v['volume'],
                    ], [
                        'price'      => $v['price'],
                        'stock'      => $v['stock'],
                        'sku'        => $cleanSku,
                        'is_active'  => 1,
                    ]);
                }
            }
        }
    }
}