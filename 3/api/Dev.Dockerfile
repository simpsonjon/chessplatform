FROM simpsonjon/chessplat:api

ENV NODE_ENV dev
RUN npm install -g nodemon
RUN npm install
RUN mkdir -p /api/node_modules && cp -a /app/node_modules/. /api/node_modules/
CMD ["npm", "start"]