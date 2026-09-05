import { factory } from '#/factory.js';
import { loginUser, logoutUser, registerUser } from '#/handlers/auth.js';
import { requireAuth } from '#/middleware/auth.js';

export const authRoutes = factory
	.createApp()
	.post('/register', ...registerUser)
	.post('/login', ...loginUser)
	.post('/logout', requireAuth, ...logoutUser);
