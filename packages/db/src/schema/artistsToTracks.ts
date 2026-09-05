import { integer, pgTable, primaryKey, text } from 'drizzle-orm/pg-core';
import { artists } from './artists.js';
import { tracks } from './tracks.js';

export const artistsToTracks = pgTable(
	'artists_to_tracks',
	{
		artistId: integer('artist_id')
			.notNull()
			.references(() => artists.id, { onDelete: 'cascade' }),
		trackId: text('track_id')
			.notNull()
			.references(() => tracks.id, { onDelete: 'cascade' }),
	},
	(table) => [primaryKey({ columns: [table.artistId, table.trackId] })],
);

export type ArtistToTrack = typeof artistsToTracks.$inferSelect;
export type NewArtistToTrack = typeof artistsToTracks.$inferInsert;
