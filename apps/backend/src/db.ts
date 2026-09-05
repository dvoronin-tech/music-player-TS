import { createDb, type Database } from '@music-player/db';
import { env } from '#/utils/env.js';

export const db: Database = createDb(env.DATABASE_URL);
