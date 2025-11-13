# syntax=docker/dockerfile:1.6

FROM node:20-alpine AS builder
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

FROM node:20-alpine
WORKDIR /app

ENV NODE_ENV=production \
    PORT=8081

COPY --from=builder /app /app

EXPOSE 8081

CMD ["node", "index.js"]
