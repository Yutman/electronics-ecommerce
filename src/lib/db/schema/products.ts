import { pgTable, uuid, varchar, text, boolean, integer, timestamp } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';
import { categories } from './categories';
import { brands, conditions } from './filters';

export const products = pgTable('products', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  categoryId: uuid('category_id').notNull().references(() => categories.id, { onDelete: 'restrict' }),
  brandId: uuid('brand_id').notNull().references(() => brands.id, { onDelete: 'restrict' }),
  conditionId: uuid('condition_id').notNull().references(() => conditions.id, { onDelete: 'restrict' }),
  isPublished: boolean('is_published').notNull().default(false),
  defaultVariantId: uuid('default_variant_id'),
  batteryHealth: integer('battery_health'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const productsRelations = relations(products, ({ one }) => ({
  category: one(categories, {
    fields: [products.categoryId],
    references: [categories.id],
  }),
  brand: one(brands, {
    fields: [products.brandId],
    references: [brands.id],
  }),
  condition: one(conditions, {
    fields: [products.conditionId],
    references: [conditions.id],
  }),
}));

export const insertProductSchema = createInsertSchema(products, {
  name: z.string().min(1).max(255),
  description: z.string().optional().nullable(),
  categoryId: z.string().uuid(),
  brandId: z.string().uuid(),
  conditionId: z.string().uuid(),
  isPublished: z.boolean().optional(),
  defaultVariantId: z.string().uuid().optional().nullable(),
  batteryHealth: z.number().int().min(0).max(100).optional().nullable(),
});

export const selectProductSchema = createSelectSchema(products);

export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;
