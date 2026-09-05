import { factory } from '#/factory.js';
import { getTrack, getTracks, playTrack } from '#/handlers/tracks.js';

export const tracksRoutes = factory
	.createApp()
	.get('/', ...getTracks)
	.get('/:id', ...getTrack)
	.post('/:id/play', ...playTrack);
