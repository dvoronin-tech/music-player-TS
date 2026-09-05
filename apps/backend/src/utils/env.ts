import { config } from 'dotenv';
import { z } from 'zod';

config();

const envSchema = z.object({
	PORT: z.coerce.number().default(4041),
	DATABASE_URL: z.string().optional(),
});

export const env = envSchema.parse(process.env);
