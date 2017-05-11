// @flow

module.exports = {
  hosts: {
    lb: process.env.REACT_APP_LB_HOST || 'localhost:3000',
    sso: process.env.REACT_APP_SSO_HOST || 'localhost:1000',
    storage: process.env.REACT_APP_STORAGE_HOST || 'localhost:500',
  },
};
