import StoreLayout from "@/Layouts/StoreLayout";
import Hero from "@/Components/Store/Hero";
import CategoryGrid from "@/Components/Store/CategoryGrid";
import FeaturedProducts from "@/Components/Store/FeaturedProducts";
import BrandGrid from "@/Components/Store/BrandGrid";

export default function Home({ variants = [], categories = [], brands = [] }) {
    return (
        <StoreLayout>
            {/* Core Content Framework */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                {/* Promo Display Header */}
                <Hero />

                {/* Categorized Filter Previews */}
                <CategoryGrid categories={categories} />

                {/* Primary Showcases */}
                <FeaturedProducts variants={variants} />

                {/* Curated Partnerships */}
                <BrandGrid brands={brands} />
            </div>
        </StoreLayout>
    );
}
