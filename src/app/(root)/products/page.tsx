import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Card from "@/components/Card";
import Filters from "@/components/Filters";
import Sort from "@/components/Sort";
import { parseFilterParams, buildProductQueryObject, type ProductFilters } from "@/lib/utils/query";
import { getAllProducts, type ProductListItem } from "@/lib/actions/product";

interface ProductsPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

function getCategoryLabel(slug: string | undefined): string {
  if (!slug) return "All Products";
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
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
    activeFilters.push({
      key: "brands",
      value: slug,
      label: slug
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" "),
    });
  });

  filters.conditions?.forEach((slug) => {
    activeFilters.push({
      key: "conditions",
      value: slug,
      label: slug.charAt(0).toUpperCase() + slug.slice(1),
    });
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

function ProductGrid({ products }: { products: ProductListItem[] }) {
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
        const { minPrice, maxPrice } = product;

        const badge =
          product.conditionSlug === "new"
            ? "New"
            : maxPrice > minPrice
              ? "Sale"
              : undefined;

        return (
          <Card
            key={product.id}
            id={product.id}
            title={product.name}
            description={product.description ?? undefined}
            image={product.images[0] ?? "/placeholder.png"}
            price={minPrice}
            originalPrice={maxPrice > minPrice ? maxPrice : undefined}
            badge={badge}
            category={product.categoryName}
            brand={product.brandName}
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
  const filters = parseFilterParams(params as Record<string, string | string[] | undefined>);
  const queryObj = buildProductQueryObject(filters);

  const { products, totalCount } = await getAllProducts(queryObj);

  const categoryName = getCategoryLabel(filters.category);
  const activeFilters = getActiveFiltersDisplay(filters);

  return (
    <div className="min-h-screen flex flex-col bg-light-200">
      <Navbar />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="mb-6">
            <h1 className="text-heading-2 text-dark-900 mb-2">{categoryName}</h1>
            <p className="text-body text-dark-700">
              {totalCount}{" "}
              {totalCount === 1 ? "product" : "products"} available
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

              <ProductGrid products={products} />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
