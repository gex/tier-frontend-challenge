FROM node:16.6-alpine

USER node
RUN mkdir /home/node/app
WORKDIR /home/node/app

COPY --chown=node:node package.json yarn.lock ./
RUN yarn install
COPY --chown=node:node . ./

CMD ["yarn", "start"]
