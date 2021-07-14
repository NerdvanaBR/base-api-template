FROM node:lts-alpine

RUN mkdir -p /opt/api/node_modules && chown -R node:node /opt/api

WORKDIR /opt/api

COPY package.json yarn.* ./

USER node

RUN npm i --save

COPY --chown=node:node . .

EXPOSE 3333

CMD ["npm", "start"]
