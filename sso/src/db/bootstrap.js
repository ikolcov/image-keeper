import client from './index';
import { db as debug } from '../helpers/debugging';

export default async function() {
  try {
    await client.sync({ force: true });
  } catch (error) {
    debug(error);
  }
}
