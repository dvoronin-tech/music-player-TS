import { factory } from '@/factory.js';
import { getArtistById, listArtists } from '@/queries/catalog.js';
import { artistIdParamSchema } from '@/schemas/params.js';
import { jsonError } from '@/utils/http.js';
import { validateParam } from '@/utils/validate.js';

export const getArtists = factory.createHandlers(async (c) => {
	return c.json(await listArtists());
});

export const getArtist = factory.createHandlers(
	validateParam(artistIdParamSchema),
	async (c) => {
		const artist = await getArtistById(c.req.valid('param').id);
		if (!artist) {
			return jsonError(c, 404, 'Artist not found');
		}

		return c.json(artist);
	},
);
