const path = require('path');
const fs  = require('fs');
const webpack = require('webpack');
const WebpackBar = require('webpackbar');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniExtractWebpackPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const getBabelConfig = require('./babel.config');
const { merge: webpackMerge } = require('webpack-merge');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const { getProjectPath } = require('./base');
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');
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
  const distPath = getOutputDir();
  const pubPath = getProjectPath('public');
  const copyPatterns = fs.existsSync(pubPath)
    ? [
        {
          from: getProjectPath('public'),
          to: distPath,
          noErrorOnMissing: true,
        },
      ]
    : [];
  const config = {
    entry: path.resolve(root, './src/index.ts'),
    output: {
      path: distPath,
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
          parallel: true, // ?????????????????????,????????????????????????
          extractComments: false,
          // sourceMap: true, // ??????sourceMap, ????????????????????????????????????(?????????????????????)
          terserOptions: {
            // ????????????js?????????,?????????????????????,?????????????????????????????????
            // warnings: false, // ???UglifyJs?????????????????????????????????????????????
            compress: {
              collapse_vars: true,
              drop_console: false, // ??????????????? `console` ?????????????????????ie?????????
              reduce_vars: true, // ?????????????????????????????????????????????????????????????????????
            },
            output: {
              comments: false, // ??????????????????(??????)
              beautify: false, // ??????????????????(??????)
            },
          },
        }),
      ],
      moduleIds: 'hashed',
      runtimeChunk: {
        // ??????????????????chunk, ?????????????????????????????????
        name: (entrypoint) => `runtimes~${entrypoint.name}`,
      },
      splitChunks: {
        chunks: 'all',
        minSize: 30000,
        minChunks: 3,
        // ????????????
        cacheGroups: {
          // ?????????
          node_modules: {
            name: 'vendor', // ????????????
            test: /[\\/]node_modules[\\/]/, // ??????????????????
            chunks: 'all', // 'initial', 'async', 'all' ????????????????????????????????????????????????????????????, ??????????????????
            minChunks: 2, // ??????????????????????????????????????????, 2??????????????????~
            priority: -10, // ???????????????
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
                // ????????????options???????????????????????? No PostCSS Config found
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
      new CopyWebpackPlugin({
        patterns: copyPatterns,
      }),
      new FilterWarningsPlugin({
        exclude: /mini-css-extract-plugin[^]*Conflicting order/,
      }),
      new CaseSensitivePathsPlugin(),
      new webpack.BannerPlugin({
        banner: `
???? Copyright 2017-present, ????????????, Inc.
All rights reserved.
      `, // ??????????????????????????????????????????
        raw: false, // ???????????? true????????????????????????????????????
        entryOnly: true, // ???????????? true?????????????????? chunks ???????????????
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
