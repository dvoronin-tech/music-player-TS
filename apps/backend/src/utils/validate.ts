import { zValidator } from '@hono/zod-validator';
import type { ZodType } from 'zod';

function firstIssue(error: { issues: Array<{ message: string }> }) {
	return error.issues[0]?.message ?? 'Invalid request';
}

export function validateJson<T extends ZodType>(schema: T) {
	return zValidator('json', schema, (result, c) => {
		if (!result.success) {
			return c.json({ error: firstIssue(result.error) }, 400);
		}
	});
}

export function validateParam<T extends ZodType>(schema: T) {
	return zValidator('param', schema, (result, c) => {
		if (!result.success) {
			return c.json({ error: firstIssue(result.error) }, 400);
		}
	});
}
