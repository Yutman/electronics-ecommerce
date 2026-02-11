import Image from 'next/image';
import type { ProductListItem } from '@/lib/actions/product';

interface CardProps {
  product: ProductListItem;
  variant?: 'default' | 'compact' | 'featured';
}

export default function Card({ product, variant = 'default' }: CardProps) {
  const primaryImage = product.images[0];
  const imageUrl = primaryImage?.url ?? '/placeholder-product.jpg';
  const imageAlt = primaryImage?.altText ?? product.name;

  const hasPriceRange =
    product.minPrice &&
    product.maxPrice &&
    product.minPrice !== product.maxPrice;

  const priceDisplay = hasPriceRange
    ? `$${Number(product.minPrice).toFixed(2)} - $${Number(product.maxPrice).toFixed(2)}`
    : product.minPrice
      ? `$${Number(product.minPrice).toFixed(2)}`
      : 'Price unavailable';

  if (variant === 'compact') {
    return (
      <div className="flex bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div className="relative w-32 h-32 flex-shrink-0">
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            className="object-cover"
            sizes="128px"
          />
        </div>
        <div className="p-3 flex flex-col justify-between flex-1 min-w-0">
          <div>
            <h3 className="text-sm font-semibold text-gray-900 truncate">
              {product.name}
            </h3>
            {product.brandName && (
              <span className="text-xs text-gray-500">{product.brandName}</span>
            )}
          </div>
          <span className="text-lg font-bold text-gray-900">{priceDisplay}</span>
        </div>
      </div>
    );
  }

  const isFeatured = variant === 'featured';

  return (
    <div
      className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 ${
        isFeatured ? 'ring-2 ring-green-500' : ''
      }`}
    >
      <div className="relative h-48 w-full">
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        {isFeatured && (
          <span className="absolute top-2 left-2 px-2 py-1 bg-green-500 text-white text-xs font-semibold rounded">
            Featured
          </span>
        )}
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
            {product.name}
          </h3>
          {product.brandName && (
            <span className="text-sm text-gray-500 ml-2 whitespace-nowrap">
              {product.brandName}
            </span>
          )}
        </div>
        {product.description && (
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {product.description}
          </p>
        )}
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold text-gray-900">{priceDisplay}</span>
          {product.categoryName && (
            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
              {product.categoryName}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
