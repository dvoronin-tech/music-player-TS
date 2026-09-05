type LocalStorageMock = {
	getItem: (key: string) => string | null;
	setItem: (key: string, value: string) => void;
	removeItem: (key: string) => void;
	clear: () => void;
	key: (index: number) => string | null;
	length: number;
};

const token = 'verify-token';
const store: Record<string, string> = { Token: token };

const localStorageMock: LocalStorageMock = {
	getItem: (key) => store[key] ?? null,
	setItem: (key, value) => {
		store[key] = value;
	},
	removeItem: (key) => {
		delete store[key];
	},
	clear: () => {
		for (const key of Object.keys(store)) {
			delete store[key];
		}
	},
	key: (index) => Object.keys(store)[index] ?? null,
	length: 1,
};

Object.defineProperty(globalThis, 'localStorage', {
	value: localStorageMock,
	configurable: true,
});

const track = {
	id: 'track-1',
	title: 'Verify Track',
	artists: [{ id: 1, name: 'Verify Artist' }],
	albumImg: 'http://localhost:4041/media/track.jpg',
	music: 'http://localhost:4041/media/track.mp3',
	auditions: 4,
};

const artist = {
	id: 1,
	name: 'Verify Artist',
	artistImg: 'http://localhost:4041/media/artist.jpg',
	bigImg: 'http://localhost:4041/media/artist-big.jpg',
	likes: 0,
	trackIds: ['track-1'],
};

const artistDetail = { ...artist, tracks: [track] };
const user = {
	id: 'user-1',
	username: 'verify',
	email: 'verify@example.com',
	regDate: '2026-01-01T00:00:00.000Z',
	userImg: null,
};

let likedTracks = [] as typeof track[];
let likedArtists = [] as Array<typeof artist>;
const seen = new Set<string>();

globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
	const request = new Request(input, init);
	const url = new URL(request.url, 'http://rtk-verify.local');
	const key = `${request.method} ${url.pathname}`;
	seen.add(key);

	const json = (body: unknown, status = 200) =>
		new Response(JSON.stringify(body), {
			status,
			headers: { 'Content-Type': 'application/json' },
		});

	if (key === 'GET /api/tracks') {
		return json([track]);
	}
	if (key === 'POST /api/tracks/track-1/play') {
		track.auditions += 1;
		return json({ id: track.id, auditions: track.auditions });
	}
	if (key === 'GET /api/artists') {
		return json([artist]);
	}
	if (key === 'GET /api/artists/1') {
		return json(artistDetail);
	}
	if (key === 'GET /api/me') {
		if (request.headers.get('Authorization') !== `Bearer ${token}`) {
			return json({ error: 'Missing bearer token' }, 401);
		}
		return json(user);
	}
	if (key === 'GET /api/me/liked-tracks') {
		return json(likedTracks);
	}
	if (key === 'POST /api/me/liked-tracks/track-1') {
		likedTracks = [track];
		return json(likedTracks);
	}
	if (key === 'DELETE /api/me/liked-tracks/track-1') {
		likedTracks = [];
		return json(likedTracks);
	}
	if (key === 'GET /api/me/liked-artists') {
		return json(likedArtists);
	}
	if (key === 'POST /api/me/liked-artists/1') {
		likedArtists = [{ ...artist, likes: 1 }];
		return json(likedArtists);
	}
	if (key === 'DELETE /api/me/liked-artists/1') {
		likedArtists = [];
		return json(likedArtists);
	}
	if (key === 'POST /api/auth/register') {
		return json({ user }, 201);
	}
	if (key === 'POST /api/auth/login') {
		return json({ token, user });
	}
	if (key === 'POST /api/auth/logout') {
		return new Response(null, { status: 204 });
	}

	return json({ error: `Unexpected request ${key}` }, 500);
}) as typeof fetch;

function assert(condition: unknown, message: string): asserts condition {
	if (!condition) {
		throw new Error(message);
	}
}

const { configureStore } = await import('@reduxjs/toolkit');
const { baseApi } = await import('@/api/baseApi');
const { tracksApi } = await import('@/api/rtk/tracks');
const { artistsApi } = await import('@/api/rtk/artists');
const { userApi } = await import('@/api/rtk/user');
const { likedApi } = await import('@/api/rtk/liked');
const { authApi } = await import('@/api/rtk/auth');

