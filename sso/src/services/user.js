// @flow
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import config from '../config';
import { User, RefreshToken } from '../db';

export const createUser = (payload: {| user: string, email: string, password: string |}) =>
  User.create(payload);

export const findBy = (params: { [param: string]: any }) => User.find({ where: params });

export const findByUsername = (user: string) => findBy({ user });

export const findByEmail = (email: string) => findBy({ email });

export const updateParams = (
  evidences: { [key: string]: any },
  params: {|
    user?: string,
    password?: string,
    email?: string,
  |},
) => User.update(params, { where: evidences });

export const updatePassword = (user: string, password: string) =>
  updateParams({ user }, { password });

export const deleteBy = (params: { [param: string]: any }) => User.destroy({ where: params });

export const deleteByUsername = (user: string) => deleteBy({ user });

export const createToken = () => crypto.randomBytes(128).toString('hex');

export const hashUserAndToken = (user: string, token: string) =>
  crypto.createHash('sha512').update(user + token).digest('hex');

export const grantRefreshToken = async (username: string) => {
  const token = createToken(username);
  const tokenHash = hashUserAndToken(username, token);
  const user = await findByUsername(username);
  await RefreshToken.create({
    token: tokenHash,
    exp: Date.now() + 14 * 24 * 60 * 60 * 1000,
    UserId: user.id,
  });
  return token;
};

export const checkRefreshToken = async (username: string, token: string) => {
  const user = await findByUsername(username);
  const tokenHash = hashUserAndToken(username, token);
  const found = await RefreshToken.find({
    where: {
      token: tokenHash,
      UserId: user.id,
      exp: { $gt: Date.now() },
      createdAt: { $gt: new Date(user.updatedAt) },
    },
  });
  return !!found;
};

export const destroyRefreshToken = async (username: string, token: string) => {
  const user = await findByUsername(username);
  const tokenHash = hashUserAndToken(username, token);
  return RefreshToken.destroy({
    where: {
      token: tokenHash,
      UserId: user.id,
    },
  });
};

export const grantRecoveryToken = (username: string) => {
  const payload = {
    sub: username,
  };
  return jwt.sign(payload, config.jwtSecret, { expiresIn: '15m' });
};

export const checkRecoveryToken = (token: string) => jwt.verify(token, config.jwtSecret);

export const grantAccessToken = (payload: {| sub: string, email: string |}) =>
  jwt.sign(payload, config.jwtSecret, { expiresIn: '15m' });
