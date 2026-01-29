import { pgTable, uuid, integer, timestamp } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const faceSizes = pgTable('face_sizes', {
  id: uuid('id').primaryKey().defaultRandom(),
  sizeMm: integer('size_mm').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const insertFaceSizeSchema = createInsertSchema(faceSizes, {
  sizeMm: z.number().int().positive(),
});

export const selectFaceSizeSchema = createSelectSchema(faceSizes);

export type FaceSize = typeof faceSizes.$inferSelect;
export type NewFaceSize = typeof faceSizes.$inferInsert;
