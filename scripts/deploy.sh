#!/usr/bin/env bash
set -euo pipefail
IFS=$'\n\t'

REPO_DIR="/home/cloudpanel/htdocs/uvo-amsterdam.dev"
APP_NAME="uvo-app"
BRANCH="main"

echo "=== Deploy started: $(date -u) ==="

# Ensure repo dir exists
if [ ! -d "$REPO_DIR" ]; then
  echo "Creating site directory: $REPO_DIR"
  mkdir -p "$REPO_DIR"
  chown -R $(whoami):$(whoami) "$REPO_DIR"
fi

cd "$REPO_DIR"

if [ ! -d ".git" ]; then
  echo "Cloning repository..."
  git clone --branch "$BRANCH" --depth=1 git@github.com:DennisB-AH/uvo-amsterdam.git .
fi

echo "=== Fetching latest code (branch: $BRANCH) ==="
# Ensure we are on the right branch and fetch latest
git fetch origin "$BRANCH" --depth=1 || true
git reset --hard "origin/$BRANCH"

echo "=== Installing dependencies (pnpm) ==="
pnpm install


echo "=== Building Next.js app ==="
# Ensure NODE_ENV=production while building
export NODE_ENV=production
pnpm run build

echo "=== Zero-downtime restart via PM2 using ecosystem.config.js ==="
# Try to start the app via ecosystem file, then reload if already running.
if command -v pm2 >/dev/null 2>&1; then
  pm2 start ecosystem.config.js --env production || pm2 reload ecosystem.config.js --env production
  pm2 save
else
  echo "pm2 not installed. Installing pm2 globally..."
  pnpm install -g pm2
  pm2 start ecosystem.config.js --env production
  pm2 save
fi

echo "=== Deploy finished: $(date -u) ==="