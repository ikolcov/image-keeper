// @flow
import type { Context } from 'koa';
import bcrypt from 'bcryptjs';
import axios from 'axios';
import config from './config';
import * as userService from './services/user';
import { AuthenticationError } from './helpers/custom-errors';

export async function handleSignup(
  ctx: Context & { request: { body: {| user: string, email: string, password: string |} } },
) {
  const payload = ctx.request.body;
  await userService.createUser(payload);
  ctx.status = 201;
  ctx.body = {
    status: 'success',
    message: 'You have successfully registered and can now log in',
  };
}

export async function handleLogin(
  ctx: Context & { request: { body: {| user: string, password: string |} } },
) {
  const credentials = ctx.request.body;
  const found = await userService.findByUsername(credentials.user);
  if (!found) {
    throw new AuthenticationError();
  }
  const authSuccess = bcrypt.compareSync(credentials.password, found.password);
  if (!authSuccess) {
    throw new AuthenticationError();
  }
  const { user, email } = found;
  const payload = {
    sub: user,
    email,
  };
  const accessToken = userService.grantAccessToken(payload);
  const refreshToken = await userService.grantRefreshToken(user);
  ctx.status = 200;
  ctx.body = {
    status: 'success',
    accessToken,
    refreshToken,
    profile: { user, email },
  };
}

export async function handleRefresh(
  ctx: Context & { request: { body: {| user: string, token: string |} } },
) {
  const { user, token } = ctx.request.body;
  const validToken = await userService.checkRefreshToken(user, token);
  if (!validToken) {
    throw new AuthenticationError('You are not authenticated');
  }
  await userService.destroyRefreshToken(user, token);
  const refreshToken = await userService.grantRefreshToken(user);
  const { email } = await userService.findByUsername(user);
  const payload = {
    sub: user,
    email,
  };
  const accessToken = userService.grantAccessToken(payload);
  ctx.status = 200;
  ctx.body = {
    status: 'success',
    accessToken,
    refreshToken,
    profile: {
      user,
      email,
    },
  };
}

export async function handleRecovery(ctx: Context & { request: { body: {| email: string |} } }) {
  const { email } = ctx.request.body;
  const res = await userService.findByEmail(email);
  if (res) {
    const token = userService.grantRecoveryToken(res.user);
    await axios.post(
      `http://${config.mailerHost}/api/v1/sendmail`,
      {
        to: email,
        html: `<p>The link to recover your password is:
       http://${config.frontHost}/recover-password/${token}</p>`,
      },
      {
        headers: {
          sendmailauthorizationkey: config.mailerKey,
        },
      },
    );
  }
  ctx.status = 200;
  ctx.body = {
    status: 'success',
    message: 'If this e-mail exists, the link to recover password is sent.',
  };
}

export async function processRecovery(
  ctx: Context & { request: { body: {| password: string |} } },
  recoverToken: string,
) {
  const { password } = ctx.request.body;
  const payload = userService.checkRecoveryToken(recoverToken);
  const user = await userService.findByUsername(payload.sub);
  if (!user) {
    throw new AuthenticationError();
  }
  const lastUpdatedTime = Math.floor(+new Date(user.updatedAt) / 1000);
  if (lastUpdatedTime > payload.iat) {
    throw new AuthenticationError('The password has already been reset');
  }
  await userService.updatePassword(payload.sub, password);
  ctx.status = 200;
  ctx.body = { status: 'success' };
}
