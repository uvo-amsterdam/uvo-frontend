#!/usr/bin/env bash
set -euo pipefail
IFS=$'\n\t'

REPO_DIR="/home/uvo-amsterdam/htdocs/www.uvo-amsterdam.dev"
APP_NAME="uvo-app"
BRANCH="main"

# Absolute path to ecosystem file
ECOSYSTEM="$REPO_DIR/ecosystem.config.js"

echo "=== Deploy started: $(date -u) ==="

# Ensure repo dir exists
if [ ! -d "$REPO_DIR" ]; then
  echo "Creating site directory: $REPO_DIR"
  mkdir -p "$REPO_DIR"
  chown -R $(whoami):$(whoami) "$REPO_DIR"
fi

cd "$REPO_DIR"

# Git clone or pull
if [ -d ".git" ]; then
    echo "Repository exists, updating..."
    git fetch origin "$BRANCH" --depth=1 || true
    git reset --hard "origin/$BRANCH"
else
    echo "Cloning repository..."
    git clone --branch "$BRANCH" --depth=1 git@github.com:DennisB-AH/uvo-amsterdam.git .
fi

# Install dependencies
echo "=== Installing dependencies (pnpm ci) ==="
if [ -f pnpm-lock.yaml ]; then
  pnpm install --frozen-lockfile
else
  pnpm install
fi

# Build Next.js
echo "=== Building Next.js app ==="
export NODE_ENV=production
pnpm build

# PM2 zero-downtime reload
echo "=== Zero-downtime restart via PM2 using $ECOSYSTEM ==="
export PM2_HOME="$REPO_DIR/.pm2"
mkdir -p "$PM2_HOME"

pm2 start "$ECOSYSTEM" --env production || pm2 reload "$ECOSYSTEM" --env production
pm2 save

echo "=== Deploy finished: $(date -u) ==="