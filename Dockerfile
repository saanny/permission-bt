###################
# DEVELOPMENT
###################
FROM node:20-alpine AS development

WORKDIR /usr/src/app


RUN npm install -g pnpm @nestjs/cli

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true


COPY --chown=node:node package.json pnpm-lock.yaml ./


RUN pnpm install --frozen-lockfile


COPY --chown=node:node . .

USER node

###################
# BUILD FOR PRODUCTION
###################
FROM node:20-alpine AS build

WORKDIR /usr/src/app


RUN npm install -g pnpm @nestjs/cli

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV NODE_ENV=production


COPY --chown=node:node package.json pnpm-lock.yaml ./


RUN pnpm install --frozen-lockfile


COPY --chown=node:node . .


RUN pnpm run build


USER node

###################
# PRODUCTION
###################
FROM node:20-alpine AS production

WORKDIR /usr/src/app

ENV NODE_ENV=production


COPY --chown=node:node package.json pnpm-lock.yaml ./


RUN npm install -g pnpm && pnpm install --frozen-lockfile --prod


COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/src/database ./src/database


USER node


CMD [ "node", "--max-old-space-size=1536", "dist/main.js" ]
