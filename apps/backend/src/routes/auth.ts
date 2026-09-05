import { factory } from '@/factory.js';
import { loginUser, logoutUser, registerUser } from '@/handlers/auth.js';
import { requireAuth } from '@/middleware/auth.js';

export const authRoutes = factory.createApp();

authRoutes.post('/register', ...registerUser);
authRoutes.post('/login', ...loginUser);
authRoutes.post('/logout', requireAuth, ...logoutUser);
