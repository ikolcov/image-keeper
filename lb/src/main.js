// @flow

import config from './config';
import app, { wss } from './app';
import { server as serverDebug, app as appDebug, ws as wsDebug } from './helpers/debugging';

app.on('error', err => appDebug(err.message));
wss.on('error', err => wsDebug(err.message));
app.listen(config.port, () => serverDebug(`Server is listening on port ${config.port}`));
