FROM node:8.11.1-alpine

EXPOSE 3000

ENV NODE_ENV production
ADD auth/package.json package.json
RUN npm install

ADD auth/ .

CMD ["node","index.js"]