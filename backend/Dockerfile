FROM node:latest

RUN mkdir -p /jwtServer

WORKDIR /jwtServer

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

RUN npm install pm2 -g

RUN npm install -g bun

run pm2 status

CMD ["pm2-runtime", "start", "ecosystem.config.js"]



