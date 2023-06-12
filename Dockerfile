FROM node:lts-alpine as build

WORKDIR /usr/src/app

COPY package*.json ./
COPY prisma ./prisma

RUN npm install

COPY . .

RUN npx prisma generate

RUN npm run build

FROM node:lts-alpine

WORKDIR /usr/src/app

COPY --chown=node:node --from=build /usr/src/app/dist ./dist
COPY --chown=node:node --from=build /usr/src/app/.env ./
COPY --chown=node:node --from=build /usr/src/app/package*.json ./
COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/prisma ./prisma

ENV NODE_ENV production
ENV DATABASE_URL mysql://root:kdys@host.docker.internal:3306/signature_plus_dev?connect_timeout=300

EXPOSE 5000
CMD ["npm", "run", "start:migrate:prod"]
