module.exports = {
  extends: ['plugin:vue/vue-recommended', 'relaxed-ts'],
  overrides: [
    {
      files: ['*.vue'],
      parser: 'vue-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.vue']
      },
      rules: {
        'no-undef': 'off'
      }
    },
    {
      files: ['*.html'],
      rules: {
        'vue/comment-directive': 'off'
      }
    }
  ],
  rules: {
    'vue/multi-word-component-names': [
      'off',
      {
        ignores: ['index']
      }
    ]
  }
}
