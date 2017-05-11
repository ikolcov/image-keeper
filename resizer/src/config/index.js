import rc from 'rc';

export default rc('resizer', {
  port: '5000',
  hostname: 'localhost',
  key: 'key',
  uris: {
    db: 'mongodb://127.0.0.1/gridfs',
    lb: 'ws://localhost:3000/',
  },
});
