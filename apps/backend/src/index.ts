import { serve } from '@hono/node-server';
import { app } from './app.js';
import { env } from './utils/env.js';

export default app;

if (process.env.VERCEL !== '1') {
	serve(
		{
			fetch: app.fetch,
			port: env.PORT,
		},
		(info) => {
			console.log(`Server is running on http://localhost:${info.port}`);
		},
	);
}
