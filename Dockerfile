# Install deps and build app
FROM node:alpine AS builder

ARG ENVIRONMENT
ENV ENVIRONMENT=${ENVIRONMENT}

WORKDIR /app
COPY . .
RUN yarn install && yarn build

# Production image, copy all the files and run next
FROM node:alpine AS runner
WORKDIR /app

ARG ENVIRONMENT
ENV ENVIRONMENT=${ENVIRONMENT}

RUN addgroup -g 1001 -S nodejs
RUN adduser -S svelte -u 1001

COPY --from=builder /app .
COPY . .

USER svelte

EXPOSE 3000

ENV PORT 3000

CMD ["ls"]

CMD ["node", "build/"]
