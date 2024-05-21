FROM node:latest

RUN mkdir -p /jwtClient

WORKDIR /jwtClient

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

RUN npm run build

