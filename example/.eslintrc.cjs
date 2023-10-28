module.exports = {
  root: true,
  env: { browser: true, es2020: true, es2021: true, node: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'airbnb',
    'plugin:prettier/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh', 'prettier'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'prettier/prettier': 'error',
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', '.jsx'],
      },
    ],
  },
};
