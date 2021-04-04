---
order: 2
title: 开始使用
toc: true
timeline: true

---
这是一个基本描述信息, 哈哈~~

---



# ღ react-iaux

一个React UI Library, 使用简单

[![npm][npm]][npm-url]
[![deps][deps]][deps-url]
[![license][license]][license-url]
[![last-commit][last-commit]][last-commit-url]
[![release][release]][release-url]
[![prs][prs]][prs-url]
[![download][download]][download-url]

## Get Started ☆

### install

```
npm i -S react-iaux
```

### Usage

```js
import React from 'react';
import { Button } from 'react-iaux';

export default function() {
  return (
    <div className="dc-btn-line">
      <Button onClick={() => console.log('Hello React')}>Get Started</Button>
    </div>
  );
}

```

### Load on demand

- direct import

```js
import Button from 'react-iaux/es/button';
```

- with `babel-import-plugin`

```js
module.exports = {
  'plugins': [
    [
      'import',
      {
        'libraryName': 'react-iaux',
        'libraryDirectory': 'es',
        'style': true,
        'camel2DashComponentName': false,
        'customName': name => {
          return `react-iaux/es/${[name[0].toLowerCase(), name.substr(1)].join('')}`;
        },
      },
    ],
}
```

## LICENSE

The MIT License (MIT)


[npm]: https://img.shields.io/npm/v/react-iaux

[npm-url]: https://www.npmjs.com/package/react-iaux

[node]: https://badgen.net/npm/node/react-iaux

[node-url]: https://nodejs.org

[deps]: https://img.shields.io/david/webpack/webpack.svg

[deps-url]: #

[prs]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg

[prs-url]: https://github.com/iovx/iovx/react-iaux

[tag]: https://badgen.net/github/tags/iovx/react-iaux

[tag-url]: #

[release]: https://badgen.net/github/release/iovx/react-iaux

[release-url]: #

[license]: https://img.shields.io/github/license/iovx/react-iaux

[license-url]: #

[tests-url]:https://travis-ci.com/github/iovx/react-iaux/builds

[tests]:https://badgen.net/travis/iovx/react-iaux

[last-commit-url]: https://travis-ci.com/github/iovx/react-iaux/builds

[last-commit]: https://badgen.net/github/last-commit/iovx/react-iaux

[cover-url]: https://codecov.io/github/react-iaux/

[cover]: https://badgen.net/codecov/c/github/react-iaux/master

[download-url]: https://www.npmjs.com/package/react-iaux

[download]: https://badgen.net/npm/dw/react-iaux

