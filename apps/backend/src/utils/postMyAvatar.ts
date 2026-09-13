import { env } from '#/utils/env.js';

async function supabaseStorageFetch(
	imagePath: string,
	init: RequestInit,
): Promise<Response> {
	return fetch(imagePath, {
		...init,
		headers: {
			Authorization: `Bearer ${env.SUPABASE_SECRET_KEY}`,
			apikey: env.SUPABASE_SECRET_KEY,
			...init.headers,
		},
	});
}

/**
 * @param image - The image file to post
 * @param imagePath - The full path to the image on supabase storage
 */
export const postMyAvatar = async (image: File, imagePath: string) => {
	const bytes = Buffer.from(await image.arrayBuffer());

	const res = await supabaseStorageFetch(imagePath, {
		method: 'POST',
		headers: {
			'Content-Type': image.type,
		},
		body: bytes,
	});

	if (!res.ok) {
		const text = await res.text();
		throw new Error(`Supabase upload failed: ${res.status} ${text}`);
	}

	return await res.json();
};

export const deleteMyAvatar = async (imagePath: string) => {
	const res = await supabaseStorageFetch(imagePath, { method: 'DELETE' });

	if (!res.ok && res.status !== 404) {
		const text = await res.text();
		throw new Error(`Supabase delete failed: ${res.status} ${text}`);
	}
};
