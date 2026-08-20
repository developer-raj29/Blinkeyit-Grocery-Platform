import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

const unusedVarsRule = ['error', {
  varsIgnorePattern: '^[A-Z_]|^_',
  argsIgnorePattern: '^_|^index$',
  caughtErrorsIgnorePattern: '^_',
}]

export default [
  // Ignore built artifacts and dependency folders
  { ignores: ['dist', 'server/node_modules', 'node_modules'] },

  // ─── Frontend (React / Vite) ────────────────────────────────────────────────
  {
    files: ['src/**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'no-unused-vars': unusedVarsRule,
      'react-hooks/exhaustive-deps': 'off',
      'react-refresh/only-export-components': 'off',
    },
  },

  // ─── Backend (Node.js / CommonJS) ───────────────────────────────────────────
  {
    files: ['server/**/*.js'],
    ignores: ['server/tests/**/*.js', 'server/**/*.test.js'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.node,
        ...globals.commonjs,
      },
      sourceType: 'commonjs',
    },
    rules: {
      ...js.configs.recommended.rules,
      'no-unused-vars': unusedVarsRule,
      'no-case-declarations': 'error',
      'no-extra-boolean-cast': 'error',
    },
  },

  // ─── Backend Tests (Jest) ────────────────────────────────────────────────────
  {
    files: ['server/tests/**/*.js', 'server/**/*.test.js'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.node,
        ...globals.commonjs,
        ...globals.jest,
      },
      sourceType: 'commonjs',
    },
    rules: {
      ...js.configs.recommended.rules,
      'no-unused-vars': unusedVarsRule,
    },
  },
]
