FROM simpsonjon/chessplat:chess

ENV NODE_ENV dev
RUN npm install -g nodemon
RUN npm install
RUN mkdir -p /chess/node_modules && cp -a /app/node_modules/. /chess/node_modules/
CMD ["npm", "start"]