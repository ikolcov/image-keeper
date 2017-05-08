import WebSocket from 'ws';
import config from './config';
import { ws as debug } from './helpers/debugging';

let ws;
let intervalId;

export const sendAvailable = () => {
  ws.send(JSON.stringify({ host: config.myHost, status: 'available' }));
};

function start(websocketServerLocation) {
  ws = new WebSocket(websocketServerLocation);
  ws.on('close', () => {
    if (!intervalId) {
      intervalId = setInterval(() => {
        start(websocketServerLocation);
      }, 5000);
    }
  });

  ws.on('error', err => debug(err.message));

  ws.on('open', () => {
    if (intervalId) clearInterval(intervalId);
    sendAvailable();
  });
}

export default start;
