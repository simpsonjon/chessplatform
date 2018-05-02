FROM node:8.11.1-alpine

EXPOSE 3000

CMD ["node","index.js"]

ENV NODE_ENV production
WORKDIR /app/

COPY api/package.json package.json
RUN npm install

COPY api/ .