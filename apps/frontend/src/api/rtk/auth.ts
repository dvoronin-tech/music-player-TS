import type { ApiUser } from '@music-player/backend';
import { client, getAuthedClient } from '@/api/hono-client';
import { baseApi } from '@/api/baseApi';
import { parseHonoJson } from '@/api/parseHono';

export type RegisterBody = {
	username: string;
	email: string;
	password: string;
};

export type LoginBody = {
	username: string;
	password: string;
};

export type LoginResult = {
	token: string;
	user: ApiUser;
};

export type RegisterResult = {
	user: ApiUser;
};

export const authApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		register: build.mutation<RegisterResult, RegisterBody>({
			async queryFn(body) {
				const res = await client.api.auth.register.$post({
					json: body,
				});
				return parseHonoJson<RegisterResult>(res);
			},
		}),
		login: build.mutation<LoginResult, LoginBody>({
			async queryFn(body) {
				const res = await client.api.auth.login.$post({
					json: body,
				});
				return parseHonoJson<LoginResult>(res);
			},
		}),
		logout: build.mutation<void, void>({
			async queryFn() {
				const res = await getAuthedClient().api.auth.logout.$post();
				return parseHonoJson<void>(res);
			},
		}),
	}),
});

export const {
	useRegisterMutation,
	useLoginMutation,
	useLogoutMutation,
} = authApi;
