FROM node:latest

RUN mkdir -p /jwtClient

WORKDIR /jwtClient

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

#RUN npm run build

RUN npm install pm2 -g

RUN npm install -g bun

run pm2 status

CMD ["/bin/sh", "-c", "pm2-runtime 'npm start'"]