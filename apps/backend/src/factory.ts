import { createFactory } from 'hono/factory';

export type AppEnv = {
	Variables: {
		userId: string;
		token: string;
	};
};

export const factory = createFactory<AppEnv>({
	defaultAppOptions: { strict: false },
});
