FROM node:7-alpine

WORKDIR /srv/app

COPY package.json /srv/app
COPY yarn.lock /srv/app
RUN yarn install

COPY . /srv/app

ARG PORT=5000
ARG HOSTNAME=192.168.99.100
ARG KEY=key
ARG DB_URI=mongodb://192.168.99.100/gridfs
ARG LB_URI=ws://192.168.99.100:3000/
ARG DEBUG=app*,http*
ENV DEBUG $DEBUG
ENV resizer_port $PORT
ENV resizer_hostname $HOSTNAME
ENV resizer_key $KEY
ENV resizer_uris__db $DB_URI
ENV resizer_uris__lb $LB_URI
EXPOSE $PORT

CMD yarn start
