import { z } from 'zod';

export const trackIdParamSchema = z.object({
	id: z.string().min(1, 'Track id is required'),
});

export const artistIdParamSchema = z.object({
	id: z.coerce.number().int().positive('Artist id must be a positive integer'),
});
