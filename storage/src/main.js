// @flow

import app from './app';
import config from './config';
import { server as serverDebug } from './helpers/debugging';

app.listen(config.port, serverDebug(`Server is started on port ${config.port}`));
