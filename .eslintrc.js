module.exports = {
  root: true,
  extends: ['@react-native', 'prettier'],
  ignorePatterns: ['lib/', 'node_modules/', 'example/'],
  parserOptions: {
    requireConfigFile: false,
  },
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
  },
};
