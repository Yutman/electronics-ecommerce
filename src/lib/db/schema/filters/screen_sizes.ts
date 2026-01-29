import { pgTable, uuid, numeric, varchar, timestamp } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const screenSizes = pgTable('screen_sizes', {
  id: uuid('id').primaryKey().defaultRandom(),
  sizeInches: numeric('size_inches', { precision: 4, scale: 1 }).notNull(),
  resolution: varchar('resolution', { length: 20 }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const insertScreenSizeSchema = createInsertSchema(screenSizes, {
  sizeInches: z.string().regex(/^\d{1,3}(\.\d)?$/),
  resolution: z.string().max(20).optional().nullable(),
});

export const selectScreenSizeSchema = createSelectSchema(screenSizes);

export type ScreenSize = typeof screenSizes.$inferSelect;
export type NewScreenSize = typeof screenSizes.$inferInsert;
