/* eslint-disable @typescript-eslint/no-var-requires */
/*eslint-env node */

module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'prettier/@typescript-eslint',
    'plugin:react-hooks/recommended',
  ],
  plugins: ['@typescript-eslint'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
  },
  env: {
    browser: true,
    es6: true,
  },
  rules: {
    '@typescript-eslint/explicit-module-boundary-types': 'off',
  },
};
