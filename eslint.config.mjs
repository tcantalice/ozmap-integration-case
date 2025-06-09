import eslintRecommended from '@eslint/js';
import importPlugin from 'eslint-plugin-import';
import prettierPlugin from 'eslint-plugin-prettier';
import tseslint from 'typescript-eslint';

export default [
  eslintRecommended.configs.recommended,

  ...tseslint.config({
    files: ['**/*.ts'],
    languageOptions: {
      parser: tseslint.parser,
      sourceType: 'module',
      parserOptions: {
        project: './tsconfig.json', // necessário para resolver imports absolutos
      },
    },
  }),

  {
    plugins: { import: importPlugin },
    rules: {
      ...importPlugin.configs.recommended.rules,
      ...importPlugin.configs.typescript.rules,
    },
  },

  {
    plugins: { prettier: prettierPlugin },
    rules: {
      'prettier/prettier': 'warn', // ativa prettier como regra
    },
  },
];
