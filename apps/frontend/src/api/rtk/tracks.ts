import type { ApiTrack } from '@music-player/backend';
import { client } from '@/api/hono-client';
import { baseApi } from '@/api/baseApi';
import { parseHonoJson } from '@/api/parseHono';

type PlayTrackResult = {
	id: string;
	auditions: number;
};

export const tracksApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		getTracks: build.query<ApiTrack[], void>({
			async queryFn() {
				const res = await client.api.tracks.$get();
				return parseHonoJson<ApiTrack[]>(res);
			},
			providesTags: ['Track'],
		}),
		playTrack: build.mutation<PlayTrackResult, string>({
			async queryFn(id) {
				const res = await client.api.tracks[':id'].play.$post({
					param: { id },
				});
				return parseHonoJson<PlayTrackResult>(res);
			},
			invalidatesTags: ['Track', 'LikedTrack', 'Artist'],
		}),
	}),
});

export const { useGetTracksQuery, usePlayTrackMutation } = tracksApi;
