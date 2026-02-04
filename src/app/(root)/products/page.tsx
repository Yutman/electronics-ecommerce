import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Card from "@/components/Card";
import Filters from "@/components/Filters";
import Sort from "@/components/Sort";
import { parseQueryParams, type ProductFilters } from "@/lib/utils/query";
import {
  MOCK_PRODUCTS,
  CATEGORIES,
  BRANDS,
  CONDITIONS,
  getLowestPrice,
  getOriginalPrice,
  getDefaultVariant,
  type MockProduct,
} from "@/lib/data/products";

interface ProductsPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

function filterProducts(
  products: MockProduct[],
  filters: ProductFilters
): MockProduct[] {
  return products.filter((product) => {
    if (filters.category && product.categorySlug !== filters.category) {
      return false;
    }

    if (filters.brands?.length && !filters.brands.includes(product.brandSlug)) {
      return false;
    }

    if (
      filters.conditions?.length &&
      !filters.conditions.includes(product.conditionSlug)
    ) {
      return false;
    }

    const lowestPrice = getLowestPrice(product);
    if (filters.priceMin !== undefined && lowestPrice < filters.priceMin) {
      return false;
    }
    if (filters.priceMax !== undefined && lowestPrice > filters.priceMax) {
      return false;
    }

    if (filters.cpus?.length) {
      const hasCpu = product.variants.some(
        (v) => v.cpuSlug && filters.cpus?.includes(v.cpuSlug)
      );
      if (!hasCpu) return false;
    }

    if (filters.rams?.length) {
      const hasRam = product.variants.some(
        (v) => v.ramSlug && filters.rams?.includes(v.ramSlug)
      );
      if (!hasRam) return false;
    }

    if (filters.storages?.length) {
      const hasStorage = product.variants.some(
        (v) => v.storageSlug && filters.storages?.includes(v.storageSlug)
      );
      if (!hasStorage) return false;
    }

    if (filters.screenSizes?.length) {
      const hasScreenSize = product.variants.some(
        (v) => v.screenSizeSlug && filters.screenSizes?.includes(v.screenSizeSlug)
      );
      if (!hasScreenSize) return false;
    }

    if (filters.simSlots?.length) {
      const hasSimSlot = product.variants.some(
        (v) => v.simSlotSlug && filters.simSlots?.includes(v.simSlotSlug)
      );
      if (!hasSimSlot) return false;
    }

    if (filters.connectivities?.length) {
      const hasConnectivity = product.variants.some(
        (v) =>
          v.connectivitySlug &&
          filters.connectivities?.includes(v.connectivitySlug)
      );
      if (!hasConnectivity) return false;
    }

    if (filters.bandSizes?.length) {
      const hasBandSize = product.variants.some(
        (v) => v.bandSizeSlug && filters.bandSizes?.includes(v.bandSizeSlug)
      );
      if (!hasBandSize) return false;
    }

    if (filters.bandTypes?.length) {
      const hasBandType = product.variants.some(
        (v) => v.bandTypeSlug && filters.bandTypes?.includes(v.bandTypeSlug)
      );
      if (!hasBandType) return false;
    }

    if (filters.faceSizes?.length) {
      const hasFaceSize = product.variants.some(
        (v) => v.faceSizeSlug && filters.faceSizes?.includes(v.faceSizeSlug)
      );
      if (!hasFaceSize) return false;
    }

    if (filters.series?.length) {
      const hasSeries = product.variants.some(
        (v) => v.seriesSlug && filters.series?.includes(v.seriesSlug)
      );
      if (!hasSeries) return false;
    }

    return true;
  });
}

