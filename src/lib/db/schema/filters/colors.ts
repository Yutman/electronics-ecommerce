import { pgTable, uuid, varchar, timestamp } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const colors = pgTable('colors', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 50 }).notNull(),
  slug: varchar('slug', { length: 50 }).notNull().unique(),
  hexCode: varchar('hex_code', { length: 7 }).notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const insertColorSchema = createInsertSchema(colors, {
  name: z.string().min(1).max(50),
  slug: z.string().min(1).max(50).regex(/^[a-z0-9-]+$/),
  hexCode: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
});

export const selectColorSchema = createSelectSchema(colors);

export type Color = typeof colors.$inferSelect;
export type NewColor = typeof colors.$inferInsert;
