const path = require("path");
const fs = require("fs");
const root = path.resolve(__dirname, "../");

function getRootPath() {
  return root;
}

function getOutputDir() {
  const root = process.cwd();
  return path.resolve(root, "sites");
}

function getDevServerOutputDir() {
  const root = process.cwd();
  return path.resolve(root, "_sites");
}

function getHolderPath() {
  return path.resolve(root, "src/data.ts");
}

function getWxConfig(cwd = process.cwd()) {
  const file = path.resolve(cwd, "wx.config.js");
  const defaultInjects = {
    injectScripts: [
      "//cdnjs.cloudflare.com/ajax/libs/react/17.0.2/umd/react.production.min.js",
      "//cdnjs.cloudflare.com/ajax/libs/react-dom/17.0.2/umd/react-dom.production.min.js"
    ],
    injectStyles: [
      "//cdnjs.cloudflare.com/ajax/libs/github-markdown-css/4.0.0/github-markdown.min.css"
    ]
  };
  if (fs.existsSync(file)) {
    try {
      const config = require(file);
      return {
        ...defaultInjects,
        ...config,
        inject: {
          title: "Wx API Docs",
          ...config.inject
        }
      };
    } catch (e) {
      console.error(e);
    }
  }
  return {
    ...defaultInjects,
    inject: {
      title: "Wx API Docs"
    }
  };
}

module.exports = { getRootPath, getWxConfig, getHolderPath, getOutputDir, getDevServerOutputDir };
