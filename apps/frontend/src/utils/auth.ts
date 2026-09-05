import { redirect } from '@tanstack/react-router';
import store from '@/store/store';
import { loadUserData } from '@/store/user/reducerUser';
import { loadTrackList } from '@/store/tracks/reducerTrackList';
import { loadLikedTrackList } from '@/store/likedPlayList/reducerLiked';
import { loadLikedArtists } from '@/store/likedArtists/reducerLikedArtists';

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
		store.dispatch(loadUserData()),
		store.dispatch(loadTrackList()),
		store.dispatch(loadLikedTrackList()),
		store.dispatch(loadLikedArtists()),
	]);
};
