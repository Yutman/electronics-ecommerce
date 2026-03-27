'use server';

import { db } from '@/lib/db';
import {
  products,
  productVariants,
  productImages,
  categories,
  brands,
  conditions,
  cpus,
  rams,
  storages,
  screenSizes,
  colors,
  connectivities,
  simSlots,
  bandSizes,
  bandTypes,
  faceSizes,
  series,
} from '@/lib/db/schema';
import {
  and,
  or,
  eq,
  ilike,
  inArray,
  sql,
  exists,
  desc,
  asc,
  count,
  type SQL,
} from 'drizzle-orm';
import type { ProductQueryObject } from '@/lib/utils/query';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ProductListItem {
  id: string;
  name: string;
  description: string | null;
  batteryHealth: number | null;
  defaultVariantId: string | null;
  createdAt: Date;
  categoryName: string;
  categorySlug: string;
  brandName: string;
  brandSlug: string;
  conditionLabel: string;
  conditionSlug: string;
  minPrice: number;
  maxPrice: number;
  hasSale: boolean;
  images: string[];
}

export interface GetAllProductsResult {
  products: ProductListItem[];
  totalCount: number;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Build an EXISTS sub-query checking that a product has a variant matching the given join + condition. */
function variantExists(
  joinTable: Parameters<typeof db.select>[0] extends undefined ? never : unknown,
  joinCondition: SQL,
  filterCondition: SQL,
): SQL {
  return exists(
    db
      .select({ val: sql`1` })
      .from(productVariants)
      .innerJoin(joinTable as never, joinCondition)
      .where(and(eq(productVariants.productId, products.id), filterCondition)),
  );
}

/** Scalar sub-query: effective (lowest) price for a product's variants. */
const minPriceSql = sql<number>`(
  SELECT MIN(COALESCE(pv.sale_price, pv.price)::numeric)
  FROM product_variants pv
  WHERE pv.product_id = ${products.id}
)`;

/** Scalar sub-query: maximum listed price for a product's variants. */
const maxPriceSql = sql<number>`(
  SELECT MAX(pv.price::numeric)
  FROM product_variants pv
  WHERE pv.product_id = ${products.id}
)`;

/** Scalar sub-query: true when at least one variant has an active sale price. */
const hasSaleSql = sql<boolean>`(
  SELECT EXISTS(
    SELECT 1 FROM product_variants pv
    WHERE pv.product_id = ${products.id}
      AND pv.sale_price IS NOT NULL
      AND pv.sale_price::numeric < pv.price::numeric
  )
)`;

// ---------------------------------------------------------------------------
// buildWhereConditions
// ---------------------------------------------------------------------------

function buildWhereConditions(q: ProductQueryObject): SQL[] {
  const conds: SQL[] = [eq(products.isPublished, true)];

  // Full-text search (ILIKE on name & description)
  if (q.search) {
    const escaped = q.search.replace(/[%_\\]/g, '\\$&');
    const term = `%${escaped}%`;
    conds.push(
      or(ilike(products.name, term), ilike(products.description, term))!,
    );
  }

  // -- Product-level filters (joined tables) ----------------------------------

  if (q.categorySlug) {
    conds.push(eq(categories.slug, q.categorySlug));
  }

  if (q.brandSlugs?.length) {
    conds.push(inArray(brands.slug, q.brandSlugs));
  }

  if (q.conditionSlugs?.length) {
    conds.push(inArray(conditions.slug, q.conditionSlugs));
  }

  // -- Variant-level filters (EXISTS sub-queries) -----------------------------

  if (q.cpuSlugs?.length) {
    conds.push(
      variantExists(cpus, eq(productVariants.cpuId, cpus.id), inArray(cpus.slug, q.cpuSlugs)),
    );
  }

  if (q.ramSizeGbs?.length) {
    conds.push(
      variantExists(rams, eq(productVariants.ramId, rams.id), inArray(rams.sizeGb, q.ramSizeGbs)),
    );
  }

  if (q.storageCapacityGbs?.length) {
    conds.push(
      variantExists(
        storages,
        eq(productVariants.storageId, storages.id),
        inArray(storages.capacityGb, q.storageCapacityGbs),
      ),
    );
  }

  if (q.screenSizeValues?.length) {
    conds.push(
      variantExists(
        screenSizes,
        eq(productVariants.screenSizeId, screenSizes.id),
        inArray(screenSizes.sizeInches, q.screenSizeValues),
      ),
    );
  }

  if (q.colorSlugs?.length) {
    conds.push(
      variantExists(
        colors,
        eq(productVariants.colorId, colors.id),
        inArray(colors.slug, q.colorSlugs),
      ),
    );
  }

  if (q.simSlotTypes?.length) {
    conds.push(
      variantExists(
        simSlots,
        eq(productVariants.simSlotId, simSlots.id),
        inArray(simSlots.type, q.simSlotTypes as ['single' | 'dual' | 'eSIM']),
      ),
    );
  }

  if (q.connectivitySlugs?.length) {
    // connectivities table has `type` (varchar) with no slug column.
    // Match via case-insensitive comparison against the filter values.
    conds.push(
      exists(
        db
          .select({ val: sql`1` })
          .from(productVariants)
          .innerJoin(connectivities, eq(productVariants.connectivityId, connectivities.id))
          .where(
            and(
              eq(productVariants.productId, products.id),
              sql`LOWER(${connectivities.type}) IN (${sql.join(
                q.connectivitySlugs.map((s) => sql`${s.toLowerCase()}`),
                sql`, `,
              )})`,
            ),
          ),
      ),
    );
  }

  if (q.bandSizeMms?.length) {
    conds.push(
      variantExists(
        bandSizes,
        eq(productVariants.bandSizeId, bandSizes.id),
        inArray(bandSizes.sizeMm, q.bandSizeMms),
      ),
    );
  }

  if (q.bandTypeSlugs?.length) {
    // bandTypes table uses `material` (varchar) with no slug column.
    conds.push(
      exists(
        db
          .select({ val: sql`1` })
          .from(productVariants)
          .innerJoin(bandTypes, eq(productVariants.bandTypeId, bandTypes.id))
          .where(
            and(
              eq(productVariants.productId, products.id),
              sql`LOWER(${bandTypes.material}) IN (${sql.join(
                q.bandTypeSlugs.map((s) => sql`${s.toLowerCase()}`),
                sql`, `,
              )})`,
            ),
          ),
      ),
    );
  }

  if (q.faceSizeMms?.length) {
    conds.push(
      variantExists(
        faceSizes,
        eq(productVariants.faceSizeId, faceSizes.id),
        inArray(faceSizes.sizeMm, q.faceSizeMms),
      ),
    );
  }

  if (q.seriesSlugs?.length) {
    conds.push(
      variantExists(
        series,
        eq(productVariants.seriesId, series.id),
        inArray(series.slug, q.seriesSlugs),
      ),
    );
  }

  // -- Price range (scalar sub-query) -----------------------------------------

  if (q.priceMin !== undefined) {
    conds.push(sql`${minPriceSql} >= ${q.priceMin}`);
  }

  if (q.priceMax !== undefined) {
    conds.push(sql`${minPriceSql} <= ${q.priceMax}`);
  }

  return conds;
}

// ---------------------------------------------------------------------------
// getAllProducts
// ---------------------------------------------------------------------------

export async function getAllProducts(
  queryObj: ProductQueryObject,
): Promise<GetAllProductsResult> {
  const { page, limit, sortBy } = queryObj;
  const offset = (page - 1) * limit;

  const whereConds = buildWhereConditions(queryObj);
  const whereClause = whereConds.length > 0 ? and(...whereConds) : undefined;

  // -- Determine ORDER BY -----------------------------------------------------

  let orderByExpr: SQL;
  switch (sortBy) {
    case 'price_asc':
      orderByExpr = asc(minPriceSql);
      break;
    case 'price_desc':
      orderByExpr = desc(minPriceSql);
      break;
    case 'featured':
      orderByExpr = desc(products.createdAt);
      break;
    case 'newest':
    default:
      orderByExpr = desc(products.createdAt);
      break;
  }

  // -- Run count & data queries in parallel -----------------------------------

  const [countResult, rows] = await Promise.all([
    // Total count (no pagination)
    db
      .select({ totalCount: count() })
      .from(products)
      .innerJoin(categories, eq(products.categoryId, categories.id))
      .innerJoin(brands, eq(products.brandId, brands.id))
      .innerJoin(conditions, eq(products.conditionId, conditions.id))
      .where(whereClause),

    // Paginated product rows with aggregated prices
    db
      .select({
        id: products.id,
        name: products.name,
        description: products.description,
        batteryHealth: products.batteryHealth,
        defaultVariantId: products.defaultVariantId,
        createdAt: products.createdAt,
        categoryName: categories.name,
        categorySlug: categories.slug,
        brandName: brands.name,
        brandSlug: brands.slug,
        conditionLabel: conditions.label,
        conditionSlug: conditions.slug,
        minPrice: minPriceSql,
        maxPrice: maxPriceSql,
        hasSale: hasSaleSql,
      })
      .from(products)
      .innerJoin(categories, eq(products.categoryId, categories.id))
      .innerJoin(brands, eq(products.brandId, brands.id))
      .innerJoin(conditions, eq(products.conditionId, conditions.id))
      .where(whereClause)
      .orderBy(orderByExpr)
      .limit(limit)
      .offset(offset),
  ]);

  const totalCount = countResult[0]?.totalCount ?? 0;

  if (rows.length === 0) {
    return { products: [], totalCount };
  }

  // -- Fetch images for the returned products ---------------------------------

  const productIds = rows.map((r) => r.id);

  // When a color filter is active, prefer variant-specific images for that color
  let imageRows: { productId: string; url: string; sortOrder: number; isPrimary: boolean; variantColorSlug: string | null }[];

  if (queryObj.colorSlugs?.length) {
    imageRows = await db
      .select({
        productId: productImages.productId,
        url: productImages.url,
        sortOrder: productImages.sortOrder,
        isPrimary: productImages.isPrimary,
        variantColorSlug: colors.slug,
      })
      .from(productImages)
      .leftJoin(productVariants, eq(productImages.variantId, productVariants.id))
      .leftJoin(colors, eq(productVariants.colorId, colors.id))
      .where(inArray(productImages.productId, productIds))
      .orderBy(
        // Prioritise color-matched variant images, then primary, then sort order
        sql`CASE WHEN ${colors.slug} IN (${sql.join(
          queryObj.colorSlugs.map((s) => sql`${s}`),
          sql`, `,
        )}) THEN 0 ELSE 1 END`,
        desc(productImages.isPrimary),
        asc(productImages.sortOrder),
      );
  } else {
    imageRows = await db
      .select({
        productId: productImages.productId,
        url: productImages.url,
        sortOrder: productImages.sortOrder,
        isPrimary: productImages.isPrimary,
        variantColorSlug: sql<string | null>`NULL`,
      })
      .from(productImages)
      .where(inArray(productImages.productId, productIds))
      .orderBy(desc(productImages.isPrimary), asc(productImages.sortOrder));
  }

  // Group images by product id
  const imagesByProduct = new Map<string, string[]>();
  for (const img of imageRows) {
    const list = imagesByProduct.get(img.productId) ?? [];
    if (!list.includes(img.url)) {
      list.push(img.url);
    }
    imagesByProduct.set(img.productId, list);
  }

  // -- Assemble result --------------------------------------------------------

  const productList: ProductListItem[] = rows.map((row) => ({
    id: row.id,
    name: row.name,
    description: row.description,
    batteryHealth: row.batteryHealth,
    defaultVariantId: row.defaultVariantId,
    createdAt: row.createdAt,
    categoryName: row.categoryName,
    categorySlug: row.categorySlug,
    brandName: row.brandName,
    brandSlug: row.brandSlug,
    conditionLabel: row.conditionLabel,
    conditionSlug: row.conditionSlug,
    minPrice: Number(row.minPrice) || 0,
    maxPrice: Number(row.maxPrice) || 0,
    hasSale: Boolean(row.hasSale),
    images: imagesByProduct.get(row.id) ?? [],
  }));

  return { products: productList, totalCount };
}

// ---------------------------------------------------------------------------
// getProduct
// ---------------------------------------------------------------------------

export async function getProduct(productId: string) {
  const product = await db.query.products.findFirst({
    where: eq(products.id, productId),
    with: {
      category: true,
      brand: true,
      condition: true,
      variants: {
        with: {
          cpu: true,
          ram: true,
          storage: true,
          screenSize: true,
          color: true,
          connectivity: true,
          simSlot: true,
          bandSize: true,
          bandType: true,
          faceSize: true,
          series: true,
          images: {
            orderBy: [asc(productImages.sortOrder)],
          },
        },
      },
      images: {
        orderBy: [asc(productImages.sortOrder)],
      },
    },
  });

  return product ?? null;
}
