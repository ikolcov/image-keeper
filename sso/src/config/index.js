import rc from 'rc';

// everything comes as a string, even if it's number or boolean value
export default rc('sso', {
  jwtSecret: 'secret',
  port: '1000',
  dbConnection: 'sqlite://dev.sqlite/',
  sqlLogging: 'false',
  mailerHost: 'localhost:4000',
  mailerKey: 'key',
  frontHost: 'localhost:2000',
});
