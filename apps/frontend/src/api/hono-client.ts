import { hc } from 'hono/client';
import type { AppType } from '@music-player/backend';
import { serverUrl } from '@/utils/constants';
import { getAuthToken } from '@/utils/auth';

export const client = hc<AppType>(serverUrl);

export function getAuthedClient() {
	const token = getAuthToken();
	return hc<AppType>(serverUrl, {
		headers: token ? { Authorization: `Bearer ${token}` } : {},
	});
}
