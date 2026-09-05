import type { ApiArtist, ApiArtistDetail } from '@music-player/backend';
import { client } from '@/api/hono-client';
import { baseApi } from '@/api/baseApi';
import { parseHonoJson } from '@/api/parseHono';

export const artistsApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		getArtists: build.query<ApiArtist[], void>({
			async queryFn() {
				const res = await client.api.artists.$get();
				return parseHonoJson<ApiArtist[]>(res);
			},
			providesTags: ['Artist'],
		}),
		getArtist: build.query<ApiArtistDetail, number>({
			async queryFn(id) {
				const res = await client.api.artists[':id'].$get({
					param: { id: String(id) },
				});
				return parseHonoJson<ApiArtistDetail>(res);
			},
			providesTags: (_r, _e, id) => [{ type: 'Artist', id }],
		}),
	}),
});

export const { useGetArtistsQuery, useGetArtistQuery } = artistsApi;
