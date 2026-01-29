import Image from 'next/image';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    description: string | null;
    imageUrl?: string;
    brandName?: string;
    categoryName?: string;
    price?: string;
    salePrice?: string | null;
    inStock?: number;
    conditionLabel?: string;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48 w-full">
        <Image
          src={product.imageUrl || '/placeholder-product.jpg'}
          alt={product.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
            {product.name}
          </h3>
          {product.brandName && (
            <span className="text-sm text-gray-500 ml-2">{product.brandName}</span>
          )}
        </div>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            {product.price && (
              <span className="text-2xl font-bold text-gray-900">
                ${product.salePrice || product.price}
              </span>
            )}
            {product.inStock !== undefined && (
              <span className="text-sm text-gray-500">
                {product.inStock} in stock
              </span>
            )}
          </div>
          {product.categoryName && (
            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
              {product.categoryName}
            </span>
          )}
        </div>
        <button className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200">
          Add to Cart
        </button>
      </div>
    </div>
  );
}
