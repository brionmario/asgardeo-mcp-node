import path from 'path';

export default {
  env: {
    es6: true,
    node: true,
  },
  extends: [
    'plugin:@wso2/typescript',
    'plugin:@wso2/strict',
    'plugin:@wso2/internal',
    'plugin:@wso2/jest',
    'plugin:@wso2/prettier',
  ],
  parserOptions: {
    ecmaVersion: 2018,
    project: [path.resolve(__dirname, 'tsconfig.eslint.json')],
  },
  plugins: ['@wso2'],
};
