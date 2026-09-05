import { factory } from '@/factory.js';
import {
	getLikedArtists,
	getLikedTracks,
	getMe,
	likeArtist,
	likeTrack,
	setMyPhoto,
	unlikeArtist,
	unlikeTrack,
} from '@/handlers/me.js';
import { requireAuth } from '@/middleware/auth.js';

export const meRoutes = factory.createApp();

meRoutes.use(requireAuth);
meRoutes.get('/', ...getMe);
meRoutes.put('/photo', ...setMyPhoto);
meRoutes.get('/liked-tracks', ...getLikedTracks);
meRoutes.post('/liked-tracks/:id', ...likeTrack);
meRoutes.delete('/liked-tracks/:id', ...unlikeTrack);
meRoutes.get('/liked-artists', ...getLikedArtists);
meRoutes.post('/liked-artists/:id', ...likeArtist);
meRoutes.delete('/liked-artists/:id', ...unlikeArtist);
