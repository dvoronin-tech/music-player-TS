import { zValidator } from '@hono/zod-validator';
import { factory } from '@/factory.js';
import { healthQuerySchema } from '@/schemas/health.js';

export const getHealth = factory.createHandlers(
	zValidator('query', healthQuerySchema),
	(c) => {
		const query = c.req.valid('query');

		return c.json({
			status: 'ok' as const,
			verbose: query.verbose === 'true',
		});
	},
);
