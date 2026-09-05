import { eq } from 'drizzle-orm';
import { tokens, users } from '@music-player/db';
import { db } from '#/db.js';
import { factory } from '#/factory.js';
import { toApiUser } from '#/mappers.js';
import { loginBodySchema, registerBodySchema } from '#/schemas/auth.js';
import { jsonError } from '#/utils/http.js';
import { hashPassword, verifyPassword } from '#/utils/password.js';
import { uniqueConstraint } from '#/utils/pg-errors.js';
import { createToken } from '#/utils/token.js';
import { validateJson } from '#/utils/validate.js';

export const registerUser = factory.createHandlers(
	validateJson(registerBodySchema),
	async (c) => {
		const body = c.req.valid('json');

		try {
			const [user] = await db
				.insert(users)
				.values({
					username: body.username,
					email: body.email,
					passwordHash: await hashPassword(body.password),
				})
				.returning();

			if (!user) {
				return jsonError(c, 500, 'Failed to create user');
			}

			return c.json({ user: toApiUser(user) }, 201);
		} catch (error) {
			const constraint = uniqueConstraint(error);
			if (constraint === 'users_username_unique') {
				return jsonError(c, 409, 'Username is already taken');
			}
			if (constraint === 'users_email_unique') {
				return jsonError(c, 409, 'Email is already taken');
			}
			throw error;
		}
	},
);

export const loginUser = factory.createHandlers(
	validateJson(loginBodySchema),
	async (c) => {
		const { username, password } = c.req.valid('json');
		const user = await db.query.users.findFirst({
			where: eq(users.username, username),
		});

		if (!user || !(await verifyPassword(password, user.passwordHash))) {
			return jsonError(c, 401, 'Invalid username or password');
		}

		const token = createToken();
		await db.transaction(async (tx) => {
			await tx.delete(tokens).where(eq(tokens.userId, user.id));
			await tx.insert(tokens).values({ key: token, userId: user.id });
		});

		return c.json({ token, user: toApiUser(user) });
	},
);

export const logoutUser = factory.createHandlers(async (c) => {
	await db.delete(tokens).where(eq(tokens.key, c.get('token')));
	return c.body(null, 204);
});
