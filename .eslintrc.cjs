module.exports = {
  ignorePatterns: ['**/dist/*'],
  extends: ['standard', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  root: true,
  rules: {
    '@typescript-eslint/no-var-requires': 0
  }
}
