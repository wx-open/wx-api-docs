---
order: -12
title: 使用指南
toc: true
timeline: true

---
这是一个基本描述信息, 哈哈~~

---


# 🌀 hope 前端自动构建工具

众智鸿图前端自动构建 cli

[![npm][npm]][npm-url]
[![node][node]][node-url]
[![deps][deps]][deps-url]
[![tests][tests]][tests-url]
[![builds][builds]][builds-url]

## Get Started

### Install

全局安装 cli工具

```shell script
npm i -g @hope/cli --registry http://47.104.247.250:8081/
```

###  创建一个空的工程

默认使用**`Typescript`**初始化一个工程

#### Example
```shell script
# 初始化
hp init
# 进入工程目录 
cd [demo]
# 安装依赖 
npm i 
# 运行打包
npm run dev
```
#### Command

```shell script
# 初始化一个空的工程
hp init [projectName] [options]
```

#### Arguments

| 参数          | 描述            |  可选 | 默认 |
| ------------- | ------ |  ------- |------- |
| --project-name [value]   | 指定创建工程名, 可交互过程中指定| √|`demo`      |
| --page-name [value] | 初始功能名称, |√|  `test-page`       |
| --branch-name [value]| 初始化分支名称|√|  `branch-1`     |
| --component-name [value]| 初始化组件名称 |√|`test-component`    |
| --no-page   | 不生成初始化功能|√| --      |
| --no-component | 不生成初始化组件  |√| --      |
| --skip      | 使用默认配置初始化|√|  --      |
| --override       | 若创建目录已存在，则覆盖|√| --      |
| --use-typescript       | 使用`typescript`初始化 | √|--  |
| --cwd  [value]| 指定执行的目录 |√| --      |

#### Generated File Tree
```text

│  .editorconfig
│  .eslintrc.js
│  .gitignore
│  .npmrc
│  .prettierrc
│  package.json
│  readme.md
│  tsconfig.json
│  
├─config
│      config.dev.ts
│      config.ts
│      zx.json
│      
├─src
│  │  router.ts
│  │  
│  ├─components
│  │  ├─bbs-dashboard
│  │  │  │  BbsDashboard.tsx
│  │  │  │  index.ts
│  │  │  │  
│  │  │  └─style
│  │  │          index.less
│  │  │          
│  │  ├─local-provider
│  │  │  │  index.ts
│  │  │  │  LocalProvider.tsx
│  │  │  │  
│  │  │  └─style
│  │  │          index.less
│  │  │          
│  │  └─test-component
│  │      │  index.ts
│  │      │  TestComponent.tsx
│  │      │  
│  │      └─style
│  │              index.less
│  │              
│  ├─pages
│  │  ├─test-page
│  │  │  └─branch-1
│  │  │      └─view
│  │  │          │  index.ts
│  │  │          │  View.tsx
│  │  │          │  
│  │  │          └─style
│  │  │                  index.less
│  │  │                  
│  │  ├─wind-pps
│  │  │  └─branch-1
│  │  │      └─view
│  │  │          │  index.ts
│  │  │          │  View.tsx
│  │  │          │  
│  │  │          └─style
│  │  │                  index.less
│  │  │                  
│  │  └─wind-test
│  │      └─branch-1
│  │          └─view
│  │              │  index.ts
│  │              │  View.tsx
│  │              │  
│  │              └─style
│  │                      index.less
│  │                      
│  └─shared
│      │  constant.js
│      │  
│      └─utils
│              http.js
│              
└─typings
        index.d.ts
        

```



### 添加一个新的功能

创建一个新的 功能/分支/model/组件

#### Example

```shell script
# 添加一个功能
hp new page system-monitor
# 给页面创建一个新分支
hp new branch system-monitor:branch-test
# 添加组件 AuthWrapper
hp new component auth-wrapper
```

#### Command

```shell script
# 添加一个新功能，会创建一个默认分支
hp new page [pageName:branchName] [options]
# 给功能添加一个新分支
hp new branch [pageName:branchName] [options]
# 给指定功能分支添加一个 dva model
hp new model [pageName:branchName:modelName] [options]
# 创建一个 react component
hp new component [componentName] [options]
```

#### Arguments

