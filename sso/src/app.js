// @flow
import Koa from 'koa';
import type App, { Middleware, Context } from 'koa';
import body from 'koa-json-body';
import cors from 'koa2-cors';
import _ from 'koa-route';
import handleErrors from './helpers/handle-errors';
import config from './config';
import * as api from './api';

const app: App = new Koa();

app.use((body({ limit: '10kb', fallback: true }): Middleware));

function corsOrigin(ctx: Context) {
  const allowedOrigins = [`http://${config.hosts.front}`, `http://${config.hosts.swagger}`];
  if (allowedOrigins.includes(ctx.headers.origin)) return ctx.headers.origin;
  return '';
}

app.use((handleErrors: Middleware));
app.use((cors({ origin: corsOrigin, allowedMethods: ['POST'] }): Middleware));
app.use((_.post('/api/v1/auth/signup', api.handleSignup): Middleware));
app.use((_.post('/api/v1/auth/login', api.handleLogin): Middleware));
app.use((_.post('/api/v1/auth/login/refresh', api.handleRefresh): Middleware));
app.use((_.post('/api/v1/auth/recover-password', api.handleRecovery): Middleware));
app.use((_.post('/api/v1/auth/recover-password/:recoverToken', api.processRecovery): Middleware));

export default app;
