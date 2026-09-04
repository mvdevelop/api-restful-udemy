module.exports = {
  env: {
    es2024: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
  ],
  parserOptions: {
    ecmaVersion: 2024,
    sourceType: 'module',
  },
  rules: {
    'no-console': 'off',
    'class-methods-use-this': 'off',
    'prefer-const': 'error',
    'no-var': 'error',
    'prefer-arrow-callback': 'error',
  },
};