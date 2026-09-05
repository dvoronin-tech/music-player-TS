import { hc } from 'hono/client';
import type { AppType } from '@music-player/backend';
import { serverUrl } from '@/utils/constants';

export const client = hc<AppType>(serverUrl);