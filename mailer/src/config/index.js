import rc from 'rc';

export default rc('mailer', {
  port: '4000',
  key: 'key',
  transport: {
    service: 'gmail',
    auth: {
      user: 'stub@gmail.com',
      pass: 'stub',
    },
  },
  options: {
    from: '"Image Keeper" <image-keeper@gmail.com>',
    subject: 'Password recovery link',
  },
});
