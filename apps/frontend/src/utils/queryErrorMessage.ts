const FALLBACK_ERROR = 'Неполадки с сервером, попробуйте позже';

export function queryErrorMessage(error: unknown): string {
	if (!error || typeof error !== 'object') {
		return FALLBACK_ERROR;
	}

	if ('data' in error && typeof error.data === 'string') {
		return error.data;
	}

	if ('message' in error && typeof error.message === 'string' && error.message) {
		return error.message;
	}

	return FALLBACK_ERROR;
}
