import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginSecurity from 'eslint-plugin-security';
 
const eslintConfig = [
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  pluginSecurity.configs.recommended,
  // Prisma generates large JS bundles that are not meant to be manually linted.
  // Lint only the handwritten source code under src/ (and skip generated output).
  { ignores: ['src/prisma/generated/**'] },
  {
    rules: {
      'indent': ['error', 2],
      'no-unused-vars': ['warn', { 'args': 'none', 'ignoreRestSiblings': true }],
      'no-console': 'off',
      'prefer-const': 'error',
      'no-var': 'error',
      'arrow-parens': ['error', 'as-needed'],
      'semi': ['error', 'always'],
      'quotes': ['error', 'single'],
      'no-undef': 'error',
      'eqeqeq': ['error', 'always'],
      'no-shadow': 'error',
      'no-trailing-spaces': 'error',
      'no-magic-numbers': ['warn', { 'ignore': [0, 1] }],
      'complexity': ['warn', { 'max': 10 }],
      'consistent-return': 'error',
      'max-len': ['warn', { 'code': 100 }],
      'no-unused-expressions': ['error', { 'allowShortCircuit': true, 'allowTernary': true }],
      "security/detect-unsafe-regex": "error",
      "security/detect-buffer-noassert": "warn",
      "security/detect-non-literal-fs-filename": "warn",
      "security/detect-object-injection": "off"
    },  
    files: ['src/**/*.{js,jsx,ts,tsx}'],
  }
];
 
export default eslintConfig