import { registerHooks } from 'node:module';

registerHooks({
	load(url, context, nextLoad) {
		if (url.includes('/utils/constants.ts') || url.includes('/utils/constants.js')) {
			return {
				format: 'module',
				shortCircuit: true,
				source: `
					export const publicUrl = './';
					export const serverUrl = 'http://rtk-verify.local';
				`,
			};
		}

		return nextLoad(url, context);
	},
});
