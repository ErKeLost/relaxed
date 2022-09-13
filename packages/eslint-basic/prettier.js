const { prettierRules } = require('./rules')
// const { rules: prettierRules } = require('eslint-config-prettier')

module.exports = {
  extends: ['plugin:prettier/recommended'],
  rules: {
    // ...prettierRules,
    'prettier/prettier': ['error', prettierRules]
    // 'prettier/prettier': 'error'
  }
}
