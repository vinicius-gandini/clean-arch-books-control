FROM node:14-alpine

WORKDIR /home/app

COPY . ./

RUN yarn install

EXPOSE 3000

CMD ["yarn", "start:dev"]
