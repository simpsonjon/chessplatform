FROM simpsonjon/api:api

ENV NODE_ENV dev
RUN npm install

CMD ["npm", "test"]