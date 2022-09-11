module.exports = {
  root: true,
  extends: [
    'prettier',
    'relaxed-vue',
    'plugin:prettier/recommended'
  ],
  plugins: ['prettier'],
  rules: {
    'no-console': 'error',
    semi: 'error'
  }
}
