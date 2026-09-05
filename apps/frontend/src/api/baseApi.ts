import { createApi } from '@reduxjs/toolkit/query/react';
import type { QueryError } from './parseHono';

export const baseApi = createApi({
	reducerPath: 'api',
	baseQuery: () => ({
		error: { status: 500, data: 'No baseQuery' } satisfies QueryError,
	}),
	tagTypes: ['Artist', 'Track', 'User', 'LikedTrack', 'LikedArtist'],
	endpoints: () => ({}),
});
