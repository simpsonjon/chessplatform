FROM node:8.11.1-alpine

EXPOSE 3000

CMD ["node","index.js"]

ENV NODE_ENV production
WORKDIR /app/

COPY auth/package.json package.json
RUN npm install

ADD auth/ .