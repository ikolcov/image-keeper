import rc from 'rc';

export default rc('lb', {
  port: '3000',
  keys: {
    jwt: 'secret',
    resizer: 'key',
  },
  front_host: 'localhost:2000',
});