const storeInstance = configureStore({
	reducer: {
		[baseApi.reducerPath]: baseApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(baseApi.middleware),
});

const tracksResult = await storeInstance.dispatch(
	tracksApi.endpoints.getTracks.initiate(),
);
assert(tracksResult.data?.[0]?.id === 'track-1', 'getTracks should cache the track');

const playResult = await storeInstance.dispatch(
	tracksApi.endpoints.playTrack.initiate('track-1'),
);
assert(playResult.data?.auditions === 5, 'playTrack should return updated auditions');

const artistsResult = await storeInstance.dispatch(
	artistsApi.endpoints.getArtists.initiate(),
);
assert(artistsResult.data?.[0]?.name === 'Verify Artist', 'getArtists should cache artists');

const artistResult = await storeInstance.dispatch(
	artistsApi.endpoints.getArtist.initiate(1),
);
assert(artistResult.data?.tracks[0]?.id === 'track-1', 'getArtist should include tracks');

const meResult = await storeInstance.dispatch(userApi.endpoints.getMe.initiate());
assert(meResult.data?.username === 'verify', 'getMe should return the user');

const likedTracksResult = await storeInstance.dispatch(
	likedApi.endpoints.getLikedTracks.initiate(),
);
assert(likedTracksResult.data?.length === 0, 'getLikedTracks should start empty');

const likeTrackResult = await storeInstance.dispatch(
	likedApi.endpoints.toggleLikedTrack.initiate({
		id: 'track-1',
		isLiked: false,
	}),
);
assert(likeTrackResult.data?.[0]?.id === 'track-1', 'liking a track should return it');
const likedTracksAfterLike = await storeInstance.dispatch(
	likedApi.endpoints.getLikedTracks.initiate(undefined, { forceRefetch: true }),
);
assert(
	likedTracksAfterLike.data?.[0]?.id === 'track-1',
	'getLikedTracks should contain the liked track after toggle',
);

const unlikeTrackResult = await storeInstance.dispatch(
	likedApi.endpoints.toggleLikedTrack.initiate({
		id: 'track-1',
		isLiked: true,
	}),
);
assert(unlikeTrackResult.data?.length === 0, 'unliking a track should return an empty list');

const likedArtistsResult = await storeInstance.dispatch(
	likedApi.endpoints.getLikedArtists.initiate(),
);
assert(likedArtistsResult.data?.length === 0, 'getLikedArtists should start empty');

const likeArtistResult = await storeInstance.dispatch(
	likedApi.endpoints.toggleLikedArtist.initiate({
		id: 1,
		isLiked: false,
	}),
);
assert(likeArtistResult.data?.[0]?.id === 1, 'liking an artist should return it');

const unlikeArtistResult = await storeInstance.dispatch(
	likedApi.endpoints.toggleLikedArtist.initiate({
		id: 1,
		isLiked: true,
	}),
);
assert(
	unlikeArtistResult.data?.length === 0,
	'unliking an artist should return an empty list',
);

const registerResult = await storeInstance.dispatch(
	authApi.endpoints.register.initiate({
		username: 'verify',
		email: 'verify@example.com',
		password: 'password1',
	}),
);
assert(registerResult.data?.user.username === 'verify', 'register should return the user');

const loginResult = await storeInstance.dispatch(
	authApi.endpoints.login.initiate({
		username: 'verify',
		password: 'password1',
	}),
);
assert(loginResult.data?.token === token, 'login should return a token');

const logoutResult = await storeInstance.dispatch(
	authApi.endpoints.logout.initiate(),
);
assert(!('error' in logoutResult), 'logout should succeed with an empty body');

const required = [
	'GET /api/tracks',
	'POST /api/tracks/track-1/play',
	'GET /api/artists',
	'GET /api/artists/1',
	'GET /api/me',
	'GET /api/me/liked-tracks',
	'GET /api/me/liked-artists',
	'POST /api/me/liked-tracks/track-1',
	'DELETE /api/me/liked-tracks/track-1',
	'POST /api/me/liked-artists/1',
	'DELETE /api/me/liked-artists/1',
	'POST /api/auth/register',
	'POST /api/auth/login',
	'POST /api/auth/logout',
];

for (const request of required) {
	assert(seen.has(request), `Expected Hono client to call ${request}`);
}

console.log('RTK Query store verification passed');
