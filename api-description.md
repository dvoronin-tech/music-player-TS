# API Description

Base URL: `https://music-server-production-5ca2.up.railway.app`

Authentication is handled via a custom `Token` header (not `Authorization: Bearer`), unless the token is passed directly in the URL path.

Token is stored in `localStorage` under the key `Token` after successful login.

---

## `/api/users/register/`

**Method:** `POST`

**Auth:** not required

**Headers:**
```
Content-Type: application/json
```

**Request body:**
```json
{
  "username": "string",
  "password": "string",
  "email": "string"
}
```

**Success response:**
```json
{
  "data": "string"
}
```
Success message text shown to the user (e.g. confirmation that registration succeeded).

**Error response:**
```json
{
  "error": "string"
}
```
Error message text shown to the user.

**Used in:** `apps/frontend/src/pages/auth/auth.tsx`

---

## `/api/users/auth/`

**Method:** `POST`

**Auth:** not required

**Headers:**
```
Content-Type: application/json
```

**Request body:**
```json
{
  "username": "string",
  "password": "string"
}
```

**Success response:**
```json
{
  "token": "string"
}
```
Token is saved to `localStorage` as `Token`, then the app reloads and navigates to `/home`.

**Error response:**
```json
{
  "error": "string"
}
```

**Used in:** `apps/frontend/src/pages/auth/auth.tsx`

---

## `/api/users/getdata/{token}/`

**Method:** `GET`

**Auth:** token passed in URL path

**Headers:** none

**Request body:** none

**URL params:**
- `{token}` — value from `localStorage.getItem('Token')`

**Success response:**
```json
{
  "username": "string",
  "email": "string",
  "reg_date": "string",
  "user_img": "string | null"
}
```

| Field       | Type            | Description                          |
|-------------|-----------------|--------------------------------------|
| `username`  | string          | User display name                    |
| `email`     | string          | User email                           |
| `reg_date`  | string          | Registration date (ISO date string)  |
| `user_img`  | string \| null  | URL or path to user avatar           |

**Used in:** `apps/frontend/src/store/user/reducerUser.ts`

---

## `/api/users/logout/`

**Method:** `GET`

**Auth:** required

**Headers:**
```
Token: "<token>"
```
> Note: in `authAfterReg.tsx` the token is sent as `JSON.stringify(localStorage.getItem('Token'))`, which wraps the token in extra quotes. Other endpoints send the raw token value.

**Request body:** none

**Response:** not parsed by the frontend. After the request, `Token` is removed from `localStorage` locally.

**Used in:** `apps/frontend/src/pages/authAfterReg/authAfterReg.tsx`, `apps/frontend/src/components/accountDataBar/accountDataBar.tsx`

---

## `/api/users/toggleliked/`

**Method:** `PUT`

**Auth:** required

**Headers:**
```
Content-Type: application/json
Token: "<token>"
```

**Request body:**
```json
{
  "liked_track_list": ["trackId"]
}
```

| Field               | Type     | Description                              |
|---------------------|----------|------------------------------------------|
| `liked_track_list`  | string[] | Array with a single track ID to toggle   |

**Success response:**
```json
{
  "data": [
    {
      "title": "string",
      "artists": "string",
      "albumImg": "string",
      "music": "string",
      "id": "string",
      "auditions": "number"
    }
  ]
}
```

Returns the full updated list of liked tracks. `albumImg` and `music` are relative paths — the frontend prepends the base URL.

**Used in:** `apps/frontend/src/store/likedPlayList/reducerLiked.ts`

---

## `/api/users/getlikedartists/`

**Method:** `GET`

**Auth:** required

**Headers:**
```
Content-Type: application/json
Token: "<token>"
```

**Request body:** none

**Success response:**
```json
[
  {
    "name": "string",
    "artistImg": "string",
    "likes": "number",
    "tracks": ["string"],
    "id": "number",
    "big_img": "string"
  }
]
```

Returns an array of liked artists. `artistImg` and `big_img` are relative paths — the frontend prepends the base URL.

**Used in:** `apps/frontend/src/store/likedArtists/reducerLikedArtists.ts`

---

## `/api/users/toggleartists/`

**Method:** `PUT`

**Auth:** required

**Headers:**
```
Content-Type: application/json
Token: "<token>"
```

**Request body:**
```json
{
  "liked_artists": ["artistId"]
}
```

| Field            | Type                  | Description                              |
|------------------|-----------------------|------------------------------------------|
| `liked_artists`  | (string \| number)[]  | Array with a single artist ID to toggle  |

**Success response:**
```json
[
  {
    "name": "string",
    "artistImg": "string",
    "likes": "number",
    "tracks": ["string"],
    "id": "number",
    "big_img": "string"
  }
]
```

Returns the full updated list of liked artists. `artistImg` and `big_img` are relative paths — the frontend prepends the base URL.

