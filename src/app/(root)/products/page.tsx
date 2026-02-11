import { getAllProducts } from '@/lib/actions/product';
import { parseFilterParams } from '@/lib/utils/query';
import Card from '@/components/Card';

interface ProductsPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const resolvedParams = await searchParams;
  const filters = parseFilterParams(resolvedParams);
  const { products, totalCount } = await getAllProducts(filters);

  const totalPages = Math.ceil(totalCount / filters.limit);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Products</h1>
          <p className="mt-1 text-sm text-gray-500">
            {totalCount} {totalCount === 1 ? 'product' : 'products'} found
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products found</p>
            <p className="text-gray-400 mt-2">Try adjusting your filters</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <Card
                  key={product.id}
                  product={product}
                  variant={product.isFeatured ? 'featured' : 'default'}
                />
              ))}
            </div>

            {totalPages > 1 && (
              <nav className="mt-8 flex justify-center items-center gap-2">
                {filters.page > 1 && (
                  <a
                    href={buildPageUrl(resolvedParams, filters.page - 1)}
                    className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Previous
                  </a>
                )}
                <span className="px-4 py-2 text-sm text-gray-700">
                  Page {filters.page} of {totalPages}
                </span>
                {filters.page < totalPages && (
                  <a
                    href={buildPageUrl(resolvedParams, filters.page + 1)}
                    className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Next
                  </a>
                )}
              </nav>
            )}
          </>
        )}
      </main>
    </div>
  );
}

function buildPageUrl(
  currentParams: Record<string, string | string[] | undefined>,
  page: number
): string {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(currentParams)) {
    if (key === 'page') continue;
    if (Array.isArray(value)) {
      for (const v of value) {
        params.append(key, v);
      }
    } else if (value !== undefined) {
      params.set(key, value);
    }
  }
  params.set('page', String(page));
  return `/products?${params.toString()}`;
}
