FROM node:8.11.1-alpine

WORKDIR /usr/src/app

CMD ["npm","test"]

ENV NODE_ENV dev

COPY ./package.json package.json
RUN npm install

COPY * ./