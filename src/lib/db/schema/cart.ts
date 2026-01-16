import { pgTable, uuid, integer, timestamp, text } from 'drizzle-orm/pg-core';
import { user } from './user';
import { guest } from './guest';
import { products } from '../schema';

export const cart = pgTable('cart', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: text('user_id').references(() => user.id, { onDelete: 'cascade' }),
  guestId: uuid('guest_id').references(() => guest.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const cartItem = pgTable('cart_item', {
  id: uuid('id').primaryKey().defaultRandom(),
  cartId: uuid('cart_id').references(() => cart.id, { onDelete: 'cascade' }).notNull(),
  productId: integer('product_id').references(() => products.id, { onDelete: 'cascade' }).notNull(),
  quantity: integer('quantity').notNull().default(1),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type Cart = typeof cart.$inferSelect;
export type NewCart = typeof cart.$inferInsert;
export type CartItem = typeof cartItem.$inferSelect;
export type NewCartItem = typeof cartItem.$inferInsert;

