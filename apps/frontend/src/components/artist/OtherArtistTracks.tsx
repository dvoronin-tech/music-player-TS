import { FC } from 'react';
import { HomeTrackCard } from '@/components/homeTrackCards/homeTrackCards';
import type { ApiTrack } from '@music-player/backend';

interface OtherArtistTracksProps {
	tracks: ApiTrack[];
}

export const OtherArtistTracks: FC<OtherArtistTracksProps> = ({ tracks }) => {
	if (tracks.length === 0) {
		return null;
	}

	return tracks.slice(3).map((item) => (
		<HomeTrackCard key={item.id} track={item} playList={tracks} />
	));
};
