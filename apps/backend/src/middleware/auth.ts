import { db } from '@/db.js';
import { factory } from '@/factory.js';
import { jsonError } from '@/utils/http.js';

export const requireAuth = factory.createMiddleware(async (c, next) => {
	const header = c.req.header('Authorization');
	if (!header?.startsWith('Bearer ')) {
		return jsonError(c, 401, 'Missing bearer token');
	}

	const token = header.slice('Bearer '.length).trim();
	if (!token) {
		return jsonError(c, 401, 'Missing bearer token');
	}

	const row = await db.query.tokens.findFirst({
		where: (tokens, { eq }) => eq(tokens.key, token),
	});
	if (!row) {
		return jsonError(c, 401, 'Invalid token');
	}

	c.set('userId', row.userId);
	c.set('token', token);
	await next();
});
