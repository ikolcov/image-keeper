// @flow

import app from './app';
import { User } from './db';
import bootstrap from './db/bootstrap';
import config from './config';
import { server as serverDebug, db as dbDebug } from './helpers/debugging';

function start(port: number | string) {
  app.listen(port, serverDebug(`Server is started on port ${port}`));
}

User.findAll().then(() => start(config.port)).catch(e => {
  if (e.name === 'SequelizeDatabaseError') {
    try {
      return bootstrap().then(() => start(config.port));
    } catch (error) {
      dbDebug(error);
    }
  }
  return dbDebug(e);
});
