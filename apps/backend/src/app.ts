import { serveStatic } from '@hono/node-server/serve-static';
import { HTTPException } from 'hono/http-exception';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { factory } from '@/factory.js';
import { routes } from '@/routes/index.js';
import { env } from '@/utils/env.js';

export const app = factory.createApp();

app.use('*', logger());
app.use(
	'*',
	cors({
		origin: env.CORS_ORIGIN,
		allowHeaders: ['Content-Type', 'Authorization'],
		allowMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
	}),
);
app.use('/media/*', serveStatic({ root: './' }));
app.route('/', routes);

app.notFound((c) => c.json({ error: 'Not found' }, 404));

app.onError((err, c) => {
	if (err instanceof HTTPException) {
		return err.getResponse();
	}

	console.error(err);
	return c.json({ error: 'Internal server error' }, 500);
});

export type AppType = typeof app;