**Used in:** `apps/frontend/src/store/likedArtists/reducerLikedArtists.ts`

---

## `/api/users/setuserphoto/`

**Method:** `PUT`

**Auth:** required

**Headers:**
```
Token: "<token>"
```
> Note: `Content-Type` is not set manually — the browser sets it automatically for `FormData` (multipart).

**Request body:** `FormData`
```
user_img: File
```

**Success response:**
```json
{
  "user_img": "string"
}
```

Returns a relative path to the uploaded avatar. The frontend prepends the base URL before saving to Redux state.

**Used in:** `apps/frontend/src/components/accountDataBar/accountDataBar.tsx`

---

## `/api/tracks/`

**Method:** `GET`

**Auth:** not required

**Headers:** none

**Request body:** none

**Success response:**
```json
[
  {
    "title": "string",
    "artists": "string",
    "albumImg": "string",
    "music": "string",
    "id": "string",
    "auditions": "number"
  }
]
```

Returns an array of all tracks. `albumImg` and `music` are full URLs — the frontend replaces `http` with `https`.

| Field        | Type   | Description                    |
|--------------|--------|--------------------------------|
| `title`      | string | Track title                    |
| `artists`    | string | Artist name(s)                 |
| `albumImg`   | string | Album cover image URL          |
| `music`      | string | Audio file URL                 |
| `id`         | string | Unique track identifier        |
| `auditions`  | number | Play count                     |

**Used in:** `apps/frontend/src/store/tracks/reducerTrackList.ts`

---

## `/api/tracks/getliked/`

**Method:** `GET`

**Auth:** required

**Headers:**
```
Token: "<token>"
```

**Request body:** none

**Success response:**
```json
{
  "data": [
    {
      "title": "string",
      "artists": "string",
      "albumImg": "string",
      "music": "string",
      "id": "string",
      "auditions": "number"
    }
  ]
}
```

Returns liked tracks wrapped in a `data` field. `albumImg` and `music` are relative paths — the frontend prepends the base URL.

**Used in:** `apps/frontend/src/store/likedPlayList/reducerLiked.ts`

---

## `/api/tracks/getartisttracks/`

**Method:** `POST`

**Auth:** not required

**Headers:**
```
Content-Type: application/json
```

**Request body:**
```json
{
  "tracks": ["trackId1", "trackId2"]
}
```

| Field     | Type     | Description                          |
|-----------|----------|--------------------------------------|
| `tracks`  | string[] | Array of track IDs for one artist    |

**Success response:**
```json
{
  "data": [
    {
      "title": "string",
      "artists": "string",
      "albumImg": "string",
      "music": "string",
      "id": "string",
      "auditions": "number"
    }
  ]
}
```

Returns tracks for the given IDs wrapped in a `data` field. `albumImg` and `music` are relative paths — the frontend prepends the base URL.

**Used in:** `apps/frontend/src/store/artistsTracks/reducerArtistsTracks.ts`

---

## `/api/tracks/addaudition/`

**Method:** `POST`

**Auth:** not required

**Headers:**
```
Content-Type: application/json
```

**Request body:**
```json
{
  "trackId": "string"
}
```

**Response:** not parsed by the frontend. Fire-and-forget call to increment the play count when a track starts playing.

**Used in:** `apps/frontend/src/pages/audioModule/audioModule.tsx`

---

## `/api/artists/`

**Method:** `GET`

**Auth:** not required

**Headers:** none

**Request body:** none

**Success response:**
```json
[
  {
    "name": "string",
    "artistImg": "string",
    "likes": "number",
    "tracks": ["string"],
    "id": "number",
    "big_img": "string"
  }
]
```

Returns an array of all artists. `artistImg` and `big_img` are full URLs — the frontend replaces `http` with `https`.

| Field        | Type     | Description                              |
|--------------|----------|------------------------------------------|
| `name`       | string   | Artist name (used in routes)             |
| `artistImg`  | string   | Small avatar image URL                   |
| `likes`      | number   | Total likes count                        |
| `tracks`     | string[] | Array of track IDs belonging to artist   |
| `id`         | number   | Unique artist identifier                 |
| `big_img`    | string   | Large banner image URL                   |

**Used in:** `apps/frontend/src/store/artists/reducerArtists.ts`

---

## Media URLs (not REST endpoints)

These are not API routes — they are static media files served by the backend. URLs come from API responses.

| Resource     | Source fields                          | Usage                                      |
|--------------|----------------------------------------|--------------------------------------------|
| Audio files  | `music` on track objects               | Fetched as blob in `audioModule.tsx`       |
| Album covers | `albumImg` on track objects            | Displayed in track cards                   |
| Artist avatars | `artistImg`, `big_img` on artist objects | Displayed on artist pages/cards          |
| User avatar  | `user_img` on user object              | Displayed in account panel                 |
