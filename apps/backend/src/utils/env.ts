import { config } from 'dotenv';
import path from 'node:path';
import { z } from 'zod';

config();
config({ path: path.resolve(process.cwd(), '../../packages/db/.env') });

const envSchema = z.object({
	PORT: z.coerce.number().default(4041),
	DATABASE_URL: z.string().min(1),
	PUBLIC_BASE_URL: z.url().default('http://localhost:4041'),
	CORS_ORIGIN: z.string().default('http://localhost:4040'),
});

export const env = envSchema.parse(process.env);
