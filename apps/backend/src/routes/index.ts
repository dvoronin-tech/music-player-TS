import { factory } from '#/factory.js';
import { artistsRoutes } from '#/routes/artists.js';
import { authRoutes } from '#/routes/auth.js';
import { meRoutes } from '#/routes/me.js';
import { tracksRoutes } from '#/routes/tracks.js';

const _routes = factory
	.createApp()
	.route('/auth', authRoutes)
	.route('/me', meRoutes)
	.route('/tracks', tracksRoutes)
	.route('/artists', artistsRoutes);

export const routes = factory.createApp().route('/api', _routes);

export type AppType = typeof routes;
export type {
	ApiArtist,
	ApiArtistDetail,
	ApiArtistRef,
	ApiTrack,
	ApiUser,
} from '#/mappers.js';
