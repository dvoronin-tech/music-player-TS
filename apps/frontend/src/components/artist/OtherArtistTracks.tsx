import { FC, Suspense, lazy } from 'react';
import { HomeTrackCard } from '@/components/homeTrackCards/homeTrackCards';
import type { ApiTrack } from '@music-player/backend';

const SmallTrackCard = lazy(
	() => import('@/components/smallTrackCard/smallTrackCard'),
);

interface OtherArtistTracksProps {
	tracks: ApiTrack[];
	isMobile?: boolean;
}

export const OtherArtistTracks: FC<OtherArtistTracksProps> = ({
	tracks,
	isMobile = false,
}) => {
	if (tracks.length === 0) {
		return null;
	}

	const otherTracks = tracks.slice(3);

	if (isMobile) {
		return (
			<Suspense fallback={null}>
				{otherTracks.map((item) => (
					<SmallTrackCard
						key={item.id}
						track={item}
						playList={tracks}
						showRemoveButton={false}
					/>
				))}
			</Suspense>
		);
	}

	return otherTracks.map((item) => (
		<HomeTrackCard key={item.id} track={item} playList={tracks} />
	));
};
