import Image from "next/image";
import Link from "next/link";

export interface CardProps {
  id?: string | number;
  title: string;
  description?: string;
  image: string;
  price: number;
  originalPrice?: number;
  rating?: number;
  reviewCount?: number;
  badge?: string;
  category?: string;
  brand?: string;
  href?: string;
  variant?: "default" | "compact" | "featured";
}

function StarRating({ rating, reviewCount }: { rating: number; reviewCount?: number }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center gap-1">
      <div className="flex" aria-label={`Rating: ${rating} out of 5 stars`}>
        {[...Array(fullStars)].map((_, i) => (
          <svg
            key={`full-${i}`}
            width="14"
            height="14"
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
            width="14"
            height="14"
            viewBox="0 0 24 24"
            className="text-dark-900"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="half-star">
                <stop offset="50%" stopColor="currentColor" />
                <stop offset="50%" stopColor="transparent" />
              </linearGradient>
            </defs>
            <polygon
              points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
              fill="url(#half-star)"
              stroke="currentColor"
              strokeWidth="1"
            />
          </svg>
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <svg
            key={`empty-${i}`}
            width="14"
            height="14"
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
      {reviewCount !== undefined && (
        <span className="text-footnote text-dark-500">({reviewCount})</span>
      )}
    </div>
  );
}

export default function Card({
  title,
  description,
  image,
  price,
  originalPrice,
  rating,
  reviewCount,
  badge,
  category,
  brand,
  href = "#",
  variant = "default",
}: CardProps) {
  const hasDiscount = originalPrice && originalPrice > price;
  const discountPercentage = hasDiscount
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  const cardContent = (
    <article
      className={`
        group bg-light-100 rounded-lg overflow-hidden transition-shadow duration-300 hover:shadow-lg
        ${variant === "compact" ? "flex flex-row" : "flex flex-col"}
        ${variant === "featured" ? "border-2 border-green" : "border border-light-300"}
      `}
    >
      {/* Image Container */}
      <div
        className={`
          relative bg-light-200 overflow-hidden
          ${variant === "compact" ? "w-24 h-24 flex-shrink-0" : "aspect-square w-full"}
          ${variant === "featured" ? "aspect-[4/3]" : ""}
        `}
      >
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes={variant === "compact" ? "96px" : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"}
        />
        {badge && (
          <span
            className={`
              absolute top-2 left-2 px-2 py-1 text-footnote font-medium rounded
              ${badge.toLowerCase() === "new" ? "bg-green text-light-100" : ""}
              ${badge.toLowerCase() === "sale" ? "bg-red text-light-100" : ""}
              ${badge.toLowerCase() === "popular" ? "bg-orange text-light-100" : ""}
              ${!["new", "sale", "popular"].includes(badge.toLowerCase()) ? "bg-dark-900 text-light-100" : ""}
            `}
          >
            {badge}
          </span>
        )}
        {hasDiscount && !badge && (
          <span className="absolute top-2 left-2 px-2 py-1 text-footnote font-medium rounded bg-red text-light-100">
            -{discountPercentage}%
          </span>
        )}
      </div>

      {/* Content */}
      <div
        className={`
          flex flex-col
          ${variant === "compact" ? "p-3 flex-1 min-w-0" : "p-4"}
        `}
      >
        {/* Category/Brand */}
        {(category || brand) && variant !== "compact" && (
          <div className="flex items-center gap-2 mb-1">
            {category && (
              <span className="text-footnote text-dark-500 uppercase tracking-wide">
                {category}
              </span>
            )}
            {category && brand && (
              <span className="text-footnote text-dark-500" aria-hidden="true">
                |
              </span>
            )}
            {brand && (
              <span className="text-footnote text-dark-700">{brand}</span>
            )}
          </div>
        )}

        {/* Title */}
        <h3
          className={`
            text-dark-900 line-clamp-2 group-hover:underline
            ${variant === "compact" ? "text-caption" : "text-body-medium"}
          `}
        >
          {title}
        </h3>

        {/* Description */}
        {description && variant !== "compact" && (
          <p className="text-footnote text-dark-700 line-clamp-2 mt-1">
            {description}
          </p>
        )}

        {/* Rating */}
        {rating !== undefined && variant !== "compact" && (
          <div className="mt-2">
            <StarRating rating={rating} reviewCount={reviewCount} />
          </div>
        )}

        {/* Price */}
        <div
          className={`
            flex items-baseline gap-2 mt-auto
            ${variant === "compact" ? "mt-1" : "mt-3"}
          `}
        >
          <span
            className={`
              font-medium text-dark-900
              ${variant === "compact" ? "text-caption" : "text-body-medium"}
            `}
          >
            ${price.toFixed(2)}
          </span>
          {hasDiscount && (
            <span className="text-footnote text-dark-500 line-through">
              ${originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Compact variant rating */}
        {rating !== undefined && variant === "compact" && (
          <div className="mt-1">
            <StarRating rating={rating} reviewCount={reviewCount} />
          </div>
        )}
      </div>
    </article>
  );

  return (
    <Link href={href} className="block">
      {cardContent}
    </Link>
  );
}
