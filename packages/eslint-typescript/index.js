const base = require('eslint-config-relaxed-base/base')
const baseRules = require('eslint-config-relaxed-base/rules')

module.exports = {
  root: true,
  plugins: ['@typescript-eslint'],
  extends: [
    'relaxed-base/base',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended',
    'relaxed-base/prettier'
  ],
  overrides: [
    ...base.overrides,
    {
      files: ['*.ts', '*.tsx', '*.mts', '*.cts'],
      parser: '@typescript-eslint/parser'
    },
    {
      files: ['*.md.ts', '*.md.typescript'],
      rules: {
        ...baseRules.markdownCodeRules,
        '@typescript-eslint/no-unused-vars': 'off'
      }
    }
  ],
  rules: {
    // TS
    '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
    '@typescript-eslint/consistent-type-imports': [
      'error',
      { prefer: 'type-imports', disallowTypeAnnotations: false }
    ],
    '@typescript-eslint/ban-types': [
      'error',
      {
        extendDefaults: true,
        types: {
          '{}': false
        }
      }
    ],
    '@typescript-eslint/no-empty-interface': [
      'error',
      {
        allowSingleExtends: true
      }
    ],

    // Override JS
    'no-redeclare': 'off',
    '@typescript-eslint/no-redeclare': 'error',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'all',
        ignoreRestSiblings: false,
        varsIgnorePattern: '^_',
        argsIgnorePattern: '^_'
      }
    ],
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': [
      'error',
      { functions: false, classes: false, variables: true }
    ],
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': 'error',

    // off
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-var-requires': 'off'
  }
}
