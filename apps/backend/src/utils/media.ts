import { mkdir, unlink, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { env } from '#/utils/env.js';

const AVATAR_TYPES: Record<string, string> = {
	'image/jpeg': '.jpg',
	'image/png': '.png',
	'image/webp': '.webp',
	'image/gif': '.gif',
};

export const MAX_AVATAR_BYTES = 2 * 1024 * 1024;

export function toMediaUrl(value: string): string {
	if (value.startsWith('http://') || value.startsWith('https://')) {
		return value;
	}

	const base = env.PUBLIC_BASE_URL.replace(/\/$/, '');
	const pathname = value.startsWith('/') ? value : `/${value}`;
	return `${base}${pathname}`;
}

export function avatarExtension(mimeType: string): string | undefined {
	return AVATAR_TYPES[mimeType];
}

export function avatarRelativePath(userId: string, extension: string): string {
	return `/media/avatars/${userId}${extension}`;
}

function toAbsoluteMediaPath(relativePath: string): string {
	return path.join(process.cwd(), relativePath.replace(/^\//, ''));
}

export async function saveAvatar(
	userId: string,
	file: File,
	extension: string,
): Promise<string> {
	const relativePath = avatarRelativePath(userId, extension);
	const absolutePath = toAbsoluteMediaPath(relativePath);
	await mkdir(path.dirname(absolutePath), { recursive: true });
	await writeFile(absolutePath, Buffer.from(await file.arrayBuffer()));
	return relativePath;
}

export async function removeLocalMedia(relativePath: string | null) {
	if (!relativePath?.startsWith('/media/')) {
		return;
	}

	await unlink(toAbsoluteMediaPath(relativePath)).catch(() => undefined);
}
