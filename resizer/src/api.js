// @flow

import type { Context } from 'koa';
import asyncBusboy from 'async-busboy';
import Jimp from 'jimp';
import path from 'path';
import fs from 'fs';
import gfs from './gfs';
import streamFinish from './helpers/stream-finish';
import config from './config';
import { BadRequestError, AccessDeniedError } from './helpers/custom-errors';
import { sendAvailable } from './ws';

export async function handleResize(ctx: Context) {
  if (!ctx.headers.resizerauthorizationkey || ctx.headers.resizerauthorizationkey !== config.key) {
    throw new AccessDeniedError();
  }
  const { files, fields: { width, height, user } } = await asyncBusboy(ctx.req);
  if (!files.length || !width || !height || !user) {
    throw new BadRequestError();
  }
  await Promise.all(
    files.map(async file => {
      if (!file.mime.includes('image/')) throw new BadRequestError();
      const fileloc = path.join(__dirname, `../uploads/${file.filename}`);
      await streamFinish(file.pipe(fs.createWriteStream(fileloc)));
      const read = await Jimp.read(fileloc);
      const newFilename = `rs${file.filename}`;
      const newFileloc = path.join(__dirname, `../uploads/${newFilename}`);
      read.resize(+width, +height).write(newFileloc);
      const options = {
        filename: newFilename,
        mode: 'w',
        content_type: file.mime,
        metadata: { user },
      };
      await streamFinish(fs.createReadStream(newFileloc).pipe(gfs.createWriteStream(options)));
      fs.unlinkSync(fileloc);
      fs.unlinkSync(newFileloc);
    }),
  );
  sendAvailable();
  ctx.status = 200;
  ctx.body = { status: 'success' };
}

export default { handleResize };
