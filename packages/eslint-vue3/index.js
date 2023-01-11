module.exports = {
  root: true,
  extends: ['plugin:vue/vue3-recommended', 'relaxed-ts'],
  overrides: [
    {
      files: ['*.vue'],
      parser: 'vue-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.vue']
      },
      rules: {
        'no-undef': 'off',
        'vue/html-self-closing': 'off'
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
      'error',
      {
        ignores: ['index']
      }
    ],
    'vue/html-self-closing': 'off'
    // 'import/order': [
    //   'error',
    //   {
    //     'newlines-between': 'never',
    //     groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
    //     pathGroups: [
    //       {
    //         pattern: 'vue',
    //         group: 'external',
    //         position: 'before'
    //       },
    //       {
    //         pattern: 'vue-router',
    //         group: 'external',
    //         position: 'before'
    //       },
    //       {
    //         pattern: 'pinia',
    //         group: 'external',
    //         position: 'before'
    //       },
    //       {
    //         pattern: '@/store',
    //         group: 'internal',
    //         position: 'before'
    //       },
    //       {
    //         pattern: '@/components',
    //         group: 'internal',
    //         position: 'before'
    //       },
    //       {
    //         pattern: '@/config',
    //         group: 'internal',
    //         position: 'before'
    //       },
    //       {
    //         pattern: '@/settings',
    //         group: 'internal',
    //         position: 'before'
    //       },
    //       {
    //         pattern: '@/enum',
    //         group: 'internal',
    //         position: 'before'
    //       },
    //       {
    //         pattern: '@/plugins',
    //         group: 'internal',
    //         position: 'before'
    //       },
    //       {
    //         pattern: '@/layouts',
    //         group: 'internal',
    //         position: 'before'
    //       },
    //       {
    //         pattern: '@/views',
    //         group: 'internal',
    //         position: 'before'
    //       },
    //       {
    //         pattern: '@/router',
    //         group: 'internal',
    //         position: 'before'
    //       },
    //       {
    //         pattern: '@/service',
    //         group: 'internal',
    //         position: 'before'
    //       },
    //       {
    //         pattern: '@/context',
    //         group: 'internal',
    //         position: 'before'
    //       },
    //       {
    //         pattern: '@/composables',
    //         group: 'internal',
    //         position: 'before'
    //       },
    //       {
    //         pattern: '@/hooks',
    //         group: 'internal',
    //         position: 'before'
    //       },
    //       {
    //         pattern: '@/utils',
    //         group: 'internal',
    //         position: 'before'
    //       },
    //       {
    //         pattern: '@/assets',
    //         group: 'internal',
    //         position: 'before'
    //       },
    //       {
    //         pattern: '@/**',
    //         group: 'internal',
    //         position: 'before'
    //       }
    //     ],
    //     pathGroupsExcludedImportTypes: ['vue', 'vue-router', 'pinia']
    //   }
    // ]
  }
}
