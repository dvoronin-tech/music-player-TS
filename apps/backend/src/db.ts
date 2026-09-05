import { createDb } from '@music-player/db';
import { env } from '@/utils/env.js';

export const db = createDb(env.DATABASE_URL);
