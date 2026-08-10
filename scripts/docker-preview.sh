#!/usr/bin/env bash
# Preview the site in a Node Docker container.
#
# Builds the site (fresh PDS cache + Astro build) on the host, then serves
# it with `astro preview` inside a node:22 container. The repo and its
# node_modules are mounted into the container so the exact pinned Astro
# version serves the build; the container exits when you press Ctrl-C.
#
# Usage:
#   ./scripts/docker-preview.sh [--port 4321] [--rebuild]
#
# Flags:
#   --port N     host port to bind (default 4321)
#   --rebuild    run the full prebuild (PDS fetch) + Astro build inside the
#                container instead of reusing the host's dist/ output
#
# Requirements: docker (running), pnpm, node.

set -euo pipefail

PORT=4321
REBUILD=0

while [[ $# -gt 0 ]]; do
    case "$1" in
        --port)
            PORT="${2:?--port requires a value}"
            shift 2
            ;;
        --rebuild)
            REBUILD=1
            shift
            ;;
        *)
            echo "Unknown argument: $1" >&2
            echo "Usage: $0 [--port 4321] [--rebuild]" >&2
            exit 1
            ;;
    esac
done

cd "$(dirname "$0")/.." # repo root

# Docker runs as root by default; build artifacts written by the host user
# must be readable by the container (and vice versa for --rebuild output).
DOCKER_RUN=(
    docker run
    --rm
    -v "$PWD:/app"
    -w /app
    -p "$PORT:4321"
    --user "$(id -u):$(id -g)"
    -e HOME=/tmp
)

if [[ $REBUILD -eq 1 ]]; then
    echo "==> Installing dependencies in the container (first run only)"
    # node:22 ships corepack (no bare pnpm); the packageManager field in
    # package.json pins the version corepack downloads on first use.
    "${DOCKER_RUN[@]}" node:22 sh -c '
        if [ ! -d node_modules ]; then corepack pnpm install; fi
        node_modules/.bin/tsx lib/prebuild.ts
        node_modules/.bin/astro build
    '
else
    echo "==> Reusing host dist/ output (run with --rebuild to build inside the container)"
    if [[ ! -d dist ]]; then
        echo "No dist/ found — building on the host first (pnpm install runs only if needed)" >&2
        if [[ ! -d node_modules ]]; then
            pnpm install
        fi
        node_modules/.bin/tsx lib/prebuild.ts
        node_modules/.bin/astro build
    fi
fi

echo "==> Serving dist/ on http://localhost:$PORT (Ctrl-C to stop)"
exec "${DOCKER_RUN[@]}" node:22 \
    node_modules/.bin/astro preview --host 0.0.0.0 --port 4321
