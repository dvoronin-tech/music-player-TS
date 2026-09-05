import { pgTable, primaryKey, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { tracks } from './tracks.js';
import { users } from './users.js';

export const userLikedTracks = pgTable(
	'user_liked_tracks',
	{
		userId: uuid('user_id')
			.notNull()
			.references(() => users.id, { onDelete: 'cascade' }),
		trackId: text('track_id')
			.notNull()
			.references(() => tracks.id, { onDelete: 'cascade' }),
		createdAt: timestamp('created_at', { withTimezone: true })
			.notNull()
			.defaultNow(),
	},
	(table) => [primaryKey({ columns: [table.userId, table.trackId] })],
);

export type UserLikedTrack = typeof userLikedTracks.$inferSelect;
export type NewUserLikedTrack = typeof userLikedTracks.$inferInsert;
