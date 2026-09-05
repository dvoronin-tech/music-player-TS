import { integer, pgTable, text } from 'drizzle-orm/pg-core';

export const tracks = pgTable('tracks', {
	id: text('id').primaryKey(),
	title: text('title').notNull(),
	albumImg: text('album_img').notNull(),
	music: text('music').notNull(),
	auditions: integer('auditions').notNull().default(0),
});

export type Track = typeof tracks.$inferSelect;
export type NewTrack = typeof tracks.$inferInsert;
