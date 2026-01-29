import { pgTable, uuid, timestamp } from 'drizzle-orm/pg-core';
import { pgEnum } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const simSlotTypeEnum = pgEnum('sim_slot_type', ['single', 'dual', 'eSIM']);

export const simSlots = pgTable('sim_slots', {
  id: uuid('id').primaryKey().defaultRandom(),
  type: simSlotTypeEnum('type').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const insertSimSlotSchema = createInsertSchema(simSlots, {
  type: z.enum(['single', 'dual', 'eSIM']),
});

export const selectSimSlotSchema = createSelectSchema(simSlots);

export type SimSlot = typeof simSlots.$inferSelect;
export type NewSimSlot = typeof simSlots.$inferInsert;
