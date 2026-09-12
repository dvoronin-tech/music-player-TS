import type { ZodError } from 'zod';

export type AuthField = 'username' | 'password' | 'email';
export type AuthFieldErrors = Partial<Record<AuthField, string>>;

export function toFieldErrors(error: ZodError): AuthFieldErrors {
	const errors: AuthFieldErrors = {};
	for (const issue of error.issues) {
		const field = issue.path[0];
		if (
			typeof field === 'string' &&
			(field === 'username' || field === 'password' || field === 'email') &&
			!errors[field]
		) {
			errors[field] = issue.message;
		}
	}
	return errors;
}
