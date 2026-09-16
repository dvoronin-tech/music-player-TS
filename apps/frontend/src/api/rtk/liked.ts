import type { ApiArtist, ApiTrack } from '@music-player/backend';
import { v4 as randomId } from 'uuid';
import { getAuthedClient } from '@/api/hono-client';
import { baseApi } from '@/api/baseApi';
import { parseHonoJson } from '@/api/parseHono';
import { addNotification } from '@/store/slices/notification';
import { formatArtistNames } from '@/utils/formatArtists';
import { RootState } from '@/store/store';

export const likedApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		getLikedTracks: build.query<ApiTrack[], void>({
			async queryFn() {
				const res =
					await getAuthedClient().api.me['liked-tracks'].$get();
				return parseHonoJson<ApiTrack[]>(res);
			},
			providesTags: ['LikedTrack'],
		}),
		toggleLikedTrack: build.mutation<
			ApiTrack[],
			{ id: string; isLiked: boolean; track?: ApiTrack }
		>({
			async queryFn({ id, isLiked }) {
				const route = getAuthedClient().api.me['liked-tracks'][':id'];
				const res = isLiked
					? await route.$delete({ param: { id } })
					: await route.$post({ param: { id } });
				return parseHonoJson<ApiTrack[]>(res);
			},
			async onQueryStarted(
				{ id, isLiked, track },
				{ dispatch, queryFulfilled, getState },
			) {
				track =
					track ??
					(getState() as RootState).player.queue.find(
						(t) => t.id === id,
					);

				const patchResult = dispatch(
					likedApi.util.updateQueryData(
						'getLikedTracks',
						undefined,
						(draft) => {
							if (isLiked) {
								const index = draft.findIndex(
									(t) => t.id === id,
								);
								if (index !== -1) {
									draft.splice(index, 1);
								}
							} else {
								if (track && !draft.some((t) => t.id === id)) {
									draft.unshift(track);
								}
							}
						},
					),
				);

				try {
					await queryFulfilled;
				} catch {
					patchResult.undo();
					dispatch(
						addNotification({
							notificationId: randomId(),
							info: track
								? `${track.title} - ${formatArtistNames(track.artists)}`
								: 'Ошибка',
							additionalInfo: isLiked
								? 'Не удалось удалить трек из __избранного__'
								: 'Не удалось добавить трек в __избранное__',
							variant: 'error',
						}),
					);
				}
			},
			invalidatesTags: ['LikedTrack'],
		}),
		getLikedArtists: build.query<ApiArtist[], void>({
			async queryFn() {
				const res =
					await getAuthedClient().api.me['liked-artists'].$get();
				return parseHonoJson<ApiArtist[]>(res);
			},
			providesTags: ['LikedArtist'],
		}),
		toggleLikedArtist: build.mutation<
			ApiArtist[],
			{ id: number; isLiked: boolean; artist?: ApiArtist }
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
			async onQueryStarted(
				{ id, isLiked, artist },
				{ dispatch, queryFulfilled },
			) {
				const patchResult = dispatch(
					likedApi.util.updateQueryData(
						'getLikedArtists',
						undefined,
						(draft) => {
							if (isLiked) {
								const index = draft.findIndex((a) => a.id === id);
								if (index !== -1) {
									draft.splice(index, 1);
								}
							} else if (artist) {
								if (!draft.some((a) => a.id === id)) {
									draft.unshift(artist);
								}
							}
						},
					),
				);

				try {
					await queryFulfilled;
				} catch {
					patchResult.undo();
					dispatch(
						addNotification({
							notificationId: randomId(),
							info: artist?.name ?? 'Ошибка',
							additionalInfo: isLiked
								? 'Не удалось отписаться от артиста'
								: 'Не удалось подписаться на артиста',
							variant: 'error',
						}),
					);
				}
			},
		}),
	}),
});

export const {
	useGetLikedTracksQuery,
	useToggleLikedTrackMutation,
	useGetLikedArtistsQuery,
	useToggleLikedArtistMutation,
} = likedApi;