function sortProducts(
  products: MockProduct[],
  sort: ProductFilters["sort"]
): MockProduct[] {
  const sorted = [...products];

  switch (sort) {
    case "newest":
      return sorted.sort(
        (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
      );
    case "price_asc":
      return sorted.sort((a, b) => getLowestPrice(a) - getLowestPrice(b));
    case "price_desc":
      return sorted.sort((a, b) => getLowestPrice(b) - getLowestPrice(a));
    case "featured":
    default:
      return sorted.sort((a, b) => {
        if (a.isFeatured && !b.isFeatured) return -1;
        if (!a.isFeatured && b.isFeatured) return 1;
        return b.rating - a.rating;
      });
  }
}

function getCategoryName(slug: string | undefined): string {
  if (!slug) return "All Products";
  const category = CATEGORIES.find((c) => c.slug === slug);
  return category?.name || "Products";
}

function getActiveFiltersDisplay(filters: ProductFilters): Array<{
  key: keyof ProductFilters;
  value: string;
  label: string;
}> {
  const activeFilters: Array<{
    key: keyof ProductFilters;
    value: string;
    label: string;
  }> = [];

  filters.brands?.forEach((slug) => {
    const brand = BRANDS.find((b) => b.slug === slug);
    if (brand) {
      activeFilters.push({ key: "brands", value: slug, label: brand.name });
    }
  });

  filters.conditions?.forEach((slug) => {
    const condition = CONDITIONS.find((c) => c.slug === slug);
    if (condition) {
      activeFilters.push({
        key: "conditions",
        value: slug,
        label: condition.label,
      });
    }
  });

  if (filters.priceMin !== undefined || filters.priceMax !== undefined) {
    const min = filters.priceMin ?? 0;
    const max = filters.priceMax ?? "Any";
    activeFilters.push({
      key: "priceMin",
      value: "price",
      label: `$${min} - ${typeof max === "number" ? `$${max}` : max}`,
    });
  }

  return activeFilters;
}

function getProductSpecs(product: MockProduct): string[] {
  const specs: string[] = [];
  const variant = getDefaultVariant(product);

  if (variant.cpu) specs.push(variant.cpu);
  if (variant.ram) specs.push(variant.ram);
  if (variant.storage) specs.push(variant.storage);
  if (variant.screenSize) specs.push(variant.screenSize);
  if (product.batteryHealth !== null) specs.push(`${product.batteryHealth}% Battery`);

  return specs;
}

function ProductGrid({ products }: { products: MockProduct[] }) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
        <svg
          width="64"
          height="64"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-dark-500 mb-4"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35" />
          <path d="M8 8l6 6M14 8l-6 6" />
        </svg>
        <h3 className="text-heading-3 text-dark-900 mb-2">No products found</h3>
        <p className="text-body text-dark-700 max-w-md">
          We couldn&apos;t find any products matching your filters. Try adjusting
          your search criteria or clearing some filters.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => {
        const price = getLowestPrice(product);
        const originalPrice = getOriginalPrice(product);
        const specs = getProductSpecs(product);
        const variant = getDefaultVariant(product);

        let badge: string | undefined;
        if (product.conditionSlug === "new") {
          badge = "New";
        } else if (variant.salePrice) {
          badge = "Sale";
        } else if (product.isFeatured) {
          badge = "Popular";
        }

        return (
          <Card
            key={product.id}
            id={product.id}
            title={product.name}
            description={specs.join(" | ")}
            image={product.images[0]}
            price={price}
            originalPrice={originalPrice}
            rating={product.rating}
            reviewCount={product.reviewCount}
            badge={badge}
            category={product.category}
            brand={product.brand}
            href={`/products/${product.id}`}
          />
        );
      })}
    </div>
  );
}

function ActiveFilters({
  filters,
}: {
  filters: Array<{ key: keyof ProductFilters; value: string; label: string }>;
}) {
  if (filters.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {filters.map((filter) => (
        <span
          key={`${filter.key}-${filter.value}`}
          className="inline-flex items-center gap-1 px-3 py-1 bg-light-200 text-dark-900 text-caption rounded-full"
        >
          {filter.label}
        </span>
      ))}
    </div>
  );
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams;
  const filters = parseQueryParams(params as Record<string, string | string[] | undefined>);

  const filteredProducts = filterProducts(MOCK_PRODUCTS, filters);
  const sortedProducts = sortProducts(filteredProducts, filters.sort);

  const categoryName = getCategoryName(filters.category);
  const activeFilters = getActiveFiltersDisplay(filters);

  return (
    <div className="min-h-screen flex flex-col bg-light-200">
      <Navbar />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="mb-6">
            <h1 className="text-heading-2 text-dark-900 mb-2">{categoryName}</h1>
            <p className="text-body text-dark-700">
              {sortedProducts.length}{" "}
              {sortedProducts.length === 1 ? "product" : "products"} available
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            <Suspense
              fallback={
                <div className="hidden lg:block w-64 shrink-0">
                  <div className="animate-pulse space-y-4">
                    <div className="h-8 bg-light-300 rounded" />
                    <div className="h-32 bg-light-300 rounded" />
                    <div className="h-32 bg-light-300 rounded" />
                  </div>
                </div>
              }
            >
              <Filters category={filters.category} />
            </Suspense>

            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div className="flex items-center gap-4">
                  <div className="lg:hidden">
                    <Suspense fallback={null}>
                      <Filters category={filters.category} />
                    </Suspense>
                  </div>
                </div>
                <Suspense fallback={null}>
                  <Sort />
                </Suspense>
              </div>

              <ActiveFilters filters={activeFilters} />

              <ProductGrid products={sortedProducts} />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
