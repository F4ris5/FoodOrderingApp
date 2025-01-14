FROM node:slim

WORKDIR /app/food-order-app

COPY ./food-order-app/package*.json /app/food-order-app/

RUN npm install

COPY ./food-order-app /app/food-order-app/

EXPOSE 3000

CMD ["npm", "run", "start"]