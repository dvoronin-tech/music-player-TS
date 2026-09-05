import { createFactory } from 'hono/factory';

export type AppEnv = {
	Variables: Record<string, never>;
};

export const factory = createFactory<AppEnv>();
