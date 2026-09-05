import { relations } from 'drizzle-orm';
import { artists } from './artists.js';
import { artistsToTracks } from './artistsToTracks.js';
import { tokens } from './tokens.js';
import { tracks } from './tracks.js';
import { userLikedArtists } from './userLikedArtists.js';
import { userLikedTracks } from './userLikedTracks.js';
import { users } from './users.js';

export const usersRelations = relations(users, ({ one, many }) => ({
	token: one(tokens),
	likedTracks: many(userLikedTracks),
	likedArtists: many(userLikedArtists),
}));

export const tokensRelations = relations(tokens, ({ one }) => ({
	user: one(users, {
		fields: [tokens.userId],
		references: [users.id],
	}),
}));

export const tracksRelations = relations(tracks, ({ many }) => ({
	artistsToTracks: many(artistsToTracks),
	likedBy: many(userLikedTracks),
}));

export const artistsRelations = relations(artists, ({ many }) => ({
	artistsToTracks: many(artistsToTracks),
	likedBy: many(userLikedArtists),
}));

export const artistsToTracksRelations = relations(artistsToTracks, ({ one }) => ({
	artist: one(artists, {
		fields: [artistsToTracks.artistId],
		references: [artists.id],
	}),
	track: one(tracks, {
		fields: [artistsToTracks.trackId],
		references: [tracks.id],
	}),
}));

export const userLikedTracksRelations = relations(userLikedTracks, ({ one }) => ({
	user: one(users, {
		fields: [userLikedTracks.userId],
		references: [users.id],
	}),
	track: one(tracks, {
		fields: [userLikedTracks.trackId],
		references: [tracks.id],
	}),
}));

export const userLikedArtistsRelations = relations(
	userLikedArtists,
	({ one }) => ({
		user: one(users, {
			fields: [userLikedArtists.userId],
			references: [users.id],
		}),
		artist: one(artists, {
			fields: [userLikedArtists.artistId],
			references: [artists.id],
		}),
	}),
);
