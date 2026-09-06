import { config } from 'dotenv';
import { sql } from 'drizzle-orm';
import { createDb } from '../src/client.js';

config();

const db = createDb(process.env.DATABASE_URL);

async function main() {
	await db.execute(sql`
		TRUNCATE TABLE
			user_liked_tracks,
			user_liked_artists,
			tokens,
			artists_to_tracks,
			tracks,
			artists,
			users
		RESTART IDENTITY CASCADE
	`);
	console.log('Database cleared');
	process.exit(0);
}

main().catch((error) => {
	console.error(error);
	process.exit(1);
});
