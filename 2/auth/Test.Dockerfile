FROM simpsonjon/chessplat:auth

ENV NODE_ENV dev
RUN npm install

CMD ["npm", "test"]