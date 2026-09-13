import { config } from 'dotenv';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema/index.js';

config();

export function createDb(connectionString: string | undefined) {
	const isLocal = connectionString?.includes('localhost');
	const pool = new Pool({
		connectionString,
		max: process.env.VERCEL ? 1 : 10,
		ssl: isLocal ? undefined : { rejectUnauthorized: false },
	});
	return drizzle(pool, { schema });
}

export const db = createDb(process.env.DATABASE_URL);

export type Database = ReturnType<typeof createDb>;
