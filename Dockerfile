FROM node:16-alpine

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

ENV GNEWS_BASE_URL https://gnews.io/api/v4/search

WORKDIR /home/node/app

COPY package*.json ./

USER root

COPY --chown=node:node . .

RUN npm install
RUN npm run build:production
COPY . .
RUN npm run test
RUN npm run lint

EXPOSE 5000
CMD [ "node", "index.js" ]
