import { and, eq } from 'drizzle-orm';
import { userLikedArtists, userLikedTracks, users } from '@music-player/db';
import { db } from '#/db.js';
import { factory } from '#/factory.js';
import { toApiUser } from '#/mappers.js';
import {
	artistExists,
	listLikedArtists,
	listLikedTracks,
	trackExists,
} from '#/queries/catalog.js';
import { artistIdParamSchema, trackIdParamSchema } from '#/schemas/params.js';
import { jsonError } from '#/utils/http.js';
import {
	avatarExtension,
	MAX_AVATAR_BYTES,
	removeLocalMedia,
	saveAvatar,
} from '#/utils/media.js';
import { validateParam } from '#/utils/validate.js';

async function findCurrentUser(userId: string) {
	return db.query.users.findFirst({
		where: eq(users.id, userId),
	});
}

export const getMe = factory.createHandlers(async (c) => {
	const user = await findCurrentUser(c.get('userId'));
	if (!user) {
		return jsonError(c, 401, 'Invalid token');
	}

	return c.json(toApiUser(user));
});

export const setMyPhoto = factory.createHandlers(async (c) => {
	const user = await findCurrentUser(c.get('userId'));
	if (!user) {
		return jsonError(c, 401, 'Invalid token');
	}

	let form: FormData;
	try {
		form = await c.req.formData();
	} catch {
		return jsonError(c, 400, 'Expected multipart form data');
	}

	const file = form.get('userImg');
	if (!(file instanceof File) || file.size === 0) {
		return jsonError(c, 400, 'userImg file is required');
	}
	if (file.size > MAX_AVATAR_BYTES) {
		return jsonError(c, 413, 'Avatar must be 2MB or smaller');
	}

	const extension = avatarExtension(file.type);
	if (!extension) {
		return jsonError(c, 400, 'Avatar must be jpeg, png, webp, or gif');
	}

	const relativePath = await saveAvatar(user.id, file, extension);
	if (user.userImg !== relativePath) {
		await removeLocalMedia(user.userImg);
	}

	const [updated] = await db
		.update(users)
		.set({ userImg: relativePath })
		.where(eq(users.id, user.id))
		.returning();

	if (!updated) {
		return jsonError(c, 500, 'Failed to update avatar');
	}

	return c.json(toApiUser(updated));
});

export const getLikedTracks = factory.createHandlers(async (c) => {
	return c.json(await listLikedTracks(c.get('userId')));
});

export const likeTrack = factory.createHandlers(
	validateParam(trackIdParamSchema),
	async (c) => {
		const { id } = c.req.valid('param');
		if (!(await trackExists(id))) {
			return jsonError(c, 404, 'Track not found');
		}

		await db
			.insert(userLikedTracks)
			.values({ userId: c.get('userId'), trackId: id })
			.onConflictDoNothing();

		return c.json(await listLikedTracks(c.get('userId')));
	},
);

export const unlikeTrack = factory.createHandlers(
	validateParam(trackIdParamSchema),
	async (c) => {
		const { id } = c.req.valid('param');
		await db
			.delete(userLikedTracks)
			.where(
				and(
					eq(userLikedTracks.userId, c.get('userId')),
					eq(userLikedTracks.trackId, id),
				),
			);

		return c.json(await listLikedTracks(c.get('userId')));
	},
);

export const getLikedArtists = factory.createHandlers(async (c) => {
	return c.json(await listLikedArtists(c.get('userId')));
});

export const likeArtist = factory.createHandlers(
	validateParam(artistIdParamSchema),
	async (c) => {
		const { id } = c.req.valid('param');
		if (!(await artistExists(id))) {
			return jsonError(c, 404, 'Artist not found');
		}

		await db
			.insert(userLikedArtists)
			.values({ userId: c.get('userId'), artistId: id })
			.onConflictDoNothing();

		return c.json(await listLikedArtists(c.get('userId')));
	},
);

export const unlikeArtist = factory.createHandlers(
	validateParam(artistIdParamSchema),
	async (c) => {
		const { id } = c.req.valid('param');
		await db
			.delete(userLikedArtists)
			.where(
				and(
					eq(userLikedArtists.userId, c.get('userId')),
					eq(userLikedArtists.artistId, id),
				),
			);

		return c.json(await listLikedArtists(c.get('userId')));
	},
);
