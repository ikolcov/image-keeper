import http from 'http';
import WebSocket from 'ws';
import FormData from 'form-data';
import fetch from 'node-fetch';
import asyncBusboy from 'async-busboy';
import jwt from 'jsonwebtoken';
import config from './config';
import { BadRequestError, UnauthorizedError } from './helpers/custom-errors';
import { ws as wsDebug } from './helpers/debugging';

const resizersQueue = [];
let resolve;
let resizerPromise = new Promise(ok => (resolve = ok));

const server = http.createServer(async (req, res) => {
  try {
    res.setHeader('Access-Control-Allow-Origin', `http://${config.front_host}`);
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'authorization, content-type');
    if (req.method === 'OPTIONS') {
      res.writeHead(200);
      res.end();
      return;
    }
    if (req.method !== 'POST' || req.url !== '/' || !req.headers.authorization) {
      throw new BadRequestError();
    }
    if (!jwt.verify(req.headers.authorization.split(' ')[1], config.keys.jwt)) {
      throw new UnauthorizedError();
    }
    const { files, fields: { width, height, user } } = await asyncBusboy(req);
    const form = new FormData();
    files.forEach(file => {
      if (!file.mime.includes('image/')) throw new BadRequestError();
      form.append(file.fieldname, file);
    });
    form.append('width', width);
    form.append('height', height);
    form.append('user', user);
    if (!resizersQueue.length) await resizerPromise;
    const { filename } = await fetch(`http://${resizersQueue.shift()}/api/v1/resize`, {
      method: 'POST',
      body: form,
      headers: {
        resizerauthorizationkey: config.keys.resizer,
      },
    }).then(r => r.json());
    resizerPromise = new Promise(ok => (resolve = ok));
    res.statusCode = 200;
    res.end(JSON.stringify({ status: 'success', filename }));
  } catch (e) {
    if (e instanceof BadRequestError) {
      res.statusCode = 400;
    } else if (e instanceof UnauthorizedError) {
      res.statusCode = 401;
    } else {
      res.statusCode = 500;
    }
    res.end(JSON.stringify({ status: 'error', message: e.message }));
  }
});
export default server;

export const wss = new WebSocket.Server({ server });
wss.on('connection', ws => {
  ws.on('message', msg => {
    const message = JSON.parse(msg);
    if (message.status === 'available' || !resizersQueue.includes(message.host)) {
      resolve(message.host);
      resizersQueue.push(message.host);
    }
  });
  ws.on('error', err => wsDebug(err.message));
});
