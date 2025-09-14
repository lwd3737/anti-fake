FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json yarn.lock ./
# COPY prisma ./prisma
# COPY scripts/init.js ./scripts/init.js
RUN yarn install --frozen-lockfile --ignore-scripts

FROM node:22-alpine AS builder
# Install Python3 for yt-dlp
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN yarn prisma generate
RUN apk add --no-cache python3 py3-pip
RUN node scripts/init.js
RUN yarn build

FROM node:22-alpine AS runner
# Install Python3 for yt-dlp
WORKDIR /app
ENV NODE_ENV=production
RUN apk add --no-cache python3 py3-pip
COPY package.json yarn.lock ./
# COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/bin ./bin
COPY --from=builder /app/prisma ./prisma
RUN yarn install --frozen-lockfile --production --ignore-scripts&& yarn cache clean
# COPY --from=builder /app/src/generated ./src/generated
# COPY --from=builder /app/next.config.js ./
# COPY --from=builder /app/tsconfig.json ./

EXPOSE 3000
CMD ["yarn", "start"]