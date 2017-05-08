import type { Context } from 'koa';
import { AuthenticationError, AccessDeniedError } from './custom-errors';

export default async (ctx: Context, next: () => Promise<any>): Promise<any> => {
  try {
    await next();
  } catch (e) {
    let message;
    if (
      e instanceof AuthenticationError ||
      e.name === 'SequelizeValidationError' ||
      e.name === 'TypeError'
    ) {
      ctx.status = 400;
      if (e.name === 'TypeError') {
        message = 'Bad request';
      }
    } else if (
      e.name === 'UnauthorizedError' ||
      e.name === 'JsonWebTokenError' ||
      e.name === 'TokenExpiredError'
    ) {
      ctx.status = 401;
      message = 'You are not authorized';
    } else if (e instanceof AccessDeniedError) {
      ctx.status = 403;
    } else if (e.name === 'SequelizeUniqueConstraintError') {
      ctx.status = 409;
      message = 'This name or email is already in use';
    } else {
      message = 'Internal server error';
    }
    ctx.body = { status: 'error', message: message || e.message };
  }
};
