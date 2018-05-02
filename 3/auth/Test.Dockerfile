FROM simpsonjon/chessplat:auth as dev

ENV NODE_ENV dev
RUN npm install -g nodemon
RUN npm install

CMD ["npm", "start"]


FROM simpsonjon/chessplat:auth as test
COPY --from=dev /app/node_modules /app/node_modules
CMD ["npm", "test"]