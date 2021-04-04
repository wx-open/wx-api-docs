// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
module.exports = {
  inject: {
    title: '微风开发文档',
    favicon: '',
    logo: '',
  },
  cwd: path.resolve(__dirname, './src'),
  template: path.resolve(__dirname, './src'),
  groups: [
    {
      order: 2,
      title: '组件',
      route: '/components',
      basePath: './components',
    },
  ],
  port: 9001,
  webpack(config) {
    return config;
  },
  server(options) {
    return options;
  },
};
