module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
  },
  extends: [
    'airbnb',
    'prettier',
    'prettier/react',
    'prettier/@typescript-eslint',
    'plugin:testcafe/recommended',
  ],
  env: {
    browser: true,
    node: true,
    jest: true,
  },
  plugins: ['import', 'promise', 'compat', 'react', 'prettier', '@typescript-eslint', 'testcafe'],
  settings: {
    'import/resolver': {
      webpack: {
        config: 'configs/webpack.config.eslint.js',
      },
    },
    'import/core-modules': ['electron'],
  },
  rules: {
    'react/jsx-filename-extension': 'off',
    'import/namespace': 'off',
    'import/named': 'off',
    'import/default': 'off',
    'no-unused-vars': 'off',
    'prettier/prettier': ['error', { parser: 'typescript' }],
    'import/no-extraneous-dependencies': [2, { devDependencies: true }],
    'react/destructuring-assignment': 'off',
    'import/no-mutable-exports': 'off',
  },
}
