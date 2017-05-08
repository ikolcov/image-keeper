// @flow
import type { Context } from 'koa';
import nodemailer from 'nodemailer';
import { BadRequestError, AccessDeniedError } from './helpers/custom-errors';
import config from './config';

async function handleSendMail(ctx: Context): Promise<any> {
  if (ctx.headers.sendmailauthorizationkey !== config.authKey) {
    throw new AccessDeniedError();
  }
  const { to, html }: { to: string, html: string } = ctx.request.body;
  try {
    await nodemailer.createTransport(config.transport).sendMail({ ...config.options, to, html });
  } catch (error) {
    throw new BadRequestError(error.message);
  }
  ctx.status = 200;
  ctx.body = {
    status: 'success',
  };
}

export default { handleSendMail };
