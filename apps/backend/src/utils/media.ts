import { env } from '#/utils/env.js';

const IMAGE_MIME_TYPES: Record<string, string> = {
	'image/jpeg': '.jpg',
	'image/png': '.png',
	'image/webp': '.webp',
	'image/gif': '.gif',
};

export const MAX_AVATAR_BYTES = 2 * 1024 * 1024;

export function toMediaUrl(value: string): string {
	return `${env.MEDIA_URL}${value}`;
}

export function extensionFromMimeType(mimeType: string): string | undefined {
	return IMAGE_MIME_TYPES[mimeType];
}

const AVATAR_OBJECT_PATH = '/images/userImg';

export function toMyAvatarPath(fileName: string): string {
	return `${AVATAR_OBJECT_PATH}/${fileName}`;
}

export function toMyAvatarUploadPath(objectPath: string): string {
	return `${env.UPLOAD_MEDIA_URL}${objectPath}`;
}