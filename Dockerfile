# syntax=docker/dockerfile:1.6

FROM node:20-slim AS builder
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Generate Prisma client before pruning dev dependencies
COPY prisma ./prisma
RUN npx prisma generate

# Copy application source
COPY . .

# Remove development dependencies for runtime image
RUN npm prune --omit=dev

FROM node:20-slim
WORKDIR /app

ENV NODE_ENV=production \
    PORT=8081

COPY --from=builder /app /app

# Ensure uploads directory exists (bind as volume in docker-compose)
RUN mkdir -p /app/uploads/covers /app/uploads/merch /app/uploads/audio /app/uploads/track-covers \
    && chown -R node:node /app/uploads

VOLUME ["/app/uploads"]

EXPOSE 8081

CMD ["node", "index.js"]
