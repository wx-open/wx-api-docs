const path = require('path');
module.exports = {
  inject: {
    title: '微风开发文档',
    favicon: '',
    logo: '',
  },
  injectScripts: [
    'http://static.assure.com/js/lib/react/16.8.6/umd/react.production.min.js',
    'http://static.assure.com/js/lib/react-dom/16.8.6/umd/react-dom.production.min.js',
  ],
  injectStyles: ['http://static.assure.com/css/common/github-markdown-css/3.0.1/github-markdown.css'],
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
};
