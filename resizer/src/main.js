import app from './app';
import config from './config';
import webSocketStart from './ws';
import { server as debug } from './helpers/debugging';

app.listen(config.port, () => debug(`Server is listening on port ${config.port}`));
webSocketStart(config.lbSocketUri);
