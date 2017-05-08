import test from 'ava';
import supertest from 'supertest';
import './mail.test.env';
import app from '../src/app';
import config from '../src/config';

const request = supertest(app.listen());
const ROOT_URL = '/api/v1/sendmail';

test('POST /api/v1/sendmail with correct "to", "html", and authKey returns success', async t => {
  t.plan(1);
  await request
    .post(ROOT_URL)
    .set('SendMailAuthorizationKey', config.authKey)
    .send({ to: config.transport.auth.user, html: '<b>Hello world!<b>' })
    .expect(200)
    .expect(res => {
      t.is(res.body.status, 'success');
    });
});

test('POST /sendmail with incorrect authKey returns 403', async t => {
  t.plan(1);
  await request
    .post(ROOT_URL)
    .set('SendMailAuthorizationKey', 'lalalal')
    .send({ to: config.transport.auth.user, html: '<b>Hello world!<b>' })
    .expect(403)
    .expect(res => {
      t.is(res.body.status, 'error');
    });
});

test('POST /sendmail with incorrect email as "to", returns 400', async t => {
  t.plan(1);
  await request
    .post(ROOT_URL)
    .set('SendMailAuthorizationKey', config.authKey)
    .send({ to: 'notCorrectEmail', html: '<b>Hello world!<b>' })
    .expect(400)
    .expect(res => {
      t.is(res.body.status, 'error');
    });
});

test('POST /sendmail with not strings as "to" and "html", returns 400', async t => {
  t.plan(5);
  await request
    .post(ROOT_URL)
    .set('SendMailAuthorizationKey', config.authKey)
    .send({ to: true, html: 123456 })
    .expect(400)
    .expect(res => {
      t.is(res.body.status, 'error');
    });
  await request
    .post(ROOT_URL)
    .set('SendMailAuthorizationKey', config.authKey)
    .send({ to: [], html: false })
    .expect(400)
    .expect(res => {
      t.is(res.body.status, 'error');
    });
  await request
    .post(ROOT_URL)
    .set('SendMailAuthorizationKey', config.authKey)
    .send({ to: { hello: 123 }, html: [123456, '568'] })
    .expect(400)
    .expect(res => {
      t.is(res.body.status, 'error');
    });
  await request
    .post(ROOT_URL)
    .set('SendMailAuthorizationKey', config.authKey)
    .send({ to: new Date(), html: '' })
    .expect(400)
    .expect(res => {
      t.is(res.body.status, 'error');
    });
  await request
    .post(ROOT_URL)
    .set('SendMailAuthorizationKey', config.authKey)
    .send({ to: new WeakMap(), html: new Map() })
    .expect(400)
    .expect(res => {
      t.is(res.body.status, 'error');
    });
});

test('POST to any other route returns 400', async t => {
  t.plan(1);
  await request.post('/blablabla').expect(400).expect(res => t.is(res.body.status, 'error'));
});

test('GET, PUT, PATCH and DELETE return 400', async t => {
  t.plan(4);
  await request.get('/somegetroute').expect(400).expect(res => t.is(res.body.status, 'error'));
  await request.put('/someputroute').expect(400).expect(res => t.is(res.body.status, 'error'));
  await request.patch('/somepatchroute').expect(400).expect(res => t.is(res.body.status, 'error'));
  await request.delete('/somedeleroute').expect(400).expect(res => t.is(res.body.status, 'error'));
});
