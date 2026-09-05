import type { ApiArtist, ApiTrack } from '@music-player/backend';
import { getAuthedClient } from '@/api/hono-client';
import { baseApi } from '@/api/baseApi';
import { parseHonoJson } from '@/api/parseHono';

export const likedApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		getLikedTracks: build.query<ApiTrack[], void>({
			async queryFn() {
				const res = await getAuthedClient().api.me['liked-tracks'].$get();
				return parseHonoJson<ApiTrack[]>(res);
			},
			providesTags: ['LikedTrack'],
		}),
		toggleLikedTrack: build.mutation<
			ApiTrack[],
			{ id: string; isLiked: boolean }
		>({
			async queryFn({ id, isLiked }) {
				const route = getAuthedClient().api.me['liked-tracks'][':id'];
				const res = isLiked
					? await route.$delete({ param: { id } })
					: await route.$post({ param: { id } });
				return parseHonoJson<ApiTrack[]>(res);
			},
			invalidatesTags: ['LikedTrack'],
		}),
		getLikedArtists: build.query<ApiArtist[], void>({
			async queryFn() {
				const res = await getAuthedClient().api.me['liked-artists'].$get();
				return parseHonoJson<ApiArtist[]>(res);
			},
			providesTags: ['LikedArtist'],
		}),
		toggleLikedArtist: build.mutation<
			ApiArtist[],
			{ id: number; isLiked: boolean }
		>({
			async queryFn({ id, isLiked }) {
				const route = getAuthedClient().api.me['liked-artists'][':id'];
				const param = { id: String(id) };
				const res = isLiked
					? await route.$delete({ param })
					: await route.$post({ param });
				return parseHonoJson<ApiArtist[]>(res);
			},
			invalidatesTags: ['LikedArtist', 'Artist'],
		}),
	}),
});

export const {
	useGetLikedTracksQuery,
	useToggleLikedTrackMutation,
	useGetLikedArtistsQuery,
	useToggleLikedArtistMutation,
} = likedApi;
