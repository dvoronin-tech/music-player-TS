import type { Context } from 'hono';
import type { ContentfulStatusCode } from 'hono/utils/http-status';
import type { AppEnv } from '@/factory.js';

export function jsonError(
	c: Context<AppEnv>,
	status: ContentfulStatusCode,
	message: string,
) {
	return c.json({ error: message }, status);
}
