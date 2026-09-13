import { config } from 'dotenv';
import { z } from 'zod';

config();

const envSchema = z.object({
	PORT: z.coerce.number().default(4041),
	DATABASE_URL: z.string().min(1),
	PUBLIC_BASE_URL: z
		.url()
		.default('https://music-player-backend-coral.vercel.app'),
	CORS_ORIGIN: z
		.string()
		.default('https://music-player-frontend-gules.vercel.app'),
	MEDIA_URL: z
		.url()
		.default(
			'https://xjroavcraijiboxfonfa.supabase.co/storage/v1/object/public',
		),
	UPLOAD_MEDIA_URL: z
		.url()
		.default('https://xjroavcraijiboxfonfa.supabase.co/storage/v1/object'),
	SUPABASE_SECRET_KEY: z.string().min(1),
});

export const env = envSchema.parse(process.env);
