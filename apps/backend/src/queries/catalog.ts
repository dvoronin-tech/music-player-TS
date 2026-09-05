import {
	artists,
	tracks,
	userLikedArtists,
	userLikedTracks,
} from '@music-player/db';
import { asc, desc, eq } from 'drizzle-orm';
import { db } from '@/db.js';
import {
	toApiArtist,
	toApiTrack,
	type ApiArtist,
	type ApiArtistDetail,
	type ApiTrack,
} from '@/mappers.js';

const trackWithArtists = {
	artistsToTracks: {
		with: {
			artist: true,
		},
	},
} as const;

const artistWithLinks = {
	artistsToTracks: true,
	likedBy: true,
} as const;

function mapArtist(artist: {
	id: number;
	name: string;
	artistImg: string;
	bigImg: string;
	artistsToTracks: Array<{ trackId: string }>;
	likedBy: readonly unknown[];
}): ApiArtist {
	return toApiArtist({
		...artist,
		trackIds: artist.artistsToTracks.map((link) => link.trackId),
		likes: artist.likedBy.length,
	});
}

export async function listTracks(): Promise<ApiTrack[]> {
	const rows = await db.query.tracks.findMany({
		with: trackWithArtists,
		orderBy: [asc(tracks.title)],
	});

	return rows.map(toApiTrack);
}

export async function getTrackById(id: string): Promise<ApiTrack | undefined> {
	const track = await db.query.tracks.findFirst({
		where: eq(tracks.id, id),
		with: trackWithArtists,
	});

	return track ? toApiTrack(track) : undefined;
}

export async function listLikedTracks(userId: string): Promise<ApiTrack[]> {
	const likes = await db.query.userLikedTracks.findMany({
		where: eq(userLikedTracks.userId, userId),
		orderBy: [desc(userLikedTracks.createdAt)],
		with: {
			track: {
				with: trackWithArtists,
			},
		},
	});

	return likes.map((like) => toApiTrack(like.track));
}

export async function listArtists(): Promise<ApiArtist[]> {
	const rows = await db.query.artists.findMany({
		with: artistWithLinks,
		orderBy: [asc(artists.name)],
	});

	return rows.map(mapArtist);
}

export async function getArtistById(
	id: number,
): Promise<ApiArtistDetail | undefined> {
	const artist = await db.query.artists.findFirst({
		where: eq(artists.id, id),
		with: {
			artistsToTracks: {
				with: {
					track: {
						with: trackWithArtists,
					},
				},
			},
			likedBy: true,
		},
	});

	if (!artist) {
		return undefined;
	}

	return {
		...mapArtist(artist),
		tracks: artist.artistsToTracks.map((link) => toApiTrack(link.track)),
	};
}

export async function listLikedArtists(userId: string): Promise<ApiArtist[]> {
	const likes = await db.query.userLikedArtists.findMany({
		where: eq(userLikedArtists.userId, userId),
		orderBy: [desc(userLikedArtists.createdAt)],
		with: {
			artist: {
				with: artistWithLinks,
			},
		},
	});

	return likes.map((like) => mapArtist(like.artist));
}

export async function trackExists(id: string): Promise<boolean> {
	const row = await db.query.tracks.findFirst({
		columns: { id: true },
		where: eq(tracks.id, id),
	});

	return Boolean(row);
}

export async function artistExists(id: number): Promise<boolean> {
	const row = await db.query.artists.findFirst({
		columns: { id: true },
		where: eq(artists.id, id),
	});

	return Boolean(row);
}
