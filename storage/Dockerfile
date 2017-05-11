FROM node:7-alpine

WORKDIR /srv/app

COPY package.json /srv/app
COPY yarn.lock /srv/app
RUN yarn install

COPY . /srv/app

ARG PORT=500
ARG DB_CONNECTION=mongodb://192.168.99.100/gridfs
ARG JWT_SECRET=secret
ARG FRONT_HOST=192.168.99.100:2000
ARG DEBUG=app*,http*
ENV DEBUG $DEBUG
ENV storage_port $PORT
ENV storage_db_connection $DB_CONNECTION
ENV storage_jwt_secret $JWT_SECRET
ENV storage_front_host $FRONT_HOST
EXPOSE $PORT

CMD yarn start
