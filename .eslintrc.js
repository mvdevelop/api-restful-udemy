import pluginJs from '@eslint/js';
import prettier from 'eslint-config-prettier';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { languageOptions: { globals: { ...globalThis.globals } } },
  pluginJs.configs.recommended,
  prettier,
];