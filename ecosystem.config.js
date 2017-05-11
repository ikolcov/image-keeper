module.exports = {
  apps: [
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
      env: {
        mailer_transport__auth__user: 'mustBeChanged@gmail.com',
        mailer_transport__auth__pass: 'mustBeChangedAsWell',
      },
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
