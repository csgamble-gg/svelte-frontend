# Install deps and build app
FROM node:14-alpine AS builder

ARG ENVIRONMENT
ENV ENVIRONMENT=${ENVIRONMENT}
ARG NPM_TOKEN_GITHUB

WORKDIR /app

COPY ./ ./

RUN npm ci 
RUN npm run build

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

CMD ["node", "build/"]
