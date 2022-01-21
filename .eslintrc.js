module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module',
  },
  extends: [
    '@nuxtjs',
  ],
  // カスタムルールを追記
  rules: {
    'comma-dangle': ['error', 'always-multiline'],
  },
}
