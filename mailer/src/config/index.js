import rc from 'rc';

export default rc('mailer', {
  port: '4000',
  authKey: 'key',
  transport: {
    service: 'gmail',
    auth: {
      user: 'changeMeThere@gmail.com',
      pass: 'blablabla',
    },
  },
  options: {
    from: '"Image Keeper" <image-keeper@gmail.com>',
    subject: 'Password recovery link',
  },
});
