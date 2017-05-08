import rc from 'rc';

export default rc('lb', {
  port: '3000',
  jwtSecret: 'secret',
  resizerKey: 'key',
});
