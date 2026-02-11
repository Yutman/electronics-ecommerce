import {
  eq,
  gte,
  lte,
  ilike,
  inArray,
  desc,
  asc,
  SQL,
} from 'drizzle-orm';
import {
  products,
  productVariants,
} from '@/lib/db/schema';

export interface ProductFilterParams {
  search?: string;
  category?: string;
  brand?: string | string[];
  color?: string | string[];
  gender?: string;
  priceMin?: string;
  priceMax?: string;
  sortBy?: string;
  page?: string;
  limit?: string;
}

export interface ParsedProductFilters {
  search: string | undefined;
  categoryId: number | undefined;
  brandIds: number[];
  colorIds: number[];
  genderId: number | undefined;
  priceMin: number | undefined;
  priceMax: number | undefined;
  sortBy: string;
  page: number;
  limit: number;
}

function toNumberOrUndefined(value: string | undefined): number | undefined {
  if (!value) return undefined;
  const num = Number(value);
  return isNaN(num) ? undefined : num;
}

function toArray(value: string | string[] | undefined): string[] {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

export function parseFilterParams(
  searchParams: Record<string, string | string[] | undefined>
): ParsedProductFilters {
  const brandArr = toArray(searchParams.brand);
  const colorArr = toArray(searchParams.color);

  const brandIds = brandArr.map(Number).filter((n) => !isNaN(n));
  const colorIds = colorArr.map(Number).filter((n) => !isNaN(n));

  const page = Math.max(1, toNumberOrUndefined(
    Array.isArray(searchParams.page) ? searchParams.page[0] : searchParams.page
  ) ?? 1);

  const limit = Math.min(
    100,
    Math.max(1, toNumberOrUndefined(
      Array.isArray(searchParams.limit) ? searchParams.limit[0] : searchParams.limit
    ) ?? 12)
  );

  const sortBy = (
    Array.isArray(searchParams.sortBy) ? searchParams.sortBy[0] : searchParams.sortBy
  ) ?? 'latest';

  return {
    search: Array.isArray(searchParams.search)
      ? searchParams.search[0]
      : searchParams.search,
    categoryId: toNumberOrUndefined(
      Array.isArray(searchParams.category) ? searchParams.category[0] : searchParams.category
    ),
    brandIds,
    colorIds,
    genderId: toNumberOrUndefined(
      Array.isArray(searchParams.gender) ? searchParams.gender[0] : searchParams.gender
    ),
    priceMin: toNumberOrUndefined(
      Array.isArray(searchParams.priceMin) ? searchParams.priceMin[0] : searchParams.priceMin
    ),
    priceMax: toNumberOrUndefined(
      Array.isArray(searchParams.priceMax) ? searchParams.priceMax[0] : searchParams.priceMax
    ),
    sortBy,
    page,
    limit,
  };
}

export function buildProductWhereConditions(
  filters: ParsedProductFilters
): SQL[] {
  const conditions: SQL[] = [];

  conditions.push(eq(products.isPublished, true));

  if (filters.search) {
    conditions.push(ilike(products.name, `%${filters.search}%`));
  }

  if (filters.categoryId !== undefined) {
    conditions.push(eq(products.categoryId, filters.categoryId));
  }

  if (filters.brandIds.length > 0) {
    conditions.push(inArray(products.brandId, filters.brandIds));
  }

  if (filters.genderId !== undefined) {
    conditions.push(eq(products.genderId, filters.genderId));
  }

  return conditions;
}

export function buildVariantWhereConditions(
  filters: ParsedProductFilters
): SQL[] {
  const conditions: SQL[] = [];

  if (filters.colorIds.length > 0) {
    conditions.push(inArray(productVariants.colorId, filters.colorIds));
  }

  if (filters.priceMin !== undefined) {
    conditions.push(gte(productVariants.price, String(filters.priceMin)));
  }

  if (filters.priceMax !== undefined) {
    conditions.push(lte(productVariants.price, String(filters.priceMax)));
  }

  return conditions;
}

export function buildSortOrder(sortBy: string): SQL {
  switch (sortBy) {
    case 'price_asc':
      return asc(productVariants.price);
    case 'price_desc':
      return desc(productVariants.price);
    case 'name_asc':
      return asc(products.name);
    case 'name_desc':
      return desc(products.name);
    case 'latest':
    default:
      return desc(products.createdAt);
  }
}

export function getOffset(page: number, limit: number): number {
  return (page - 1) * limit;
}

export type { SQL };
