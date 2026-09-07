import { FC, memo } from 'react';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import type { SerializedError } from '@reduxjs/toolkit';
import type { ApiTrack } from '@music-player/backend';

import { HomeTrackCard } from './homeTrackCards';
import { ArtistsError } from '@/components/errorMessages/artistsError';

interface HomeTracksProps {
	tracks: ApiTrack[];
	error?: FetchBaseQueryError | SerializedError;
}

export const HomeTracks: FC<HomeTracksProps> = memo(({ tracks, error }) => {
	if (tracks) {
		if (!error) {
			return tracks.map((item) => {
				return (
					<HomeTrackCard
						key={item.id}
						track={item}
						playList={tracks}
					/>
				);
			});
		}

		const errorMessage =
			error && 'data' in error && typeof error.data === 'string'
				? error.data
				: 'При получении треков произошла ошибка';
		return <ArtistsError errorMessage={errorMessage} />;
	}

	return null;
});
