export function uniqueConstraint(error: unknown): string | undefined {
	if (
		typeof error === 'object' &&
		error !== null &&
		'code' in error &&
		error.code === '23505' &&
		'constraint' in error &&
		typeof error.constraint === 'string'
	) {
		return error.constraint;
	}

	return undefined;
}
