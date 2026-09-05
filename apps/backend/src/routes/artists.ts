import { factory } from '@/factory.js';
import { getArtist, getArtists } from '@/handlers/artists.js';

export const artistsRoutes = factory.createApp();

artistsRoutes.get('/', ...getArtists);
artistsRoutes.get('/:id', ...getArtist);
