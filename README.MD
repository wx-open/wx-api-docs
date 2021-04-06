# 文档使用指南

一个简单的基于`markdown`的文档生成工具，支持JS代码转换执行，生成静态站点

[![npm][npm]][npm-url]
[![deps][deps]][deps-url]
[![license][license]][license-url]
[![build][build]][build-url]
[![prs][prs]][prs-url]

## 开始使用


### 安装依赖

```shell script
npm i wx-md-loader wx-api-docs wx-api-generator --save-dev
```


### 添加文档配置

```js

const path = require('path');
module.exports = {
  // 文档标题、logo信息
  inject: {
    title: '微风开发文档',
    logo: '',
  },
  // 配置文档扫描的基准目录，控制到最小，降低信息消耗
  cwd: path.resolve(__dirname, './src'),
  // 文档入口路由信息
  groups: [
    {
      // 排序，越小越靠前
      order: 2,
      // 用于显示标题
      title: '组件',
      // 分组路由
      route: '/components',
      // 分组路由对应的文档目录（相对于 cwd）
      basePath: './components',
    },
  ],
  // 文档开发端口，默认为 8020
  port: 9001,
  // webpack 配置处理
  webpack(config) {
    
  }
};

```

### 运行脚本

在 package.json中添加script

```json
{
  "scripts": {
    "docs:start": "wx docs start",
    "docs:build": "wx docs build"
  }
}

```

## 开发阶段

默认会打开一个开发服务器

```shell script
npm run docs:start
```


## 生成静态端点

生成到 `sites` 目录

```shell script
npm run docs:build
```


## 文档编写

 其中头部信息为文档生成提供元信息，以三个`hr` 标记分开；
`order` 控制生成文档目录的顺序，
`cate`为当前文档所属分组， 不存在时则显示为根目录；
`title`为目录显示的标题信息
`toc`控制是否文档显示在目录中

```markdown
---
order: 2
cate: 基本使用
title: 测试DEMO
toc: false
timeline: true

---
这是一个基本描述信息, 哈哈~~

---

正文信息....
正文信息....
正文信息....

```


## LICENSE

MIT


[npm]: https://img.shields.io/npm/v/wx-api-docs
[npm-url]: https://www.npmjs.com/package/wx-api-docs

[deps]: https://img.shields.io/david/webpack/webpack.svg
[deps-url]: #


[prs]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg
[prs-url]: https://github.com/wx-open/wx-api-docs/pulls

[license]: https://img.shields.io/github/license/wx-open/wx-api-docs
[license-url]: #
[cover]: https://badgen.net/codecov/c/github/wx-open/wx-api-docs/master
[cover-url]: https://codecov.io/github/wx-open/wx-api-docs/

[build]:https://travis-ci.com/wx-open/wx-api-docs.svg?branch=master
[build-url]:https://travis-ci.com/wx-open/wx-api-docs
