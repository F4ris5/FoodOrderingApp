FROM node:slim

WORKDIR /food/cors-server

COPY ./cors-server/package*.json .

WORKDIR ../food-order-app

COPY ./food-order-app/package*.json .

WORKDIR ./cors-server

RUN npm install --verbose

WORKDIR ../food-order-app

RUN npm install

COPY ./cors-server/db.json ./cors-server/db.json

COPY ./cors-server/server.js ./cors-server/server.js

COPY ./food-order-app ./food-order-app

EXPOSE 5000 3000 3001

CMD ["npm", "run", "start"]