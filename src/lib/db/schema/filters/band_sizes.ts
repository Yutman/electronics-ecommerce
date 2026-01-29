import { pgTable, uuid, integer, timestamp } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const bandSizes = pgTable('band_sizes', {
  id: uuid('id').primaryKey().defaultRandom(),
  sizeMm: integer('size_mm').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const insertBandSizeSchema = createInsertSchema(bandSizes, {
  sizeMm: z.number().int().positive(),
});

export const selectBandSizeSchema = createSelectSchema(bandSizes);

export type BandSize = typeof bandSizes.$inferSelect;
export type NewBandSize = typeof bandSizes.$inferInsert;
