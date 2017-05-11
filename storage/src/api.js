// @flow

import type { Context } from 'koa';
import gfs from './gfs';
import { NotFoundError } from './helpers/custom-errors';

export async function handleReadImagesList(ctx: Context, user: string) {
  const list = await gfs.files.find({ metadata: { user } }).toArray();
  if (!list.length) {
    throw new NotFoundError('You have no any images');
  }
  ctx.status = 200;
  ctx.body = list;
}

export async function handleReadImage(ctx: Context, user: string, filename: string) {
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

export async function handleDeleteImage(ctx: Context, user: string, filename: string) {
  const options = { filename, metadata: { user } };
  const found = await gfs.exist(options);
  if (!found) {
    throw new NotFoundError('The image is not found');
  }
  await gfs.remove(options);
  ctx.status = 200;
  ctx.body = { status: 'success' };
}
