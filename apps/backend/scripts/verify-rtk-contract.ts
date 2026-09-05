import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { config } from 'dotenv';
import { sql } from 'drizzle-orm';
import { hc } from 'hono/client';
import { createDb } from '@music-player/db';
import type { AppType } from '../src/routes/index.js';
import { parseHonoJson } from '../../frontend/src/api/parseHono.ts';
import { formatArtistNames } from '../../frontend/src/utils/formatArtists.ts';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, '../../..');
const migrationFile = path.join(
	repoRoot,
	'packages/db/drizzle/0000_lowly_mentallo.sql',
);

config({ path: path.join(repoRoot, 'packages/db/.env') });
config({ path: path.join(repoRoot, 'apps/backend/.env') });

function assert(condition: unknown, message: string): asserts condition {
	if (!condition) {
		throw new Error(message);
	}
}

function withDatabase(connectionString: string, database: string) {
	const url = new URL(connectionString);
	url.pathname = `/${database}`;
	return url.toString();
}

async function parseJson<T>(res: Response, label: string): Promise<T> {
	const parsed = await parseHonoJson<T>(res);
	if ('error' in parsed) {
		throw new Error(`${label}: ${parsed.error.status} ${parsed.error.data}`);
	}
	return parsed.data;
}

async function createIsolatedDatabase(sourceUrl: string) {
	const dbName = `rtk_verify_${Date.now()}`;
	assert(/^rtk_verify_\d+$/.test(dbName), `Unsafe database name: ${dbName}`);

	const admin = createDb(withDatabase(sourceUrl, 'postgres'));
	try {
		await admin.execute(sql.raw(`CREATE DATABASE ${dbName}`));
	} finally {
		await admin.$client.end();
	}

	const isolatedUrl = withDatabase(sourceUrl, dbName);
	const isolated = createDb(isolatedUrl);
	try {
		const migration = await readFile(migrationFile, 'utf8');
		for (const statement of migration.split('--> statement-breakpoint')) {
			const trimmed = statement.trim();
			if (trimmed) {
				await isolated.execute(sql.raw(trimmed));
			}
		}
	} catch (error) {
		await isolated.$client.end().catch(() => undefined);
		await dropIsolatedDatabase(sourceUrl, dbName);
		throw error;
	} finally {
		await isolated.$client.end().catch(() => undefined);
	}

	return { dbName, isolatedUrl };
}

async function dropIsolatedDatabase(sourceUrl: string, dbName: string) {
	const admin = createDb(withDatabase(sourceUrl, 'postgres'));
	try {
		await admin.execute(
			sql.raw(`
				SELECT pg_terminate_backend(pid)
				FROM pg_stat_activity
				WHERE datname = '${dbName}' AND pid <> pg_backend_pid()
			`),
		);
		await admin.execute(sql.raw(`DROP DATABASE IF EXISTS ${dbName}`));
	} finally {
		await admin.$client.end();
	}
}

function createClient(
	app: { request: (request: Request) => Promise<Response> },
	token?: string,
) {
	return hc<AppType>('http://rtk-verify.local', {
		headers: token ? { Authorization: `Bearer ${token}` } : {},
		fetch: ((input: RequestInfo | URL, init?: RequestInit) => {
			return app.request(new Request(input, init));
		}) as typeof fetch,
	});
}

{
	assert(
		formatArtistNames([
			{ id: 1, name: 'Макс корж' },
			{ id: 2, name: 'Тима Белоруских' },
		]) === 'Макс корж, Тима Белоруских',
		'formatArtistNames should join artist names',
	);
}

const sourceUrl = process.env.DATABASE_URL;
assert(sourceUrl, 'DATABASE_URL is required to create an isolated database');

const { dbName, isolatedUrl } = await createIsolatedDatabase(sourceUrl);
process.env.DATABASE_URL = isolatedUrl;
process.env.PUBLIC_BASE_URL ??= 'http://localhost:4041';
process.env.CORS_ORIGIN ??= 'http://localhost:4040';
process.env.PORT ??= '4041';

let appDb: { $client: { end: () => Promise<void> } } | undefined;

