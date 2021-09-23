// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');
const root = path.resolve(__dirname, '../');

function getRootPath() {
  return root;
}

function getOutputDir() {
  const root = process.cwd();
  return path.resolve(root, 'sites');
}

function getProjectPath(...dir) {
  const root = process.cwd();
  return path.resolve(root, ...dir);
}

function getDevServerOutputDir() {
  const root = process.cwd();
  return path.resolve(root, 'sites');
}

function getHolderPath() {
  return path.resolve(root, 'src/data.ts');
}

let temp;

function getWxConfig(cwd = process.cwd(), force = false) {
  if (temp && force !== true) {
    return temp;
  }
  const file = path.resolve(cwd, 'wx.config.js');
  const defaultInjects = {
    server: (c) => c,
    webpack: (c) => c,
    port: 8020,
    sniffChangeLog: false,
    changeLogKey: 'CHANGELOG',
    injectScripts: [
      '//cdnjs.cloudflare.com/ajax/libs/react/17.0.2/umd/react.production.min.js',
      '//cdnjs.cloudflare.com/ajax/libs/react-dom/17.0.2/umd/react-dom.production.min.js',
    ],
    injectStyles: ['//cdnjs.cloudflare.com/ajax/libs/github-markdown-css/4.0.0/github-markdown.min.css'],
    copyPatterns: [],
    copyPaths: ['public'],
  };
  if (fs.existsSync(file)) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const config = require(file);
      temp = {
        ...defaultInjects,
        ...config,
        inject: {
          title: 'Wx API Docs',
          ...config.inject,
        },
      };
      return temp;
    } catch (e) {
      console.error(e);
    }
  }
  temp = {
    ...defaultInjects,
    inject: {
      title: 'Wx API Docs',
    },
  };
  return temp;
}

module.exports = { getRootPath, getWxConfig, getProjectPath, getHolderPath, getOutputDir, getDevServerOutputDir };
