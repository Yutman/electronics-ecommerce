import { pgTable, uuid, varchar, integer, timestamp } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const cpus = pgTable('cpus', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 100 }).notNull(),
  slug: varchar('slug', { length: 100 }).notNull().unique(),
  cores: integer('cores'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const insertCpuSchema = createInsertSchema(cpus, {
  name: z.string().min(1).max(100),
  slug: z.string().min(1).max(100).regex(/^[a-z0-9-]+$/),
  cores: z.number().int().positive().optional().nullable(),
});

export const selectCpuSchema = createSelectSchema(cpus);

export type Cpu = typeof cpus.$inferSelect;
export type NewCpu = typeof cpus.$inferInsert;
