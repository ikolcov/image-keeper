module.exports = require('rc')('storage', {
  port: '500',
  dbConnection: 'mongodb://127.0.0.1/gridfs',
  jwtSecret: 'secret',
});
