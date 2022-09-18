FROM node:14

WORKDIR /zen-api
COPY package.json .
RUN npm install
COPY . .
CMD npm start
