FROM node:slim

WORKDIR /app/cors-server

COPY ./cors-server/package*.json /app/cors-server/

RUN npm install

COPY ./cors-server /app/cors-server/

EXPOSE 3001 5000

CMD ["npm", "run", "start"]