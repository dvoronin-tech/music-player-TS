import { z } from 'zod';
import { extensionFromMimeType, MAX_AVATAR_BYTES } from '#/utils/media.js';

const avatarFileSchema = z
	.custom<File>((value) => value instanceof File || value instanceof Blob, {
		message: 'userImg file is required',
	})
	.refine((file) => file.size > 0, 'userImg file is required')
	.refine(
		(file) => file.size <= MAX_AVATAR_BYTES,
		'Avatar must be 2MB or smaller',
	)
	.refine(
		(file) => Boolean(extensionFromMimeType(file.type)),
		'Avatar must be jpeg, png, webp, or gif',
	);

export const setMyPhotoFormSchema = z.object({
	userImg: avatarFileSchema,
});
