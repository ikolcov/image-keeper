import rc from 'rc';

export default rc('resizer', {
  port: '5000',
  dbConnection: 'mongodb://127.0.0.1/gridfs',
  lbSocketUri: 'ws://localhost:3000/',
  myHost: 'localhost:5000',
  authKey: 'key',
});
