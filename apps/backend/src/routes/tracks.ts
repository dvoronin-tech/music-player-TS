import { factory } from '@/factory.js';
import { getTrack, getTracks, playTrack } from '@/handlers/tracks.js';

export const tracksRoutes = factory.createApp();

tracksRoutes.get('/', ...getTracks);
tracksRoutes.get('/:id', ...getTrack);
tracksRoutes.post('/:id/play', ...playTrack);
