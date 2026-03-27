import Link from "next/link";
import { Cpu, Zap } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductGallery from "@/components/ProductGallery";
import VariantSelector from "@/components/VariantSelector";
import SpecTable from "@/components/SpecTable";
import TrustBadges from "@/components/TrustBadges";
import ProductCarousel from "@/components/ProductCarousel";
import {
  mockProduct,
  customersAlsoViewed,
  bestSellers,
} from "@/lib/mock-product-data";
import type { CardProps } from "@/components/Card";

function StarRating({ rating, reviewCount }: { rating: number; reviewCount: number }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex" aria-label={`Rating: ${rating} out of 5 stars`}>
        {[...Array(fullStars)].map((_, i) => (
          <svg
            key={`full-${i}`}
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="text-dark-900"
            aria-hidden="true"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        ))}
        {hasHalfStar && (
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            className="text-dark-900"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="half-star-detail">
                <stop offset="50%" stopColor="currentColor" />
                <stop offset="50%" stopColor="transparent" />
              </linearGradient>
            </defs>
            <polygon
              points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
              fill="url(#half-star-detail)"
              stroke="currentColor"
              strokeWidth="1"
            />
          </svg>
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <svg
            key={`empty-${i}`}
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="text-dark-500"
            aria-hidden="true"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        ))}
      </div>
      <span className="text-caption text-dark-500">({reviewCount})</span>
    </div>
  );
}

function mapCrossSellToCardProps(
  products: typeof customersAlsoViewed
): CardProps[] {
  return products.map((p) => ({
    id: p.id,
    title: p.title,
    image: p.image,
    price: p.price,
    originalPrice: p.originalPrice,
    rating: p.rating,
    reviewCount: p.reviewCount,
    badge: p.badge,
    category: p.category,
    brand: p.brand,
    href: `/products/${p.id}`,
  }));
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  // In a real app, fetch product by id. For now, use mock data.
  void id;
  const product = mockProduct;

  return (
    <div className="min-h-screen flex flex-col bg-light-100">
      <Navbar />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 py-4">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center gap-1.5 text-caption text-dark-500">
              <li>
                <Link href="/" className="hover:text-dark-900 hover:underline">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link
                  href={`/products?category=${product.categorySlug}`}
                  className="hover:text-dark-900 hover:underline"
                >
                  {product.category}
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link
                  href={`/products?category=${product.categorySlug}&brands=${product.brand.toLowerCase()}`}
                  className="hover:text-dark-900 hover:underline"
                >
                  {product.brand}
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <span className="text-dark-900" aria-current="page">
                  {product.name}
                </span>
              </li>
            </ol>
          </nav>

          {/* Main Product Layout */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Left Column: Gallery (60%) */}
            <div className="w-full lg:w-[60%]">
              <ProductGallery images={product.images} />
            </div>

            {/* Right Column: Purchase Box (40%) */}
            <div className="w-full lg:w-[40%]">
              {/* Product Title & Rating */}
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-footnote text-dark-500 uppercase tracking-wide">
                    {product.brand}
                  </span>
                  <span className="text-caption text-green font-medium">In Stock</span>
                </div>
                <h1 className="text-heading-3 text-dark-900 mb-2">{product.name}</h1>
                <div className="flex items-center gap-3">
                  <StarRating rating={product.rating} reviewCount={product.reviewCount} />
                  <span className="text-footnote text-dark-500">SKU: {product.sku}</span>
                </div>
              </div>

              {/* Variant Selector */}
              <VariantSelector
                basePrice={product.basePrice}
                originalPrice={product.originalPrice}
                conditions={product.conditions}
                cpuOptions={product.cpuOptions}
                storageOptions={product.storageOptions}
                ramOptions={product.ramOptions}
              />

              {/* Trust Badges */}
              <div className="mt-6">
                <TrustBadges
                  shippingEstimate={product.shippingEstimate}
                  warrantyInfo={product.warrantyInfo}
                />
              </div>

              {/* About This Item */}
              <div className="mt-6">
                <h3 className="text-body-medium text-dark-900 mb-3">About this item</h3>
                <ul className="space-y-2">
                  {product.highlights.map((highlight) => (
                    <li key={highlight} className="flex items-start gap-2 text-caption text-dark-700">
                      <Cpu className="w-4 h-4 text-dark-500 shrink-0 mt-0.5" aria-hidden="true" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Specifications Section */}
          <div className="mt-12">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-5 h-5 text-dark-900" aria-hidden="true" />
              <h2 className="text-heading-3 text-dark-900">Specifications</h2>
            </div>
            <SpecTable sections={product.specSections} />
          </div>

          {/* Cross-sell: Customers Also Viewed */}
          <div className="mt-12">
            <ProductCarousel
              title="You May Also Like"
              products={mapCrossSellToCardProps(customersAlsoViewed)}
            />
          </div>

          {/* Cross-sell: More from HP (Best Sellers) */}
          <div className="mt-4">
            <ProductCarousel
              title={`More from ${product.brand}`}
              products={mapCrossSellToCardProps(bestSellers)}
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
