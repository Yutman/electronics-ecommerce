import { pgTable, uuid, varchar, timestamp } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const bandTypes = pgTable('band_types', {
  id: uuid('id').primaryKey().defaultRandom(),
  material: varchar('material', { length: 50 }).notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const insertBandTypeSchema = createInsertSchema(bandTypes, {
  material: z.string().min(1).max(50),
});

export const selectBandTypeSchema = createSelectSchema(bandTypes);

export type BandType = typeof bandTypes.$inferSelect;
export type NewBandType = typeof bandTypes.$inferInsert;
