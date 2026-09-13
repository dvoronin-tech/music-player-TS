import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const teamId = 'team_9SnXBEKm1UW3JaAdHdMzyHvC';
const backendProjectId = 'prj_fNBkyCY0bzzck8ogZygwNlvCODlI';
const frontendProjectId = 'prj_PJOf27gVZvP1zn6WMWGB7Bb8pS0U';
const backendUrl = 'https://music-player-backend-coral.vercel.app';
const frontendUrl = 'https://music-player-frontend-gules.vercel.app';

const token = process.env.VERCEL_TOKEN;
if (!token) {
	console.error('Set VERCEL_TOKEN and run this script again.');
	process.exit(1);
}

function parseEnvFile(path) {
	const values = {};
	for (const line of readFileSync(path, 'utf8').split('\n')) {
		const trimmed = line.trim();
		if (!trimmed || trimmed.startsWith('#')) continue;
		const eq = trimmed.indexOf('=');
		if (eq === -1) continue;
		const key = trimmed.slice(0, eq).trim();
		let value = trimmed.slice(eq + 1).trim();
		if (
			(value.startsWith('"') && value.endsWith('"')) ||
			(value.startsWith("'") && value.endsWith("'"))
		) {
			value = value.slice(1, -1);
		}
		values[key] = value;
	}
	return values;
}

const backendEnv = parseEnvFile(
	resolve(import.meta.dirname, '../apps/backend/.env'),
);

async function upsert(projectId, key, value, type) {
	const response = await fetch(
		`https://api.vercel.com/v10/projects/${projectId}/env?upsert=true&teamId=${teamId}`,
		{
			method: 'POST',
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				key,
				value,
				type,
				target: ['production', 'preview', 'development'],
			}),
		},
	);
	if (!response.ok) {
		const body = await response.text();
		throw new Error(`Failed to set ${key}: ${response.status} ${body}`);
	}
	console.log(`Set ${key}`);
}

async function redeploy(projectId, name) {
	const response = await fetch(
		`https://api.vercel.com/v13/deployments?teamId=${teamId}&forceNew=1`,
		{
			method: 'POST',
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name,
				project: projectId,
				target: 'production',
				gitSource: {
					type: 'github',
					org: 'dvoronin-tech',
					repo: 'music-player-TS',
					ref: 'main',
				},
			}),
		},
	);
	if (!response.ok) {
		const body = await response.text();
		throw new Error(`Failed to redeploy ${name}: ${response.status} ${body}`);
	}
	console.log(`Triggered redeploy for ${name}`);
}

await upsert(backendProjectId, 'DATABASE_URL', backendEnv.DATABASE_URL, 'sensitive');
await upsert(
	backendProjectId,
	'SUPABASE_SECRET_KEY',
	backendEnv.SUPABASE_SECRET_KEY,
	'sensitive',
);
await upsert(backendProjectId, 'MEDIA_URL', backendEnv.MEDIA_URL, 'plain');
await upsert(
	backendProjectId,
	'UPLOAD_MEDIA_URL',
	backendEnv.UPLOAD_MEDIA_URL,
	'plain',
);
await upsert(backendProjectId, 'PUBLIC_BASE_URL', backendUrl, 'plain');
await upsert(backendProjectId, 'CORS_ORIGIN', frontendUrl, 'plain');
await upsert(frontendProjectId, 'VITE_API_URL', backendUrl, 'plain');
await redeploy(backendProjectId, 'music-player-backend');
await redeploy(frontendProjectId, 'music-player-frontend');
