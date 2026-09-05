import type { User } from '@music-player/db';
import { toMediaUrl } from '@/utils/media.js';

export type ApiArtistRef = {
	id: number;
	name: string;
};

export type ApiTrack = {
	id: string;
	title: string;
	artists: ApiArtistRef[];
	albumImg: string;
	music: string;
	auditions: number;
};

export type ApiArtist = {
	id: number;
	name: string;
	artistImg: string;
	bigImg: string;
	likes: number;
	trackIds: string[];
};

export type ApiArtistDetail = ApiArtist & {
	tracks: ApiTrack[];
};

export type ApiUser = {
	id: string;
	username: string;
	email: string;
	regDate: string;
	userImg: string | null;
};

type TrackWithArtists = {
	id: string;
	title: string;
	albumImg: string;
	music: string;
	auditions: number;
	artistsToTracks: Array<{
		artist: { id: number; name: string };
	}>;
};

type ArtistWithLinks = {
	id: number;
	name: string;
	artistImg: string;
	bigImg: string;
	trackIds: string[];
	likes: number;
};

export function toApiTrack(track: TrackWithArtists): ApiTrack {
	return {
		id: track.id,
		title: track.title,
		artists: track.artistsToTracks.map(({ artist }) => ({
			id: artist.id,
			name: artist.name,
		})),
		albumImg: toMediaUrl(track.albumImg),
		music: toMediaUrl(track.music),
		auditions: track.auditions,
	};
}

export function toApiArtist(artist: ArtistWithLinks): ApiArtist {
	return {
		id: artist.id,
		name: artist.name,
		artistImg: toMediaUrl(artist.artistImg),
		bigImg: toMediaUrl(artist.bigImg),
		likes: artist.likes,
		trackIds: artist.trackIds,
	};
}

export function toApiUser(user: User): ApiUser {
	return {
		id: user.id,
		username: user.username,
		email: user.email,
		regDate: user.regDate.toISOString(),
		userImg: user.userImg ? toMediaUrl(user.userImg) : null,
	};
}
