FROM node:18-slim AS build
LABEL authors="ashesh"

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --loglevel verbose

COPY . ./
RUN npm run build
RUN npm install fastify-cli --global


CMD ["fastify", "start", "-l", "info" , "dist/server.js"]
