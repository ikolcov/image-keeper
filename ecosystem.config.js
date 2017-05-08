module.exports = {
  apps: [
    {
      name: 'front',
      cwd: './front',
      script: 'src/server/main.js',
      watch: ['./build', './src'],
    },
    {
      name: 'lb',
      cwd: './lb',
      script: 'dev.js',
      watch: ['./src'],
    },
    {
      name: 'mailer',
      cwd: './mailer',
      script: 'dev.js',
      watch: ['./src'],
    },
    {
      name: 'resizer',
      cwd: './resizer',
      script: 'dev.js',
      watch: ['./src'],
    },
    {
      name: 'sso',
      cwd: './sso',
      script: 'dev.js',
      watch: ['./src'],
    },
    {
      name: 'storage',
      cwd: './storage',
      script: 'dev.js',
      watch: ['./src'],
    },
  ],
};
