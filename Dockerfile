# Install deps and build app
FROM node:17-alpine AS builder

ARG ENVIRONMENT
ENV ENVIRONMENT=${ENVIRONMENT}
ARG NPM_TOKEN_GITHUB


COPY ./ ./
RUN npm ci 
RUN npm run build

FROM node:alpine AS runner

ARG ENVIRONMENT
ENV ENVIRONMENT=${ENVIRONMENT}

RUN addgroup -g 1001 -S nodejs
RUN adduser -S svelte -u 1001

COPY --from=builder . .

USER svelte

EXPOSE 3000

ENV PORT 3000

CMD ["node", "build/"]
