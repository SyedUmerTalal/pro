FROM node:lts-alpine as build

WORKDIR /usr/src/app

COPY package*.json ./
COPY prisma ./prisma

RUN npm install

COPY . .

RUN npx prisma generate

RUN npm run build

ENV NODE_ENV production
ENV DATABASE_URL mysql://root:kdys@host.docker.internal:3306/signature_plus_dev?connect_timeout=300

EXPOSE 5000
CMD ["npm", "run", "start:migrate:prod"]
