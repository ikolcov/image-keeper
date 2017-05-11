import rc from 'rc';

// everything comes as a string, even if it's number or boolean value
export default rc('sso', {
  port: '1000',
  db: {
    connection: 'sqlite://dev.sqlite/',
    logging: 'false',
  },
  keys: {
    jwt: 'secret',
    mailer: 'key',
  },
  hosts: {
    mailer: 'localhost:4000',
    front: 'localhost:2000',
    swagger: 'localhost:9000',
  },
});
