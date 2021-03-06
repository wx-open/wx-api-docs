module.exports = {
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  extends: [
    'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    'plugin:react/recommended',
    'plugin:jsx-control-statements/recommended',
    'prettier',
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
  plugins: ['import', '@typescript-eslint', 'react', 'jsx-control-statements', 'prettier'],
  env: {
    browser: true,
    node: true,
    es6: true,
    mocha: true,
    'jsx-control-statements/jsx-control-statements': true,
  },
  rules: {
    'prettier/prettier': 1,
    'no-console': ['warn', { allow: ['warn', 'error', 'log'] }],
    eqeqeq: ['warn', 'always'],
    'prefer-const': ['error', { destructuring: 'all', ignoreReadBeforeAssign: true }],
    // '@typescript-eslint/indent': ['error', 2, { VariableDeclarator: 2, SwitchCase: 1, ObjectExpression: 2 }],
    '@typescript-eslint/no-unused-vars': 0,
    '@typescript-eslint/interface-name-prefix': 0,
    '@typescript-eslint/no-empty-interface': 0,
    '@typescript-eslint/explicit-member-accessibility': 0,
    '@typescript-eslint/no-triple-slash-reference': 0,
    '@typescript-eslint/ban-ts-ignore': 0,
    '@typescript-eslint/no-this-alias': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/triple-slash-reference': ['error', { path: 'always', types: 'never', lib: 'never' }],
    // React相关校验规则
    'react/jsx-indent': [2, 2],
    'react/jsx-no-undef': [2, { allowGlobals: true }],
    'jsx-control-statements/jsx-use-if-tag': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-non-null-assertion': 0,
    '@typescript-eslint/no-namespace': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/ban-types': 0,
    quotes: ['error', 'single', { avoidEscape: true, allowTemplateLiterals: false }],
  },
};
