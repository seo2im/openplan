FROM node:24-alpine

RUN apk update
RUN apk add --no-cache libc6-compat

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable && \
    corepack prepare pnpm@latest-10 --activate
RUN pnpm add -g turbo
COPY app /usr/app
WORKDIR /usr/app
RUN pnpm install --force

EXPOSE 3000 6006
CMD ["turbo", "run", "dev"]
