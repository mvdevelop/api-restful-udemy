export default [
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: 'module',
      globals: {
        ...globalThis.globals,
      },
    },
    rules: {
      'no-console': 'off',
      'class-methods-use-this': 'off',
      'prefer-const': 'error',
      'no-var': 'error',
      'prefer-arrow-callback': 'error',
    },
  },
  {
    ignores: ['dist/', 'node_modules/', 'uploads/'],
  },
];