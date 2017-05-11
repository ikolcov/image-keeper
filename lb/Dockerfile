FROM node:7-alpine

WORKDIR /srv/app

COPY package.json /srv/app
COPY yarn.lock /srv/app
RUN yarn install

COPY . /srv/app

ARG PORT=3000
ARG JWT_KEY=secret
ARG RESIZER_KEY=key
ARG FRONT_HOST=192.168.99.100:2000
ARG DEBUG=app*,http*
ENV DEBUG $DEBUG
ENV lb_port $PORT
ENV lb_keys__jwt $JWT_KEY
ENV lb_keys__resizer $RESIZER_KEY
ENV lb_front_host $FRONT_HOST
EXPOSE $PORT

CMD yarn start
