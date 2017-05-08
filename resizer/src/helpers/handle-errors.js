import type { Context } from 'koa';
import { BadRequestError } from './custom-errors';

export default async (ctx: Context, next: () => Promise<any>): Promise<any> => {
  try {
    await next();
  } catch (e) {
    if (e instanceof BadRequestError) {
      ctx.status = 400;
    } else {
      ctx.status = 500;
    }
    ctx.body = { status: 'error', message: e.message };
  }
};
