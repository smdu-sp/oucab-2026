## Multi-stage build com Alpine — imagem compacta para servidor com espaço limitado
## Alpine (~5x menor que Debian slim), sem binários desnecessários

# ── Etapa 1: Dependências ────────────────────────────────────────────────────
FROM node:20-alpine AS deps
WORKDIR /app
RUN apk add --no-cache openssl libc6-compat
COPY package.json package-lock.json* ./
RUN npm ci

# ── Etapa 2: Build ───────────────────────────────────────────────────────────
FROM node:20-alpine AS builder
WORKDIR /app
RUN apk add --no-cache openssl libc6-compat
COPY --from=deps /app/node_modules ./node_modules
COPY prisma ./prisma
# Gera os Prisma Clients dentro do Alpine (garante binário musl correto)
RUN npx prisma generate && npx prisma generate --schema=prisma/aiusce/schema.prisma
COPY . .
ENV NODE_ENV=production
RUN npm run build

# ── Etapa 3: Runner (produção) ───────────────────────────────────────────────
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3080
ENV HOSTNAME=0.0.0.0
# Usa engine Node-API (evita incompatibilidade de OpenSSL em runtime)
ENV PRISMA_CLIENT_ENGINE_TYPE=library

RUN apk add --no-cache openssl ca-certificates

# Apenas o output standalone do Next.js (já inclui node_modules mínimos)
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/lib/generated ./lib/generated

# Uploads persistidos via volume externo
VOLUME ["/app/uploads"]

EXPOSE 3080
CMD ["node", "server.js"]
