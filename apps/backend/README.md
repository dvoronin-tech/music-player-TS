# Backend

Hono API for the music player. Schema lives in `@music-player/db` and is not changed from this app.

```
pnpm install
cp .env.example .env
pnpm --filter @music-player/db migrate
pnpm dev
```

Server: `http://localhost:4041`

## Auth

Send `Authorization: Bearer <token>` on protected routes. Token is an opaque key stored in `tokens` (one session per user; login replaces it).

Errors are always:

```json
{ "error": "string" }
```

JSON is camelCase. Media fields are absolute URLs (`PUBLIC_BASE_URL` + stored path, or the stored URL if it is already absolute).

## Endpoints

| Method | Path | Auth | Success |
| --- | --- | --- | --- |
| POST | `/api/auth/register` | no | `201 { user }` |
| POST | `/api/auth/login` | no | `{ token, user }` |
| POST | `/api/auth/logout` | yes | `204` |
| GET | `/api/me` | yes | `user` |
| PUT | `/api/me/photo` | yes | `user` (multipart field `userImg`) |
| GET | `/api/me/liked-tracks` | yes | `Track[]` |
| POST | `/api/me/liked-tracks/:id` | yes | `Track[]` (idempotent like) |
| DELETE | `/api/me/liked-tracks/:id` | yes | `Track[]` (idempotent unlike) |
| GET | `/api/me/liked-artists` | yes | `Artist[]` |
| POST | `/api/me/liked-artists/:id` | yes | `Artist[]` |
| DELETE | `/api/me/liked-artists/:id` | yes | `Artist[]` |
| GET | `/api/tracks` | no | `Track[]` |
| GET | `/api/tracks/:id` | no | `Track` |
| POST | `/api/tracks/:id/play` | no | `{ id, auditions }` |
| GET | `/api/artists` | no | `Artist[]` |
| GET | `/api/artists/:id` | no | `Artist` + `tracks` |
| GET | `/media/*` | no | uploaded files |

### User

```ts
{
  id: string
  username: string
  email: string
  regDate: string // ISO
  userImg: string | null
}
```

Register body: `{ username, email, password }` (username 3–32 `[A-Za-z0-9_]`, password 8–72). Login body: `{ username, password }`.

### Track

```ts
{
  id: string
  title: string
  artists: { id: number, name: string }[]
  albumImg: string
  music: string
  auditions: number
}
```

### Artist

```ts
{
  id: number
  name: string
  artistImg: string
  bigImg: string
  likes: number // COUNT of followers
  trackIds: string[]
  tracks?: Track[] // only on GET /api/artists/:id
}
```
