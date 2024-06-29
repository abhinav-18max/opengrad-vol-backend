FROM node:20

WORKDIR /usr/src/app

COPY package.json ./

COPY pnpm-lock.yaml ./

RUN npm install -g pnpm

RUN pnpm install

RUN pnpm add pg

COPY . .

RUN pnpm run build