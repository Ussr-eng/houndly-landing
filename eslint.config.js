import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import astro from 'eslint-plugin-astro';
import jsxA11y from 'eslint-plugin-jsx-a11y-x';
import reactHooks from 'eslint-plugin-react-hooks';
import tseslint from 'typescript-eslint';

export default defineConfig(
  { ignores: ['dist/', '.astro/', 'node_modules/', '.wrangler/'] },
  js.configs.recommended,
  tseslint.configs.strict,
  astro.configs.recommended,
  astro.configs['jsx-a11y-strict'],
  {
    files: ['**/*.tsx'],
    ...jsxA11y.configs.strict,
    ...reactHooks.configs.flat['recommended-latest'],
    plugins: {
      ...jsxA11y.configs.strict.plugins,
      ...reactHooks.configs.flat['recommended-latest'].plugins,
    },
    rules: {
      ...jsxA11y.configs.strict.rules,
      ...reactHooks.configs.flat['recommended-latest'].rules,
    },
  },
  {
    files: ['**/*.mjs', '**/*.js'],
    languageOptions: { globals: { process: 'readonly', URL: 'readonly', console: 'readonly' } },
  },
);
