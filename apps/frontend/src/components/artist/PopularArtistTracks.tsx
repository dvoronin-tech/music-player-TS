import { FC } from 'react';
import ArtistTrackCard from '@/components/artistTrackCards/artistTrackCards';
import type { ApiTrack } from '@music-player/backend';

interface PopularArtistTracksProps {
	tracks: ApiTrack[];
}

export const PopularArtistTracks: FC<PopularArtistTracksProps> = ({
	tracks,
}) => {
	if (tracks.length === 0) {
		return null;
	}

	return tracks.slice(0, 3).map((item) => (
		<ArtistTrackCard
			key={item.id}
			playList={tracks}
			track={item}
		/>
	));
};
