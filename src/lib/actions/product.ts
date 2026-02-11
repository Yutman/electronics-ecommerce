'use server';

import { db } from '@/lib/db';
import {
  products,
  productVariants,
  productImages,
  categories,
  brands,
  colors,
  genders,
} from '@/lib/db/schema';
import type { ProductImage } from '@/lib/db/schema';
import {
  and,
  eq,
  sql,
  desc,
  asc,
  inArray,
} from 'drizzle-orm';
import type { ParsedProductFilters } from '@/lib/utils/query';
import {
  buildProductWhereConditions,
  buildVariantWhereConditions,
  getOffset,
} from '@/lib/utils/query';

export interface ProductListItem {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  categoryId: number | null;
  brandId: number | null;
  genderId: number | null;
  isPublished: boolean;
  isFeatured: boolean;
  createdAt: Date | null;
  updatedAt: Date | null;
  categoryName: string | null;
  brandName: string | null;
  minPrice: string | null;
  maxPrice: string | null;
  images: ProductImage[];
}

export interface GetAllProductsResult {
  products: ProductListItem[];
  totalCount: number;
}

export interface ProductDetail {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  isPublished: boolean;
  isFeatured: boolean;
  createdAt: Date | null;
  updatedAt: Date | null;
  category: { id: number; name: string; slug: string } | null;
  brand: { id: number; name: string; slug: string } | null;
  gender: { id: number; name: string } | null;
  variants: {
    id: number;
    productId: number;
    colorId: number | null;
    size: string | null;
    price: string;
    compareAtPrice: string | null;
    stock: number;
    sku: string | null;
    isDefault: boolean;
    color: { id: number; name: string; hexCode: string | null } | null;
  }[];
  images: ProductImage[];
}

export async function getAllProducts(
  filters: ParsedProductFilters
): Promise<GetAllProductsResult> {
  const productConditions = buildProductWhereConditions(filters);
  const variantConditions = buildVariantWhereConditions(filters);
  const hasVariantFilters = variantConditions.length > 0;
  const offset = getOffset(filters.page, filters.limit);

  let sortColumn: SQL;
  switch (filters.sortBy) {
    case 'price_asc':
      sortColumn = asc(sql`min_price`);
      break;
    case 'price_desc':
      sortColumn = desc(sql`min_price`);
      break;
    case 'name_asc':
      sortColumn = asc(products.name);
      break;
    case 'name_desc':
      sortColumn = desc(products.name);
      break;
    case 'latest':
    default:
      sortColumn = desc(products.createdAt);
      break;
  }

  const variantJoinCondition = hasVariantFilters
    ? and(
        eq(productVariants.productId, products.id),
        ...variantConditions
      )
    : eq(productVariants.productId, products.id);

  const baseQuery = db
    .select({
      id: products.id,
      name: products.name,
      slug: products.slug,
      description: products.description,
      categoryId: products.categoryId,
      brandId: products.brandId,
      genderId: products.genderId,
      isPublished: products.isPublished,
      isFeatured: products.isFeatured,
      createdAt: products.createdAt,
      updatedAt: products.updatedAt,
      categoryName: categories.name,
      brandName: brands.name,
      minPrice: sql<string>`min(${productVariants.price})`.as('min_price'),
      maxPrice: sql<string>`max(${productVariants.price})`.as('max_price'),
    })
    .from(products)
    .innerJoin(productVariants, variantJoinCondition!)
    .leftJoin(categories, eq(products.categoryId, categories.id))
    .leftJoin(brands, eq(products.brandId, brands.id))
    .where(and(...productConditions))
    .groupBy(
      products.id,
      products.name,
      products.slug,
      products.description,
      products.categoryId,
      products.brandId,
      products.genderId,
      products.isPublished,
      products.isFeatured,
      products.createdAt,
      products.updatedAt,
      categories.name,
      brands.name
    );

  const countResult = await db
    .select({ count: sql<number>`count(*)` })
    .from(
      sql`(${baseQuery}) as filtered_products`
    );
  const totalCount = Number(countResult[0]?.count ?? 0);

  const productRows = await db
    .select({
      id: products.id,
      name: products.name,
      slug: products.slug,
      description: products.description,
      categoryId: products.categoryId,
      brandId: products.brandId,
      genderId: products.genderId,
      isPublished: products.isPublished,
      isFeatured: products.isFeatured,
      createdAt: products.createdAt,
      updatedAt: products.updatedAt,
      categoryName: categories.name,
      brandName: brands.name,
      minPrice: sql<string>`min(${productVariants.price})`.as('min_price'),
      maxPrice: sql<string>`max(${productVariants.price})`.as('max_price'),
    })
    .from(products)
    .innerJoin(productVariants, variantJoinCondition!)
    .leftJoin(categories, eq(products.categoryId, categories.id))
    .leftJoin(brands, eq(products.brandId, brands.id))
    .where(and(...productConditions))
    .groupBy(
      products.id,
      products.name,
      products.slug,
      products.description,
      products.categoryId,
      products.brandId,
      products.genderId,
      products.isPublished,
      products.isFeatured,
      products.createdAt,
      products.updatedAt,
      categories.name,
      brands.name
    )
    .orderBy(sortColumn)
    .limit(filters.limit)
    .offset(offset);

  if (productRows.length === 0) {
    return { products: [], totalCount };
  }

  const productIds = productRows.map((p) => p.id);

  let imageRows: ProductImage[];
  if (filters.colorIds.length > 0) {
    imageRows = await db
      .select()
      .from(productImages)
      .where(
        and(
          inArray(productImages.productId, productIds),
          inArray(productImages.colorId, filters.colorIds)
        )
      )
      .orderBy(asc(productImages.sortOrder));

    if (imageRows.length === 0) {
      imageRows = await db
        .select()
        .from(productImages)
        .where(inArray(productImages.productId, productIds))
        .orderBy(asc(productImages.sortOrder));
    }
  } else {
    imageRows = await db
      .select()
      .from(productImages)
      .where(inArray(productImages.productId, productIds))
      .orderBy(asc(productImages.sortOrder));
  }

  const imagesByProduct = new Map<number, ProductImage[]>();
  for (const img of imageRows) {
    const existing = imagesByProduct.get(img.productId);
    if (existing) {
      existing.push(img);
    } else {
      imagesByProduct.set(img.productId, [img]);
    }
  }

  const result: ProductListItem[] = productRows.map((row) => ({
    ...row,
    images: imagesByProduct.get(row.id) ?? [],
  }));

  return { products: result, totalCount };
}

