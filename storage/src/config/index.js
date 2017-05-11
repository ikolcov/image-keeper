module.exports = require('rc')('storage', {
  port: '500',
  db_connection: 'mongodb://127.0.0.1/gridfs',
  jwt_secret: 'secret',
  front_host: 'localhost:2000',
});
