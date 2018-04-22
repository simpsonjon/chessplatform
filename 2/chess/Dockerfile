FROM node:8.11.1-alpine

EXPOSE 3000

ENV NODE_ENV production
ADD chess/package.json package.json
RUN npm install

ADD chess/ .

CMD ["node","index.js"]