| 参数          | 描述 |  可选 | 默认 |
| ------------- | ------ |  ------- |------- |
| --page-name    | 功能名称 | × |  --       |
| --branch-name | 分支名称|√|  `branch-{n}`  |
| --with-model | 使用 dva model  |√|`false`     |
| --namespace      | model命名空间|√|  --      |
| --model-name      | model文件名|√|  --      |
| --with-style   | 使用样式表|√| `true`      |
| --css-module      | 启用CSS Module |√|  `true`      |
| --react-pure-component       | 使用`React.PureComponent`初始化 | √|`false` |
| --use-typescript       | 使用`typescript`初始化 | √|--  |
| --override       | 若创建目录已存在，则覆盖|√| `false`      |
| --cwd        | 指定执行的目录 |√| -- |


### 移除功能

移除一个功能/分支/model/组件

#### Example

```shell script
# 移除功能 system-monitor，包含其所有分支
hp rm page system-monitor -f
# 移除功能 system-monitor branch-1分支
hp rm branch system-monitor:branch-1 -f
# 移除组件 TestComponent
hp rm component test-componet -f
```

#### Command

```shell script
# 移除功能
hp rm page [pageName] [options]
# 移除功能分支
hp rm branch [pageName:branchName] [options]
# 给指定功能分支添加一个 dva model
hp rm model [pageName:branchName:modelName] [options]
# 移除组件
hp rm component [componentName] [options]
```

#### Arguments

| 参数          | 描述 |  可选 | 默认 |
| ------------- | ------ |  ------- |------- |
| --page-name    | 功能名称 | × |  --       |
| --branch-name | 分支名称|√|  `branch-{n}`  |
| --model-name      | model文件名|√|  --      |
| --force       | 强制移除|√| `false`|
| --cwd        | 指定执行的目录 |√| -- |


### 查看功能

查看页面/分支/组件

#### Example

```shell script
# 查看功能分支列表
hp list branch -p system-monitor
```


#### Command

```shell script
# 查看所有功能
hp list page [options]
# 查看指定功能所有分支
hp list branch [pageName] [options]
# 查看所有组件
hp list component [options]
# 查看路由信息
hp list route
# 查看模板列表
hp list template
```

#### Arguments

| 参数          | 描述 |  可选 | 默认 |
| ------------- | ------ |  ------- |------- |
| --page-name    | 功能名称 | × |  --       |
| --cwd        | 指定执行的目录 |√ | -- |



### 国际化提取

提取生成国际化词典文件

#### Example

```shell script
# 提取指定页面功能词条信息
hp localize --scan-path ./src/pages/system-monitor

```

#### Command

```shell script
hp localize [options]
```

#### Arguments

| 参数          | 描述 |  可选 | 默认 |
| ------------- | ------ |  ------- |------- |
| --lang-wrapper <lang-wrapper>    | 国际化函数 | √ |  `languageChange`  |
| --scan-path    | 指定扫描路径 | √ |  `./`  |
| --translate    | 翻译提取的词条 | √ |  `true`  |
| --scan-html    | 扫描 `.html` | √ |   `false`      |
| --scan-ts | 扫描 `.ts` |√|   `true`   |
| --scan-js | 扫描 `.js` |√|   `true`  |
| --scan-react | 扫描 `.jsx`|`√|   `true`   |
| --cwd        | 指定执行的目录 |√ | -- |



### 配置查看

查看内部配置相关参数

#### Example

```shell script
hp config get template
```

#### Command

```shell script
hp config get [key]
```

#### Arguments
| 参数          | 描述 |  可选 | 默认 |
| ------------- | ------ |  ------- |------- |
| --cwd        | 指定执行的目录 |√ | -- |

## Configuration

配置文件 config/config.local.(js|ts)

```json
{
  "typescript": true,
  "docker": "../docker",
  "languageWrapper":"languageChange"
}
```


## License

This source code is for internal communication only











[npm]: https://img.shields.io/npm/v/webpack.svg
[npm-url]: http://47.104.247.250:8081/-/web/detail/@hope/cli
[node]: https://img.shields.io/node/v/webpack.svg
[node-url]: https://nodejs.org
[deps]: https://img.shields.io/david/webpack/webpack.svg
[deps-url]: #
[tests]: https://img.shields.io/travis/webpack/webpack/master.svg
[tests-url]: #
[prs]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg
[prs-url]: #
[builds-url]: #
[builds]: https://ci.appveyor.com/api/projects/status/github/webpack/webpack?svg=true
[cover]: https://img.shields.io/coveralls/webpack/webpack.svg
