import { FC, memo } from 'react';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import type { SerializedError } from '@reduxjs/toolkit';
import type { ApiArtist } from '@music-player/backend';

import { ArtistCard } from './artistCards';
import { ArtistsError } from '@/components/errorMessages/artistsError';

interface HomeArtistsProps {
	artists: ApiArtist[];
	error?: FetchBaseQueryError | SerializedError;
}

const getErrorMessage = (error: FetchBaseQueryError | SerializedError) =>
	'data' in error && typeof error.data === 'string'
		? error.data
		: 'При получении артистов произошла ошибка';

export const HomeArtists: FC<HomeArtistsProps> = memo(({ artists, error }) => {
	if (artists.length > 0) {
		if (!error) {
			return artists.map(({ name, artistImg, id }) => {
				return (
					<ArtistCard key={id} name={name} img={artistImg} id={id} />
				);
			});
		}

		return <ArtistsError errorMessage={getErrorMessage(error)} />;
	}

	if (error) {
		return <ArtistsError errorMessage={getErrorMessage(error)} />;
	}

	return null;
});
