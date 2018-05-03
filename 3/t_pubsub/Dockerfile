FROM node:8.11.1-alpine

EXPOSE 3000

CMD ["node","index.js"]
WORKDIR /app/
RUN npm install --save @google-cloud/pubsub 

ENV NODE_ENV development


COPY . .