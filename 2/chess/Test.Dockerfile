FROM simpsonjon/chessplat:chess

ENV NODE_ENV dev
RUN npm install

CMD ["npm", "test"]