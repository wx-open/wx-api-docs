const path = require('path');
const webpack = require('webpack');
const WebpackBar = require('webpackbar');

const TerserWebpackPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniExtractWebpackPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const getBabelConfig = require('./babel.config');
const { merge: webpackMerge } = require('webpack-merge');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');

const { getRootPath, getOutputDir, getHolderPath, getWxConfig } = require('./base');
const root = getRootPath();
const MiniExtractLoader = {
  loader: MiniExtractWebpackPlugin.loader,
  options: {
    publicPath: '/',
    hmr: false,
  },
};
module.exports = function getWebpackConfig(options = {}, extraConfig = {}) {
  const isDev = options.mode === 'development';
  const mode = isDev ? 'development' : 'production';
  const devtool = isDev ? 'source-map' : 'none';
  const minimize = options.minimize || !isDev;
  const wxConfig = getWxConfig();
  const configWrapper = wxConfig.webpack || ((a) => a);
  const htmlTitle = wxConfig.inject.title || 'Wx API Docs';
  const htmlIcon = wxConfig.inject.favicon || path.resolve(root, 'src/assets/favicon.ico');
  const injectScripts = wxConfig.injectScripts || [];
  const injectStyles = wxConfig.injectStyles || [];
  const config = {
    entry: path.resolve(root, './src/index.ts'),
    output: {
      path: getOutputDir(),
      filename: 'static/js/[name].[hash].js',
      publicPath: '/',
      libraryTarget: 'umd',
      chunkFilename: 'static/js/[id].[contenthash].js',
      umdNamedDefine: true,
      globalObject: 'this',
    },
    target: 'web',
    devtool,
    resolve: {
      extensions: ['js', 'jsx', '.ts', '.tsx', '.js', '.json'],
      alias: {
        'react-px': path.resolve(root, 'src/components'),
      },
    },
    mode,
    optimization: {
      minimize,
      minimizer: [
        new TerserWebpackPlugin({
          parallel: true, // 开启多进程编译,大大提高构建速度
          extractComments: false,
          // sourceMap: true, // 开启sourceMap, 将错误信息映射到相应模块(会减慢编译速度)
          terserOptions: {
            // 设置压缩js的选项,对比之前的配置,只需要使用默认选项即可
            // warnings: false, // 在UglifyJs删除没有用到的代码时不输出警告
            compress: {
              collapse_vars: true,
              drop_console: false, // 删除所有的 `console` 语句，可以兼容ie浏览器
              reduce_vars: true, // 提取出出现多次但是没有定义成变量去引用的静态值
            },
            output: {
              comments: false, // 剔除所有注释(默认)
              beautify: false, // 最紧凑的输出(默认)
            },
          },
        }),
      ],
      moduleIds: 'hashed',
      runtimeChunk: {
        // 单独生成一个chunk, 包含了运行时每个入口点
        name: (entrypoint) => `runtimes~${entrypoint.name}`,
      },
      splitChunks: {
        chunks: 'all',
        minSize: 30000,
        minChunks: 3,
        // 分割代码
        cacheGroups: {
          // 缓存组
          node_modules: {
            name: 'vendor', // 组的名字
            test: /[\\/]node_modules[\\/]/, // 正则匹配规则
            chunks: 'all', // 'initial', 'async', 'all' 分别对应优化时只选择非异步引入，异步引入, 所有引入方式
            minChunks: 2, // 触发分割代码优化的最小公用量, 2就比较合适啦~
            priority: -10, // 触发优先级
          },
        },
      },
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: [
            {
              loader: 'babel-loader',
              options: getBabelConfig(),
            },
          ],
        },
        { test: /\.txt/, use: ['raw-loader'] },
        {
          test: /\.md/,
          use: [
            {
              loader: 'babel-loader',
              options: getBabelConfig(),
            },
            {
              loader: 'wx-md-loader',
              // loader: require.resolve(path.resolve(__dirname, './lib/loaders/local-md-loader/cjs')),
            },
          ],
        },
        {
          test: /\.json$/,
          type: 'javascript/auto',
          loader: 'json-loader',
        },
        {
          test: /\.css$/,
          use: [
            MiniExtractLoader,
            {
              loader: 'css-loader',
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => [require('autoprefixer')()],
              },
            },
          ],
          exclude: ['/node_modules/'],
        },
        {
          test: /\.less/,
          use: [
            MiniExtractLoader,
            {
              loader: 'css-loader',
            },
            {
              loader: 'postcss-loader',
              options: {
                // 如果没有options这个选项将会报错 No PostCSS Config found
                plugins: () => [require('autoprefixer')()],
              },
            },
            {
              loader: 'less-loader',
              options: {
                javascriptEnabled: true,
                modifyVars: {
                  'primary-color': '#1DA57A',
                  'link-color': '#1DA57A',
                  'border-radius-base': '2px',
                },
              },
            },
          ],
          exclude: ['/node_modules/'],
        },
        {
          test: /\.jsx?$/,
          use: [
            {
              loader: 'babel-loader',
              options: getBabelConfig(),
            },
          ],
          exclude: ['/node_modules/'],
        },
        {
          test: /\.(png|jpg|gif|eot|ttf|woff|woff2)$/,
          loader: 'url-loader',
          options: {
            limit: 15360,
            name: 'assets/[hash:8].[name].[ext]',
            fallback: 'file-loader',
          },
        },
        {
          test: /\.svg/,
          use: {
            loader: 'svg-sprite-loader',
            options: {},
          },
        },
        {
          test: (filename) => {
            return getHolderPath() === filename;
          },
          use: [
            'cache-loader',
            {
              // loader: require.resolve(path.resolve(__dirname, './lib/loaders/local-md-loader/cjs')),
              loader: 'wx-md-loader',
              options: {
                type: 'source',
              },
            },
          ],
        },
      ],
    },
    resolveLoader: {
      modules: [path.resolve(process.cwd(), './node_modules')],
    },
    externals: {
      'react-dom': 'ReactDOM',
      react: 'React',
    },
    plugins: [
      new CleanWebpackPlugin(),
      new CaseSensitivePathsPlugin(),
      new webpack.BannerPlugin({
        banner: `
🔥 Copyright 2017-present, 微风平台, Inc.
All rights reserved.
      `, // 其值为字符串，将作为注释存在
        raw: false, // 如果值为 true，将直出，不会被作为注释
        entryOnly: true, // 如果值为 true，将只在入口 chunks 文件中添加
      }),
      new MiniExtractWebpackPlugin({
        filename: 'static/css/[name][contenthash].css',
        chunkFilename: 'static/css/[id].[contenthash].css',
      }),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        minify: minimize,
        template: path.resolve(root, 'src/assets/index.html'),
        favicon: htmlIcon,
        title: htmlTitle,
        injectStyles,
        injectScripts,
      }),
      new WebpackBar({
        name: 'Wx Tools',
        color: '#0d878e',
        profile: true,
        basic: false,
      }),
    ],
  };
  const result = webpackMerge(config, extraConfig);
  return configWrapper(result) || result;
};
