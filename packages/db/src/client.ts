import { config } from 'dotenv';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema/index.js';

config();

export function createDb(connectionString: string | undefined) {
	const pool = new Pool({ connectionString });
	return drizzle(pool, { schema });
}

export const db = createDb(process.env.DATABASE_URL);

export type Database = ReturnType<typeof createDb>;
