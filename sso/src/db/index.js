// @flow

import Sequelize from 'sequelize';
import config from '../config';
import { db as debug } from '../helpers/debugging';

const client = new Sequelize(config.db.connection, {
  logging: JSON.parse(config.db.logging) ? debug : false,
});

export const User = client.import('./models/user');
export const RefreshToken = client.import('./models/refreshtoken');

Object.keys(module.exports).forEach(m => module.exports[m].options.associate(module.exports));

export default client;
