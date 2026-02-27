FROM node:20-alpine AS base

WORKDIR /app

# 安装依赖
FROM base AS deps
COPY package*.json ./
RUN npm ci --only=production

# 构建
FROM base AS builder
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# 生产镜像
FROM base AS runner
ENV NODE_ENV production

COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000

CMD ["node", "dist/server.js"]
