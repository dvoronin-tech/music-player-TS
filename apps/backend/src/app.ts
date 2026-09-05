import { factory } from '@/factory.js';
import { routes } from '@/routes/index.js';

export const app = factory.createApp();

app.route('/', routes);
