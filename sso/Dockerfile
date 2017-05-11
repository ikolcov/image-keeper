FROM node:7-alpine

WORKDIR /srv/app

COPY package.json /srv/app
COPY yarn.lock /srv/app
RUN yarn install

COPY . /srv/app

ARG PORT=1000
ARG DB_CONNECTION=mysql://user:user@192.168.99.100:3306/userdb
ARG DB_LOGGING=false
ARG JWT_KEY=secret
ARG MAILER_KEY=key
ARG MAILER_HOST=192.168.99.100:4000
ARG FRONT_HOST=192.168.99.100:2000
ARG DEBUG=app*,http*
ENV DEBUG $DEBUG
ENV sso_port $PORT
ENV sso_db__connection $DB_CONNECTION
ENV sso_db__logging $DB_LOGGING
ENV sso_keys__jwt $JWT_KEY
ENV sso_keys__mailer $MAILER_KEY
ENV sso_hosts__mailer $MAILER_HOST
ENV sso_hosts__front $FRONT_HOST
EXPOSE $PORT

CMD yarn start
