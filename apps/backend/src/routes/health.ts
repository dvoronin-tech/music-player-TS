import { factory } from '@/factory.js';
import { getHealth } from '@/handlers/health.js';

export const healthRoutes = factory.createApp();

healthRoutes.get('/', ...getHealth);