export async function getProduct(
  productId: number
): Promise<ProductDetail | null> {
  const productRow = await db
    .select({
      id: products.id,
      name: products.name,
      slug: products.slug,
      description: products.description,
      isPublished: products.isPublished,
      isFeatured: products.isFeatured,
      createdAt: products.createdAt,
      updatedAt: products.updatedAt,
      categoryId: categories.id,
      categoryName: categories.name,
      categorySlug: categories.slug,
      brandId: brands.id,
      brandName: brands.name,
      brandSlug: brands.slug,
      genderId: genders.id,
      genderName: genders.name,
    })
    .from(products)
    .leftJoin(categories, eq(products.categoryId, categories.id))
    .leftJoin(brands, eq(products.brandId, brands.id))
    .leftJoin(genders, eq(products.genderId, genders.id))
    .where(eq(products.id, productId))
    .limit(1);

  if (productRow.length === 0) {
    return null;
  }

  const row = productRow[0];

  const [variantRows, imageRowsResult] = await Promise.all([
    db
      .select({
        id: productVariants.id,
        productId: productVariants.productId,
        colorId: productVariants.colorId,
        size: productVariants.size,
        price: productVariants.price,
        compareAtPrice: productVariants.compareAtPrice,
        stock: productVariants.stock,
        sku: productVariants.sku,
        isDefault: productVariants.isDefault,
        colorDbId: colors.id,
        colorName: colors.name,
        colorHexCode: colors.hexCode,
      })
      .from(productVariants)
      .leftJoin(colors, eq(productVariants.colorId, colors.id))
      .where(eq(productVariants.productId, productId)),
    db
      .select()
      .from(productImages)
      .where(eq(productImages.productId, productId))
      .orderBy(asc(productImages.sortOrder)),
  ]);

  const variantsWithColor = variantRows.map((v) => ({
    id: v.id,
    productId: v.productId,
    colorId: v.colorId,
    size: v.size,
    price: v.price,
    compareAtPrice: v.compareAtPrice,
    stock: v.stock,
    sku: v.sku,
    isDefault: v.isDefault,
    color: v.colorDbId
      ? { id: v.colorDbId, name: v.colorName!, hexCode: v.colorHexCode }
      : null,
  }));

  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    description: row.description,
    isPublished: row.isPublished,
    isFeatured: row.isFeatured,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
    category: row.categoryId
      ? { id: row.categoryId, name: row.categoryName!, slug: row.categorySlug! }
      : null,
    brand: row.brandId
      ? { id: row.brandId, name: row.brandName!, slug: row.brandSlug! }
      : null,
    gender: row.genderId
      ? { id: row.genderId, name: row.genderName! }
      : null,
    variants: variantsWithColor,
    images: imageRowsResult,
  };
}
