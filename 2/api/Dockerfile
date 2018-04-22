FROM node:8.11.1-alpine

EXPOSE 3000

CMD ["node","index.js"]

COPY api/package.json package.json
RUN npm install

ENV NODE_ENV production

COPY api/ .