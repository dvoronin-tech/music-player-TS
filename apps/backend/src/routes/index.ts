import { factory } from '@/factory.js';
import { healthRoutes } from '@/routes/health.js';

export const routes = factory.createApp();

routes.route('/health', healthRoutes);
