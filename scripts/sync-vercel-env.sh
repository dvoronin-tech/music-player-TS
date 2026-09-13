#!/usr/bin/env bash
set -euo pipefail

# Copies local app env files to the two Vercel projects.
# Does not print secret values.

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SCOPE="uuuuuwwwwwuuuuus-projects"
BACKEND_PROJECT="music-player-backend"
FRONTEND_PROJECT="music-player-frontend"
BACKEND_URL="https://music-player-backend-uuuuuwwwwwuuuuus-projects.vercel.app"
FRONTEND_URL="https://music-player-frontend-gules.vercel.app"

if ! command -v vercel >/dev/null 2>&1; then
	vercel() {
		pnpm dlx vercel "$@"
	}
fi

if ! vercel whoami >/dev/null 2>&1; then
	echo "Vercel CLI is not logged in. Run: pnpm dlx vercel login"
	exit 1
fi

set -a
# shellcheck disable=SC1091
source "$ROOT/apps/backend/.env"
set +a

upsert_env() {
	local project="$1"
	local key="$2"
	local value="$3"
	shift 3
	vercel env add "$key" production,preview,development \
		--project "$project" \
		--scope "$SCOPE" \
		--yes \
		--force \
		--value "$value" \
		"$@"
}

upsert_env "$BACKEND_PROJECT" DATABASE_URL "$DATABASE_URL" --sensitive
upsert_env "$BACKEND_PROJECT" SUPABASE_SECRET_KEY "$SUPABASE_SECRET_KEY" --sensitive
upsert_env "$BACKEND_PROJECT" MEDIA_URL "$MEDIA_URL" --no-sensitive
upsert_env "$BACKEND_PROJECT" UPLOAD_MEDIA_URL "$UPLOAD_MEDIA_URL" --no-sensitive
upsert_env "$BACKEND_PROJECT" PUBLIC_BASE_URL "$BACKEND_URL" --no-sensitive
upsert_env "$BACKEND_PROJECT" CORS_ORIGIN "$FRONTEND_URL" --no-sensitive
upsert_env "$FRONTEND_PROJECT" VITE_API_URL "$BACKEND_URL" --no-sensitive

echo "Environment variables synced for $FRONTEND_PROJECT and $BACKEND_PROJECT."
