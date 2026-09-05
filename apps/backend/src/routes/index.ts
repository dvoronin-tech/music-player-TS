import { factory } from '#/factory.js';
import { artistsRoutes } from '#/routes/artists.js';
import { authRoutes } from '#/routes/auth.js';
import { meRoutes } from '#/routes/me.js';
import { tracksRoutes } from '#/routes/tracks.js';

export const routes = factory
	.createApp()
	.route('/api/auth', authRoutes)
	.route('/api/me', meRoutes)
	.route('/api/tracks', tracksRoutes)
	.route('/api/artists', artistsRoutes);

export type AppType = typeof routes;
