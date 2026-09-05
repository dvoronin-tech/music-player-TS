import type { ApiArtistRef } from '@music-player/backend';

export function formatArtistNames(artists: ApiArtistRef[]): string {
	return artists.map((artist) => artist.name).join(', ');
}
