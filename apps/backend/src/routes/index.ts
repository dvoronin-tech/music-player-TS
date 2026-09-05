import { factory } from '@/factory.js';
import { artistsRoutes } from '@/routes/artists.js';
import { authRoutes } from '@/routes/auth.js';
import { meRoutes } from '@/routes/me.js';
import { tracksRoutes } from '@/routes/tracks.js';

export const routes = factory.createApp();

routes.route('/api/auth', authRoutes);
routes.route('/api/me', meRoutes);
routes.route('/api/tracks', tracksRoutes);
routes.route('/api/artists', artistsRoutes);
