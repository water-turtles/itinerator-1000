module.exports = {
  ignorePatterns: ['**/dist/*'],
  extends: ['standard', 'plugin:react/recommended', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  // parserOptions: {
  //   ecmaFeatures: {
  //     jsx: true
  //   },
  //   ecmaVersion: 12,
  //   sourceType: 'module'
  // },
  plugins: [
    'react',
    '@typescript-eslint'
  ],
  root: true,
  rules: {
    '@typescript-eslint/no-var-requires': 0,
    "react/no-unescaped-entities": 0,
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off"
    indent: ['error', 2]
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
}
