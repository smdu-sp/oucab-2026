#!/bin/bash
# Script de deploy para servidor CentOS com Docker
# Uso:
#   bash deploy.sh             — build + start (sem migrations)
#   bash deploy.sh --migrate   — build + migrations + start

set -e

IMAGE="oucab:prod"

echo "==> Construindo imagem Docker..."
docker build -t "$IMAGE" .

if [[ "$1" == "--migrate" ]]; then
  echo "==> Rodando migrations (usa o stage de build que tem o CLI do Prisma)..."
  # O builder tem o node_modules completo (incluindo prisma CLI e engines)
  docker build --target builder -t oucab:builder .
  docker run --rm \
    --env-file .env \
    --add-host host.docker.internal:host-gateway \
    oucab:builder \
    npx prisma migrate deploy
  docker rmi oucab:builder 2>/dev/null || true
fi

echo "==> (Re)iniciando container..."
docker compose down --remove-orphans
docker compose up -d

echo "==> Pronto!"
docker compose ps
