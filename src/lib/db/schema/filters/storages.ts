import { pgTable, uuid, integer, timestamp } from 'drizzle-orm/pg-core';
import { pgEnum } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const storageTypeEnum = pgEnum('storage_type', ['SSD', 'HDD', 'eMMC']);

export const storages = pgTable('storages', {
  id: uuid('id').primaryKey().defaultRandom(),
  capacityGb: integer('capacity_gb').notNull(),
  type: storageTypeEnum('type'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const insertStorageSchema = createInsertSchema(storages, {
  capacityGb: z.number().int().positive(),
  type: z.enum(['SSD', 'HDD', 'eMMC']).optional().nullable(),
});

export const selectStorageSchema = createSelectSchema(storages);

export type Storage = typeof storages.$inferSelect;
export type NewStorage = typeof storages.$inferInsert;
