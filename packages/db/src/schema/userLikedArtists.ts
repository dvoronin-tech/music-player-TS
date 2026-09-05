import {
	integer,
	pgTable,
	primaryKey,
	timestamp,
	uuid,
} from 'drizzle-orm/pg-core';
import { artists } from './artists.js';
import { users } from './users.js';

export const userLikedArtists = pgTable(
	'user_liked_artists',
	{
		userId: uuid('user_id')
			.notNull()
			.references(() => users.id, { onDelete: 'cascade' }),
		artistId: integer('artist_id')
			.notNull()
			.references(() => artists.id, { onDelete: 'cascade' }),
		createdAt: timestamp('created_at', { withTimezone: true })
			.notNull()
			.defaultNow(),
	},
	(table) => [primaryKey({ columns: [table.userId, table.artistId] })],
);

export type UserLikedArtist = typeof userLikedArtists.$inferSelect;
export type NewUserLikedArtist = typeof userLikedArtists.$inferInsert;
