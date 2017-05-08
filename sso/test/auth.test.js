import test from 'ava';
import sinon from 'sinon';
import supertest from 'supertest';
import './auth.test.env';
import app from '../src/app';
import bootstrap from '../src/db/bootstrap';
import * as userService from '../src/services/user';

const request = supertest(app.listen());

let userRefreshToken;

test.beforeEach(async () => {
  await bootstrap();
  await userService.createUser({
    user: 'user',
    password: 'user',
    email: 'user@user.user',
  });
  userRefreshToken = await userService.grantRefreshToken('user');
});

test.serial('POST /api/v1/auth/signup with correct credentials returns success', async t => {
  t.plan(1);
  await request
    .post('/api/v1/auth/signup')
    .send({ user: 'anotherUser', email: 'another@email.com', password: 'anotherUser' })
    .expect(201)
    .expect(res => {
      t.is(res.body.status, 'success');
    });
});

test.serial('POST /api/v1/auth/signup with duplicate user returns 409', async t => {
  t.plan(1);
  await request
    .post('/api/v1/auth/signup')
    .send({ user: 'user', email: 'another@email.com', password: 'anotherUser' })
    .expect(409)
    .expect(res => {
      t.is(res.body.status, 'error');
    });
});

test.serial('POST /api/v1/auth/signup with duplicate email returns 409', async t => {
  t.plan(1);
  await request
    .post('/api/v1/auth/signup')
    .send({ user: 'anotherUser', email: 'user@user.user', password: 'anotherUser' })
    .expect(409)
    .expect(res => {
      t.is(res.body.status, 'error');
    });
});

test.serial('POST /api/v1/auth/signup with incorrect email returns 400', async t => {
  t.plan(1);
  await request
    .post('/api/v1/auth/signup')
    .send({ user: 'anotherUser', email: 123456, password: 'anotherUser' })
    .expect(400)
    .expect(res => {
      t.is(res.body.status, 'error');
    });
});

test.serial(
  'POST /api/v1/auth/login with correct payload returns success, accessToken and refreshToken',
  async t => {
    t.plan(3);
    await request
      .post('/api/v1/auth/login')
      .send({ user: 'user', password: 'user' })
      .expect(200)
      .expect(res => {
        t.is(res.body.status, 'success');
        t.deepEqual(res.body.accessToken, res.body.accessToken.toString());
        t.deepEqual(res.body.refreshToken, res.body.refreshToken.toString());
      });
  },
);

test.serial('POST /api/v1/auth/login with wrong password returns 400', async t => {
  t.plan(1);
  await request
    .post('/api/v1/auth/login')
    .send({ user: 'user', password: 'blablabla' })
    .expect(400)
    .expect(res => {
      t.is(res.body.status, 'error');
    });
});

test.serial('POST /api/v1/auth/login with unknown user returns 400', async t => {
  t.plan(1);
  await request
    .post('/api/v1/auth/login')
    .send({ user: 'AfawDFSadfDSaFadsFsa', password: 'user' })
    .expect(400)
    .expect(res => {
      t.is(res.body.status, 'error');
    });
});

test.serial(
  'POST /api/v1/auth/login/refresh with correct refreshToken returns fresh pair of accessToken and refreshToken',
  async t => {
    t.plan(3);
    await request
      .post('/api/v1/auth/login/refresh')
      .send({ user: 'user', token: userRefreshToken })
      .expect(200)
      .expect(res => {
        t.is(res.body.status, 'success');
        t.deepEqual(res.body.accessToken, res.body.accessToken.toString());
        t.deepEqual(res.body.refreshToken, res.body.refreshToken.toString());
      });
  },
);

test.serial('POST /api/v1/auth/login/refresh with incorrect refreshToken returns 400', async t => {
  t.plan(1);
  await request
    .post('/api/v1/auth/login/refresh')
    .send({ user: 'user', token: 'BLABLABLA' })
    .expect(400)
    .expect(res => {
      t.is(res.body.status, 'error');
    });
});

test.serial(
  'POST /api/v1/auth/login/refresh with already used refreshToken returns 400',
  async t => {
    t.plan(1);
    await request
      .post('/api/v1/auth/login/refresh')
      .send({ user: 'user', token: userRefreshToken })
      .expect(200);
    await request
      .post('/api/v1/auth/login/refresh')
      .send({ user: 'user', token: userRefreshToken })
      .expect(400)
      .expect(res => {
        t.is(res.body.status, 'error');
      });
  },
);

test.serial('POST /api/v1/auth/login/refresh with expired refreshToken returns 400', async t => {
  t.plan(1);
  const clock = sinon.useFakeTimers(+new Date());
  clock.tick(15 * 24 * 60 * 60 * 1000);
  await request
    .post('/api/v1/auth/login/refresh')
    .send({ user: 'user', token: userRefreshToken })
    .expect(400)
    .expect(res => {
      t.is(res.body.status, 'error');
      clock.restore();
    });
});

test.serial(
  'POST /api/v1/auth/recover-password/:recoverToken with valid token+password returns success',
  async t => {
    t.plan(1);
    const token = userService.grantRecoveryToken('user');
    await request
      .post(`/api/v1/auth/recover-password/${token}`)
      .send({ password: 'myNewPassword' })
      .expect(200)
      .expect(res => t.is(res.body.status, 'success'));
  },
);

test.serial(
  'POST /api/v1/auth/recover-password/:recoverToken with invalid token returns 401',
  async t => {
    t.plan(1);
    await request
      .post('/api/v1/auth/recover-password/1234567890')
      .send({ password: 'myNewPassword' })
      .expect(401)
      .expect(res => {
        t.is(res.body.status, 'error');
      });
  },
);

test.serial('POST /api/v1/auth/recover-password/:token returns 401 if expired', async t => {
  t.plan(1);
  const token = userService.grantRecoveryToken('user');
  const clock = sinon.useFakeTimers(+new Date());
  clock.tick(16 * 60 * 1000);
  await request
    .post(`/api/v1/auth/recover-password/${token}`)
    .send({ password: 'myNewPassword' })
    .expect(401)
    .expect(res => {
      t.is(res.body.status, 'error');
      clock.restore();
    });
});

test.serial(
  'POST /api/v1/auth/recover-password/:recoverToken cant be called twice with the same token',
  async t => {
    t.plan(1);
    const token = userService.grantRecoveryToken('user');
    const clock = sinon.useFakeTimers(+new Date());
    clock.tick(30 * 1000);
    await request
      .post(`/api/v1/auth/recover-password/${token}`)
      .send({ password: 'myNewPassword' })
      .expect(200)
      .expect(() => clock.tick(30 * 1000));
    await request
      .post(`/api/v1/auth/recover-password/${token}`)
      .send({ password: 'myBrandNewPassword' })
      .expect(400)
      .expect(res => {
        t.is(res.body.status, 'error');
        clock.restore();
      });
  },
);

test.serial(
  'POST /api/v1/auth/recover-password/:recoverToken returns 400 if user not found',
  async t => {
    t.plan(1);
    const token = userService.grantRecoveryToken('user');
    await userService.deleteByUsername('user');
    await request
      .post(`/api/v1/auth/recover-password/${token}`)
      .send({ password: 'myNewPassword' })
      .expect(400)
      .expect(res => t.is(res.body.status, 'error'));
  },
);
