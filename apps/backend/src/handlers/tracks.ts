import { eq, sql } from 'drizzle-orm';
import { tracks } from '@music-player/db';
import { db } from '#/db.js';
import { factory } from '#/factory.js';
import { getTrackById, listTracks } from '#/queries/catalog.js';
import { trackIdParamSchema } from '#/schemas/params.js';
import { jsonError } from '#/utils/http.js';
import { validateParam } from '#/utils/validate.js';

export const getTracks = factory.createHandlers(async (c) => {
	return c.json(await listTracks());
});

export const getTrack = factory.createHandlers(
	validateParam(trackIdParamSchema),
	async (c) => {
		const track = await getTrackById(c.req.valid('param').id);
		if (!track) {
			return jsonError(c, 404, 'Track not found');
		}

		return c.json(track);
	},
);

export const playTrack = factory.createHandlers(
	validateParam(trackIdParamSchema),
	async (c) => {
		const { id } = c.req.valid('param');
		const [updated] = await db
			.update(tracks)
			.set({ auditions: sql`${tracks.auditions} + 1` })
			.where(eq(tracks.id, id))
			.returning({ auditions: tracks.auditions });

		if (!updated) {
			return jsonError(c, 404, 'Track not found');
		}

		return c.json({ id, auditions: updated.auditions });
	},
);
