const Koa = require('koa');
const serve = require('koa-static');
const send = require('koa-send');

const app = new Koa();
app.use(serve('./build'));
app.use(ctx => send(ctx, './build/index.html'));

module.exports = app;
