import { z } from 'zod';

export const registerBodySchema = z.object({
	username: z
		.string()
		.trim()
		.min(3, 'Username must be at least 3 characters')
		.max(32, 'Username must be at most 32 characters')
		.regex(
			/^[a-zA-Z0-9_]+$/,
			'Username may contain letters, numbers, and underscore',
		),
	email: z.email('Invalid email').trim().toLowerCase(),
	password: z
		.string()
		.min(8, 'Password must be at least 8 characters')
		.max(72, 'Password must be at most 72 characters'),
});

export const loginBodySchema = z.object({
	username: z
		.string({ error: 'Username is required' })
		.trim()
		.min(1, 'Username is required'),
	password: z
		.string({ error: 'Password is required' })
		.min(1, 'Password is required'),
});
