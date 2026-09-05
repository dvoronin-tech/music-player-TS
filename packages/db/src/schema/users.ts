import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
	id: uuid('id').primaryKey().defaultRandom(),
	username: text('username').notNull().unique(),
	email: text('email').notNull().unique(),
	passwordHash: text('password_hash').notNull(),
	regDate: timestamp('reg_date', { withTimezone: true }).notNull().defaultNow(),
	userImg: text('user_img'),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
