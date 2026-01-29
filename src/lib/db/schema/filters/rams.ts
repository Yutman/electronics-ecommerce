import { pgTable, uuid, integer, varchar, timestamp } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const rams = pgTable('rams', {
  id: uuid('id').primaryKey().defaultRandom(),
  sizeGb: integer('size_gb').notNull(),
  type: varchar('type', { length: 20 }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const insertRamSchema = createInsertSchema(rams, {
  sizeGb: z.number().int().positive(),
  type: z.string().max(20).optional().nullable(),
});

export const selectRamSchema = createSelectSchema(rams);

export type Ram = typeof rams.$inferSelect;
export type NewRam = typeof rams.$inferInsert;
