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
import { setMyPhotoFormSchema } from '#/schemas/me.js';
import { artistIdParamSchema, trackIdParamSchema } from '#/schemas/params.js';
import { jsonError } from '#/utils/http.js';
import {
	extensionFromMimeType,
	toMyAvatarPath,
	toMyAvatarUploadPath,
} from '#/utils/media.js';
import { validateForm, validateParam } from '#/utils/validate.js';
import { deleteMyAvatar, postMyAvatar } from '#/utils/postMyAvatar.js';

async function findCurrentUser(userId: string) {
	return db.query.users.findFirst({
		where: (users, {}) => eq(users.id, userId),
	});
}

export const getMe = factory.createHandlers(async (c) => {
	const user = await findCurrentUser(c.get('userId'));
	if (!user) {
		return jsonError(c, 401, 'Invalid token');
	}

	return c.json(toApiUser(user));
});

export const setMyPhoto = factory.createHandlers(
	validateForm(setMyPhotoFormSchema),
	async (c) => {
		const userId = c.get('userId');
		const { userImg } = c.req.valid('form');

		const user = await findCurrentUser(userId);

		if (!user) {
			return jsonError(c, 401, 'Invalid token');
		}

		const previousPath = user.userImg;
		const imageName = `${userId}-${Date.now()}${extensionFromMimeType(userImg.type)}`;
		const imagePath = toMyAvatarPath(imageName);

		try {
			await postMyAvatar(userImg, toMyAvatarUploadPath(imagePath));
			await db
				.update(users)
				.set({
					userImg: imagePath,
				})
				.where(eq(users.id, userId));
		} catch (error) {
			console.error(error);
			return jsonError(c, 500, 'Failed to upload image');
		}

		if (previousPath && previousPath !== imagePath) {
			try {
				await deleteMyAvatar(toMyAvatarUploadPath(previousPath));
			} catch (error) {
				console.error(error);
			}
		}

		const updatedUser = await findCurrentUser(userId);
		if (!updatedUser) {
			return jsonError(c, 401, 'Invalid token');
		}

		return c.json(toApiUser(updatedUser));
	},
);

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
