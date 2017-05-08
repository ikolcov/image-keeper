// @flow

module.exports = require('rc')('front', {
  port: 2000,
  lbHost: 'localhost:3000',
  ssoHost: 'localhost:1000',
  storageHost: 'localhost:500',
});
