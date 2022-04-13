# Install deps and build app
FROM node:17-alpine AS builder

ARG ENVIRONMENT
ENV ENVIRONMENT=${ENVIRONMENT}
ARG NPM_TOKEN_GITHUB


WORKDIR /app
COPY ./ ./
RUN npm ci 
RUN npm run build

FROM node:17-alpine AS runner

ARG ENVIRONMENT
ENV ENVIRONMENT=${ENVIRONMENT}

WORKDIR /app
COPY --from=builder /app .
COPY . .

EXPOSE 3000

ENV PORT 3000

CMD ["node", "build/"]
