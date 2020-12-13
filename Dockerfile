FROM node:lts-alpine AS BUILD_IMAGE

WORKDIR /usr/src/app

COPY package.json ./

RUN yarn

COPY . .

RUN yarn build

FROM node:lts-alpine

WORKDIR /usr/src/app

COPY --from=BUILD_IMAGE /usr/src/app/dist ./dist
COPY --from=BUILD_IMAGE /usr/src/app/node_modules ./node_modules
COPY --from=BUILD_IMAGE /usr/src/app/.env ./.env

EXPOSE 3333


CMD ["node", "./dist/server.js"]

