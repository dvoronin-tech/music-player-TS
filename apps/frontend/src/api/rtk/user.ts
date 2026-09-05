import type { ApiUser } from '@music-player/backend';
import { getAuthedClient } from '@/api/hono-client';
import { baseApi } from '@/api/baseApi';
import { parseHonoJson } from '@/api/parseHono';

export const userApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		getMe: build.query<ApiUser, void>({
			async queryFn() {
				const res = await getAuthedClient().api.me.$get();
				return parseHonoJson<ApiUser>(res);
			},
			providesTags: ['User'],
		}),
		setMyPhoto: build.mutation<ApiUser, File>({
			async queryFn(file) {
				const form = new FormData();
				form.append('userImg', file);
				const res = await getAuthedClient().api.me.photo.$put({
					form: {
						userImg: file,
					},
				});
				return parseHonoJson<ApiUser>(res);
			},
			invalidatesTags: ['User'],
		}),
	}),
});

export const { useGetMeQuery, useSetMyPhotoMutation } = userApi;
