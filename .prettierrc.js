module.exports = {
  arrowParens: 'avoid',
  bracketSameLine: true,
  bracketSpacing: false,
  singleQuote: true,
  trailingComma: 'all',
  overrides: [
    {
      files: '*.md',
      options: {
        proseWrap: 'preserve',
        printWidth: 80,
      },
    },
  ],
};
