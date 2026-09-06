import { redirect } from '@tanstack/react-router';
import store from '@/store/store';
import { baseApi } from '@/api/baseApi';
import { authApi } from '@/api/rtk/auth';
import { userApi } from '@/api/rtk/user';
import { tracksApi } from '@/api/rtk/tracks';
import { likedApi } from '@/api/rtk/liked';

export const getAuthToken = (): string | null => {
	return localStorage.getItem('Token');
};

export const clearSession = () => {
	localStorage.removeItem('Token');
	store.dispatch(baseApi.util.resetApiState());
};

export const requireAuth = () => {
	const token = getAuthToken();
	if (!token) {
		throw redirect({ to: '/auth' });
	}
};

export const prefetchAppData = async () => {
	const results = await Promise.all([
		store.dispatch(userApi.endpoints.getMe.initiate()),
		store.dispatch(tracksApi.endpoints.getTracks.initiate()),
		store.dispatch(likedApi.endpoints.getLikedTracks.initiate()),
		store.dispatch(likedApi.endpoints.getLikedArtists.initiate()),
	]);

	const hasUnauthorized = results.some(
		(res) => res.error && 'status' in res.error && res.error.status === 401,
	);
	if (hasUnauthorized) {
		clearSession();
		throw redirect({ to: '/auth' });
	}
};

export const logout = async () => {
	try {
		await store.dispatch(authApi.endpoints.logout.initiate()).unwrap();
	} catch {
		// Local session still ends if the request fails.
	}
	clearSession();
};
