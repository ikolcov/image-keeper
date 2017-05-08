// @flow
import Koa from 'koa';
import type App, { Middleware } from 'koa';
import _ from 'koa-route';
import * as api from './api';
import handleErrors from './helpers/handle-errors';
import { BadRequestError } from './helpers/custom-errors';

const app: App = new Koa();

app.use((handleErrors: Middleware));
app.use((_.post('/api/v1/resize', api.handleResize): Middleware));
app.use(() => {
  throw new BadRequestError();
});

export default app;
