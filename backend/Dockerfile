FROM node:latest

RUN mkdir -p /wripetServer

WORKDIR /wripetServer

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5001

RUN npm install pm2 -g

run pm2 status

CMD ["pm2-runtime", "start", "index.ts" ,"--name", "SecWripetServer", "--watch","--env","prod"]



