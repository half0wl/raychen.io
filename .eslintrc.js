module.exports = {
  root: true,
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.js'],
      parser: '@typescript-eslint/parser',
    },
  ],
  rules: {
    'react/no-unescaped-entities': 'off',
  },
  extends: [
    'next/core-web-vitals',
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:tailwindcss/recommended',
  ],
}
