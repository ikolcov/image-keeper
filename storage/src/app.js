// @flow

import Koa from 'koa';
import mongoose from 'mongoose';
import Grid from 'gridfs-stream';
import _ from 'koa-route';
import cors from 'koa2-cors';
import jwt from 'koa-jwt';
import type App, { Middleware, Context } from 'koa';
import handleErrors from './helpers/handle-errors';
import { NotFoundError } from './helpers/custom-errors';
import config from './config';

const app: App = new Koa();

mongoose.Promise = global.Promise;
Grid.mongo = mongoose.mongo;
const conn = mongoose.createConnection(config.dbConnection);
const gfs = Grid(conn.db);

function corsOrigin(ctx: Context) {
  const allowedOrigins = [
    'http://localhost:2000',
    'http://localhost:3000',
    'http://localhost:9000',
  ];
  if (allowedOrigins.includes(ctx.headers.origin)) return ctx.headers.origin;
  return '';
}

async function handleReadImagesList(ctx: Context, user: string) {
  const list = await gfs.files.find({ metadata: { user } }).toArray();
  if (!list.length) {
    throw new NotFoundError('You have no any images');
  }
  ctx.status = 200;
  ctx.body = list;
}
async function handleReadImage(ctx: Context, user: string, filename: string) {
  const ext = filename.slice(filename.lastIndexOf('.'));
  const options = { filename, metadata: { user } };
  const found = await gfs.exist(options);
  if (!found) {
    throw new NotFoundError('The image is not found');
  }
  ctx.status = 200;
  ctx.type = ext;
  ctx.body = gfs.createReadStream(options);
}
async function handleDeleteImage(ctx: Context, user: string, filename: string) {
  const options = { filename, metadata: { user } };
  const found = await gfs.exist(options);
  if (!found) {
    throw new NotFoundError('The image is not found');
  }
  await gfs.remove(options);
  ctx.status = 200;
  ctx.body = { status: 'success' };
}

app.use((handleErrors: Middleware));
app.use((cors({ origin: corsOrigin, allowedMethods: ['GET', 'DELETE'] }): Middleware));
app.use((_.get('/api/v1/storage/:user/:filename', handleReadImage): Middleware));

// Middleware below this line is only reached if JWT token is valid
app.use(jwt({ secret: config.jwtSecret }));

// Protected middleware
app.use((_.get('/api/v1/storage/:user', handleReadImagesList): Middleware));
app.use((_.del('/api/v1/storage/:user/:filename', handleDeleteImage): Middleware));

export default app;
