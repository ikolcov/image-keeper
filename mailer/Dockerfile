FROM node:7-alpine

WORKDIR /srv/app

COPY package.json /srv/app
COPY yarn.lock /srv/app
RUN yarn install

COPY . /srv/app

ARG PORT=4000
ARG KEY=key
ARG DEBUG=app*,http*
ARG AUTH_USER
ARG AUTH_PASS
ENV DEBUG $DEBUG
ENV mailer_port $PORT
ENV mailer_key $KEY
ENV mailer_transport__auth__user $AUTH_USER
ENV mailer_transport__auth__pass $AUTH_PASS
EXPOSE $PORT

CMD yarn start
