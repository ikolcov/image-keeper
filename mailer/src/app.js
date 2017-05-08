// @flow
// eslint-disable-next-line import/no-extraneous-dependencies
import 'dotenv/config';
import Koa from 'koa';
import type App, { Middleware } from 'koa';
import body from 'koa-json-body';
import _ from 'koa-route';
import handleErrors from './helpers/handle-errors';
import { BadRequestError } from './helpers/custom-errors';
import api from './api';

const app: App = new Koa();

app.use((handleErrors: Middleware));
app.use((body({ limit: '500kb', fallback: true }): Middleware));
app.use((_.post('/api/v1/sendmail', api.handleSendMail): Middleware));
app.use(() => {
  throw new BadRequestError();
});

export default app;
