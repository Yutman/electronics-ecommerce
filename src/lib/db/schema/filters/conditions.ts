import { pgTable, uuid, varchar, text, timestamp } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const conditions = pgTable('conditions', {
  id: uuid('id').primaryKey().defaultRandom(),
  label: varchar('label', { length: 50 }).notNull(),
  slug: varchar('slug', { length: 50 }).notNull().unique(),
  description: text('description'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const insertConditionSchema = createInsertSchema(conditions, {
  label: z.string().min(1).max(50),
  slug: z.string().min(1).max(50).regex(/^[a-z0-9-]+$/),
  description: z.string().optional().nullable(),
});

export const selectConditionSchema = createSelectSchema(conditions);

export type Condition = typeof conditions.$inferSelect;
export type NewCondition = typeof conditions.$inferInsert;
