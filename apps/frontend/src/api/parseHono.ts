import type { ClientResponse } from 'hono/client';
import type { ContentfulStatusCode } from 'hono/utils/http-status';

export type QueryError = { status: number; data: string };

export async function parseHonoJson<T>(
	res: ClientResponse<T, ContentfulStatusCode, 'json'> | Response,
): Promise<{ data: T } | { error: QueryError }> {
	if (!res.ok) {
		const body = (await res.json().catch(() => ({ error: res.statusText }))) as {
			error?: string;
		};
		return {
			error: {
				status: res.status,
				data: body.error ?? res.statusText,
			},
		};
	}

	if (res.status === 204) {
		return { data: undefined as T };
	}

	const data = (await res.json()) as T;
	return { data };
}
