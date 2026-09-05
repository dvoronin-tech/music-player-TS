import { integer, pgTable, text } from 'drizzle-orm/pg-core';

export const artists = pgTable('artists', {
	id: integer('id').primaryKey().generatedByDefaultAsIdentity(),
	name: text('name').notNull().unique(),
	artistImg: text('artist_img').notNull(),
	bigImg: text('big_img').notNull(),
	likes: integer('likes').notNull().default(0),
});

export type Artist = typeof artists.$inferSelect;
export type NewArtist = typeof artists.$inferInsert;
