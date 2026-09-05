import { factory } from '#/factory.js';
import {
	getLikedArtists,
	getLikedTracks,
	getMe,
	likeArtist,
	likeTrack,
	setMyPhoto,
	unlikeArtist,
	unlikeTrack,
} from '#/handlers/me.js';
import { requireAuth } from '#/middleware/auth.js';

export const meRoutes = factory
	.createApp()
	.use(requireAuth)
	.get('/', ...getMe)
	.put('/photo', ...setMyPhoto)
	.get('/liked-tracks', ...getLikedTracks)
	.post('/liked-tracks/:id', ...likeTrack)
	.delete('/liked-tracks/:id', ...unlikeTrack)
	.get('/liked-artists', ...getLikedArtists)
	.post('/liked-artists/:id', ...likeArtist)
	.delete('/liked-artists/:id', ...unlikeArtist);
