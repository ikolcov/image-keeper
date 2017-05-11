// @flow

import Koa from 'koa';
import _ from 'koa-route';
import cors from 'koa2-cors';
import jwt from 'koa-jwt';
import type App, { Middleware, Context } from 'koa';
import handleErrors from './helpers/handle-errors';
import * as api from './api';
import config from './config';

const app: App = new Koa();

function corsOrigin(ctx: Context) {
  const allowedOrigins = [`http://${config.front_host}`];
  if (allowedOrigins.includes(ctx.headers.origin)) return ctx.headers.origin;
  return '';
}

app.use((handleErrors: Middleware));
app.use((cors({ origin: corsOrigin, allowedMethods: ['GET', 'DELETE'] }): Middleware));
app.use((_.get('/api/v1/storage/:user/:filename', api.handleReadImage): Middleware));

// Middleware below this line is only reached if JWT token is valid
app.use(jwt({ secret: config.jwt_secret }));

// Protected middleware
app.use((_.get('/api/v1/storage/:user', api.handleReadImagesList): Middleware));
app.use((_.del('/api/v1/storage/:user/:filename', api.handleDeleteImage): Middleware));

export default app;
