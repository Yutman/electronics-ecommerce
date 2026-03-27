import { pgTable, uuid, varchar, numeric, integer, real, jsonb, timestamp } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';
import { products } from './products';
import {
  cpus,
  rams,
  screenSizes,
  storages,
  colors,
  connectivities,
  simSlots,
  bandSizes,
  bandTypes,
  faceSizes,
  series,
} from './filters';
import { productImages } from './product_images';

export const productVariants = pgTable('product_variants', {
  id: uuid('id').primaryKey().defaultRandom(),
  productId: uuid('product_id').notNull().references(() => products.id, { onDelete: 'cascade' }),
  sku: varchar('sku', { length: 100 }).notNull().unique(),
  price: numeric('price', { precision: 10, scale: 2 }).notNull(),
  salePrice: numeric('sale_price', { precision: 10, scale: 2 }),
  cpuId: uuid('cpu_id').references(() => cpus.id, { onDelete: 'set null' }),
  ramId: uuid('ram_id').references(() => rams.id, { onDelete: 'set null' }),
  screenSizeId: uuid('screen_size_id').references(() => screenSizes.id, { onDelete: 'set null' }),
  storageId: uuid('storage_id').references(() => storages.id, { onDelete: 'set null' }),
  colorId: uuid('color_id').references(() => colors.id, { onDelete: 'set null' }),
  connectivityId: uuid('connectivity_id').references(() => connectivities.id, { onDelete: 'set null' }),
  simSlotId: uuid('sim_slot_id').references(() => simSlots.id, { onDelete: 'set null' }),
  bandSizeId: uuid('band_size_id').references(() => bandSizes.id, { onDelete: 'set null' }),
  bandTypeId: uuid('band_type_id').references(() => bandTypes.id, { onDelete: 'set null' }),
  faceSizeId: uuid('face_size_id').references(() => faceSizes.id, { onDelete: 'set null' }),
  seriesId: uuid('series_id').references(() => series.id, { onDelete: 'set null' }),
  inStock: integer('in_stock').notNull().default(0),
  weight: real('weight'),
  dimensions: jsonb('dimensions').$type<{ length: number; width: number; height: number }>(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const productVariantsRelations = relations(productVariants, ({ one, many }) => ({
  product: one(products, {
    fields: [productVariants.productId],
    references: [products.id],
  }),
  images: many(productImages),
  cpu: one(cpus, {
    fields: [productVariants.cpuId],
    references: [cpus.id],
  }),
  ram: one(rams, {
    fields: [productVariants.ramId],
    references: [rams.id],
  }),
  screenSize: one(screenSizes, {
    fields: [productVariants.screenSizeId],
    references: [screenSizes.id],
  }),
  storage: one(storages, {
    fields: [productVariants.storageId],
    references: [storages.id],
  }),
  color: one(colors, {
    fields: [productVariants.colorId],
    references: [colors.id],
  }),
  connectivity: one(connectivities, {
    fields: [productVariants.connectivityId],
    references: [connectivities.id],
  }),
  simSlot: one(simSlots, {
    fields: [productVariants.simSlotId],
    references: [simSlots.id],
  }),
  bandSize: one(bandSizes, {
    fields: [productVariants.bandSizeId],
    references: [bandSizes.id],
  }),
  bandType: one(bandTypes, {
    fields: [productVariants.bandTypeId],
    references: [bandTypes.id],
  }),
  faceSize: one(faceSizes, {
    fields: [productVariants.faceSizeId],
    references: [faceSizes.id],
  }),
  series: one(series, {
    fields: [productVariants.seriesId],
    references: [series.id],
  }),
}));


const dimensionsSchema = z.object({
  length: z.number().positive(),
  width: z.number().positive(),
  height: z.number().positive(),
});

export const insertProductVariantSchema = createInsertSchema(productVariants, {
  productId: z.string().uuid(),
  sku: z.string().min(1).max(100),
  price: z.string().regex(/^\d+(\.\d{1,2})?$/),
  salePrice: z.string().regex(/^\d+(\.\d{1,2})?$/).optional().nullable(),
  cpuId: z.string().uuid().optional().nullable(),
  ramId: z.string().uuid().optional().nullable(),
  screenSizeId: z.string().uuid().optional().nullable(),
  storageId: z.string().uuid().optional().nullable(),
  colorId: z.string().uuid().optional().nullable(),
  connectivityId: z.string().uuid().optional().nullable(),
  simSlotId: z.string().uuid().optional().nullable(),
  bandSizeId: z.string().uuid().optional().nullable(),
  bandTypeId: z.string().uuid().optional().nullable(),
  faceSizeId: z.string().uuid().optional().nullable(),
  seriesId: z.string().uuid().optional().nullable(),
  inStock: z.number().int().min(0).optional(),
  weight: z.number().positive().optional().nullable(),
  dimensions: dimensionsSchema.optional().nullable(),
});

export const selectProductVariantSchema = createSelectSchema(productVariants);

export type ProductVariant = typeof productVariants.$inferSelect;
export type NewProductVariant = typeof productVariants.$inferInsert;
