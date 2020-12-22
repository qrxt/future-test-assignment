const path = require('path');
const { override, addWebpackAlias } = require('customize-cra');
const { alias } = require('react-app-rewire-alias');

module.exports = override(
  alias({
    '@root': '.',

    '@src': './src',
    '@public': './public',

    '@components': './src/components',
  }),
);