try {
	const { app } = await import('#/app.js');
	const { db } = await import('#/db.js');
	const { artists, artistsToTracks, tracks } = await import('@music-player/db');
	appDb = db;

	const [artist] = await db
		.insert(artists)
		.values({
			name: 'Verify Artist',
			artistImg: '/media/verify-artist.jpg',
			bigImg: '/media/verify-artist-big.jpg',
		})
		.returning();
	assert(artist, 'Failed to insert artist');

	await db.insert(tracks).values({
		id: 'verify-track-1',
		title: 'Verify Track',
		albumImg: '/media/verify-track.jpg',
		music: '/media/verify-track.mp3',
		auditions: 7,
	});
	await db.insert(artistsToTracks).values({
		artistId: artist.id,
		trackId: 'verify-track-1',
	});

	const publicClient = createClient(app);

	const allTracks = await parseJson(
		await publicClient.api.tracks.$get(),
		'GET /api/tracks',
	);
	assert(allTracks.length === 1, 'Expected one seeded track');
	assert(allTracks[0].id === 'verify-track-1', 'Track id mismatch');
	assert(allTracks[0].artists[0]?.name === 'Verify Artist', 'Track artists mismatch');
	assert(
		allTracks[0].albumImg.startsWith('http://localhost:4041/'),
		'Track albumImg should be an absolute media URL',
	);

	const played = await parseJson<{ id: string; auditions: number }>(
		await publicClient.api.tracks[':id'].play.$post({
			param: { id: 'verify-track-1' },
		}),
		'POST /api/tracks/:id/play',
	);
	assert(played.id === 'verify-track-1', 'Play should return the track id');
	assert(played.auditions === 8, 'Play should increment auditions');

	const allArtists = await parseJson(
		await publicClient.api.artists.$get(),
		'GET /api/artists',
	);
	assert(allArtists.length === 1, 'Expected one seeded artist');
	assert(allArtists[0].trackIds.includes('verify-track-1'), 'Artist trackIds mismatch');

	const artistDetail = await parseJson(
		await publicClient.api.artists[':id'].$get({
			param: { id: String(artist.id) },
		}),
		'GET /api/artists/:id',
	);
	assert(artistDetail.tracks.length === 1, 'Artist detail should include tracks');
	assert(artistDetail.tracks[0].title === 'Verify Track', 'Artist track title mismatch');

	const unauthLiked = await parseHonoJson(
		await publicClient.api.me['liked-tracks'].$get(),
	);
	assert('error' in unauthLiked && unauthLiked.error.status === 401, 'Liked tracks must require auth');

	const registerRes = await parseJson<{ user: { id: string; username: string } }>(
		await publicClient.api.auth.register.$post({
			json: {
				username: 'rtk_verify_user',
				email: 'rtk_verify_user@example.com',
				password: 'password1',
			},
		}),
		'POST /api/auth/register',
	);
	assert(registerRes.user.username === 'rtk_verify_user', 'Register should return the user');

	const loginRes = await parseJson<{ token: string }>(
		await publicClient.api.auth.login.$post({
			json: {
				username: 'rtk_verify_user',
				password: 'password1',
			},
		}),
		'POST /api/auth/login',
	);
	assert(loginRes.token.length > 0, 'Login should return a token');

	const authedClient = createClient(app, loginRes.token);

	const me = await parseJson<{ username: string }>(
		await authedClient.api.me.$get(),
		'GET /api/me',
	);
	assert(me.username === 'rtk_verify_user', 'GET /api/me should return the current user');

	const likedTracksEmpty = await parseJson(
		await authedClient.api.me['liked-tracks'].$get(),
		'GET /api/me/liked-tracks',
	);
	assert(likedTracksEmpty.length === 0, 'Liked tracks should start empty');

	const likedAfterLike = await parseJson(
		await authedClient.api.me['liked-tracks'][':id'].$post({
			param: { id: 'verify-track-1' },
		}),
		'POST /api/me/liked-tracks/:id',
	);
	assert(likedAfterLike.length === 1, 'Like should return the updated list');
	assert(likedAfterLike[0].id === 'verify-track-1', 'Liked track id mismatch');

	const likedAfterUnlike = await parseJson(
		await authedClient.api.me['liked-tracks'][':id'].$delete({
			param: { id: 'verify-track-1' },
		}),
		'DELETE /api/me/liked-tracks/:id',
	);
	assert(likedAfterUnlike.length === 0, 'Unlike should return an empty list');

	const likedArtistsEmpty = await parseJson(
		await authedClient.api.me['liked-artists'].$get(),
		'GET /api/me/liked-artists',
	);
	assert(likedArtistsEmpty.length === 0, 'Liked artists should start empty');

	const likedArtistsAfterLike = await parseJson(
		await authedClient.api.me['liked-artists'][':id'].$post({
			param: { id: String(artist.id) },
		}),
		'POST /api/me/liked-artists/:id',
	);
	assert(likedArtistsAfterLike.length === 1, 'Artist like should return the updated list');
	assert(likedArtistsAfterLike[0].id === artist.id, 'Liked artist id mismatch');
	assert(likedArtistsAfterLike[0].likes === 1, 'Artist likes count should be 1');

	const likedArtistsAfterUnlike = await parseJson(
		await authedClient.api.me['liked-artists'][':id'].$delete({
			param: { id: String(artist.id) },
		}),
		'DELETE /api/me/liked-artists/:id',
	);
	assert(likedArtistsAfterUnlike.length === 0, 'Artist unlike should return an empty list');

	const missingTrack = await parseHonoJson(
		await authedClient.api.me['liked-tracks'][':id'].$post({
			param: { id: 'missing-track' },
		}),
	);
	assert(
		'error' in missingTrack && missingTrack.error.status === 404,
		'Liking a missing track should return 404',
	);

	const logoutRes = await parseHonoJson(
		await authedClient.api.auth.logout.$post(),
	);
	assert(!('error' in logoutRes), 'Logout should return 204');

	const afterLogout = await parseHonoJson(
		await authedClient.api.me.$get(),
	);
	assert(
		'error' in afterLogout && afterLogout.error.status === 401,
		'Token should be invalid after logout',
	);

	console.log('RTK Hono contract verification passed');
} finally {
	await appDb?.$client.end().catch(() => undefined);
	await dropIsolatedDatabase(sourceUrl, dbName);
}
