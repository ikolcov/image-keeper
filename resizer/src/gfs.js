import mongoose from 'mongoose';
import Grid from 'gridfs-stream';
import config from './config';

mongoose.Promise = global.Promise;
Grid.mongo = mongoose.mongo;
const conn = mongoose.createConnection(config.uris.db);
export default Grid(conn.db);
