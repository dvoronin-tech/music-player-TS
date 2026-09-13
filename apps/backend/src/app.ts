import { Hono } from 'hono';
import { HTTPException } from 'hono/http-exception';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { factory } from './factory.js';
import { routes } from './routes/index.js';
import { env } from './utils/env.js';

const allowedOrigins = env.CORS_ORIGIN.split(',').map((value) => value.trim());

function resolveCorsOrigin(origin: string): string | undefined {
	if (allowedOrigins.includes(origin)) {
		return origin;
	}

	try {
		const { protocol, hostname } = new URL(origin);
		if (protocol === 'https:' && hostname.endsWith('.vercel.app')) {
			return origin;
		}
	} catch {
		return undefined;
	}

	return undefined;
}

export const app = factory.createApp();
export default app;

app.use('*', logger());
app.use(
	'*',
	cors({
		origin: resolveCorsOrigin,
		allowHeaders: ['Content-Type', 'Authorization'],
		allowMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
	}),
);

app.route('/', routes);

app.notFound((c) => c.json({ error: 'Not found' }, 404));

app.onError((err, c) => {
	if (err instanceof HTTPException) {
		return err.getResponse();
	}

	console.error(err);
	return c.json({ error: 'Internal server error' }, 500);
});
