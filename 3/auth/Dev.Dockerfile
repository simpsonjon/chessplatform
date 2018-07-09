FROM simpsonjon/chessplat:auth

ENV NODE_ENV dev
RUN npm install -g nodemon
RUN npm install
RUN mkdir -p /auth/node_modules && cp -a /app/node_modules/. /auth/node_modules/
CMD ["npm", "start"]