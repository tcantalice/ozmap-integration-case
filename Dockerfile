# Build
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

# Production
FROM node:20-alpine AS production

RUN addgroup -S appgroup \
    && adduser -S appuser -G appgroup

RUN npm install -g pm2

WORKDIR /app

COPY package.json yarn.lock ecosystem.config.js ./
COPY prisma /app/prisma

RUN yarn install --production

RUN yarn prisma generate

COPY --chown=appuser:appgroup --from=builder /app/dist /app/dist
RUN ls -la

RUN chown -R appuser:appgroup /app

USER appuser

CMD ["pm2-runtime", "ecosystem.config.js"]
