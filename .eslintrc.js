module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'max-len': 'off',
    'func-names': 'off',
    'no-multi-assign': 'off',
    'import/extensions': 'off',
    'no-restricted-globals': 'off',
    'no-param-reassign': 'off',
    'no-underscore-dangle': 'off',
    'no-shadow': 'off',
    'no-plusplus': 'off',
    'no-undef': 'off',
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
