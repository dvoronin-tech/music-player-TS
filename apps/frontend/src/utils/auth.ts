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

export const requireAuth = () => {
	const token = getAuthToken();
	if (!token) {
		throw redirect({ to: '/auth' });
	}
};

export const prefetchAppData = async () => {
	await Promise.all([
		store.dispatch(userApi.endpoints.getMe.initiate()),
		store.dispatch(tracksApi.endpoints.getTracks.initiate()),
		store.dispatch(likedApi.endpoints.getLikedTracks.initiate()),
		store.dispatch(likedApi.endpoints.getLikedArtists.initiate()),
	]);
};

export const logout = async () => {
	try {
		await store.dispatch(authApi.endpoints.logout.initiate()).unwrap();
	} catch {
		// Local session still ends if the request fails.
	}
	localStorage.removeItem('Token');
	store.dispatch(baseApi.util.resetApiState());
};
