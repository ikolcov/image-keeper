import type { Context } from 'koa';
import { BadRequestError, AccessDeniedError } from './custom-errors';
import { app as debug } from './debugging';

export default async (ctx: Context, next: () => Promise<any>): Promise<any> => {
  try {
    await next();
  } catch (e) {
    let message;
    if (e instanceof BadRequestError || e.name === 'TypeError') {
      ctx.status = 400;
      message = 'Bad request';
    } else if (e instanceof AccessDeniedError) {
      ctx.status = 403;
    } else {
      ctx.status = 500;
      message = 'Internal server error';
    }
    // debug(e);
    ctx.body = { status: 'error', message: message || e.message };
  }
};
