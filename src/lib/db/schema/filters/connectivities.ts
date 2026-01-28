import { pgTable, uuid, varchar, timestamp } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const connectivities = pgTable('connectivities', {
  id: uuid('id').primaryKey().defaultRandom(),
  type: varchar('type', { length: 50 }).notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const insertConnectivitySchema = createInsertSchema(connectivities, {
  type: z.string().min(1).max(50),
});

export const selectConnectivitySchema = createSelectSchema(connectivities);

export type Connectivity = typeof connectivities.$inferSelect;
export type NewConnectivity = typeof connectivities.$inferInsert;
