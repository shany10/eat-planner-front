#!/bin/sh
set -e

HOST="${NUXT_HOST:-0.0.0.0}"
PORT="${NUXT_PORT:-3000}"

echo "[entrypoint] Preparing writable directories..."
mkdir -p /app/node_modules /app/.nuxt /tmp/.npm /tmp/vite

echo "[entrypoint] Fixing permissions (node_modules volume)..."
chown -R node:node /app/node_modules /app/.nuxt /tmp/.npm /tmp/vite 2>/dev/null || true

# When /app/node_modules is a named volume, it shadows the image's node_modules and starts empty.
if ! su-exec node node -e "require.resolve('nuxt/package.json')" 1>/dev/null 2>&1; then
	echo "[entrypoint] Installing dependencies (first run / empty node_modules volume)..."
	su-exec node npm ci --include=dev --cache /tmp/.npm --prefer-offline --no-audit
fi

# If the user provided a custom command, run it (as node).
if [ "$#" -gt 0 ] && [ "$1" != "dev" ]; then
	exec su-exec node "$@"
fi

echo "[entrypoint] Starting Nuxt dev server on ${HOST}:${PORT}..."
exec su-exec node npm run dev -- --host "$HOST" --port "$PORT"
