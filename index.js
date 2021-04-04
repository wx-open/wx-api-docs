/* eslint-disable @typescript-eslint/no-var-requires */
const os = require('os');
const webpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const getWebpackConfig = require('./config/webpack.config');
const { getDevServerOutputDir, getWxConfig } = require('./config/base');
const chalk = require('chalk');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

function getAnalzerPlugin() {
  const options = {
    //  可以是`server`，`static`或`disabled`。
    //  在`server`模式下，分析器将启动HTTP服务器来显示软件包报告。
    //  在“静态”模式下，会生成带有报告的单个HTML文件。
    //  在`disabled`模式下，你可以使用这个插件来将`generateStatsFile`设置为`true`来生成Webpack Stats JSON文件。
    analyzerMode: 'server',
    //  将在“服务器”模式下使用的主机启动HTTP服务器。
    analyzerHost: '127.0.0.1',
    //  将在“服务器”模式下使用的端口启动HTTP服务器。
    analyzerPort: 9078,
    //  路径捆绑，将在`static`模式下生成的报告文件。
    //  相对于捆绑输出目录。
    reportFilename: 'report.html',
    //  模块大小默认显示在报告中。
    //  应该是`stat`，`parsed`或者`gzip`中的一个。
    //  有关更多信息，请参见“定义”一节。
    defaultSizes: 'parsed',
    //  在默认浏览器中自动打开报告
    openAnalyzer: true,
    //  如果为true，则Webpack Stats JSON文件将在bundle输出目录中生成
    generateStatsFile: false,
    //  如果`generateStatsFile`为`true`，将会生成Webpack Stats JSON文件的名字。
    //  相对于捆绑输出目录。
    statsFilename: 'stats.json',
    //  stats.toJson（）方法的选项。
    //  例如，您可以使用`source：false`选项排除统计文件中模块的来源。
    //  在这里查看更多选项：https：  //github.com/webpack/webpack/blob/webpack-1/lib/Stats.js#L21
    statsOptions: null,
    logLevel: 'info', // 日志级别。可以是'信息'，'警告'，'错误'或'沉默'。
  };
  return new BundleAnalyzerPlugin(options);
}

function ans() {
  const webpackConfig = getWebpackConfig({
    mode: 'production',
  });
  webpackConfig.plugins.push(getAnalzerPlugin());
  return webpack(webpackConfig, (err, stat) => {
    if (err) {
      console.error('Error', err);
      return;
    }
    if (stat.hasErrors()) {
      console.log(chalk.red(stat.toString('minimal')));
    }
    if (stat.hasWarnings()) {
      console.log(chalk.yellow(stat.toString('minimal')));
    }
    console.log(chalk.bgGreen(chalk.black(' DONE ')) + chalk.green(' success !'));
  });
}

function build() {
  const webpackConfig = getWebpackConfig({
    mode: 'production',
  });
  return webpack(webpackConfig, (err, stat) => {
    if (err) {
      console.error('Error', err);
      return;
    }
    if (stat.hasErrors()) {
      console.log(chalk.red(stat.toString('minimal')));
    }
    if (stat.hasWarnings()) {
      console.log(chalk.yellow(stat.toString('minimal')));
    }
    console.log(chalk.bgGreen(chalk.black(' DONE ')) + chalk.green(' success !'));
  });
}

function start(wrapper = (a) => a) {
  const webpackConfig = getWebpackConfig({
    mode: 'development',
  });
  const contentBase = getDevServerOutputDir();
  const wxConfig = getWxConfig();
  const serverWrapper = wxConfig.server || ((a) => a);
  const configPort = wxConfig.port || 8020;
  webpackConfig.output.path = contentBase;
  // webpackConfig.module.rules.push({ enforce: "pre", test: /\.js$/, loader: "source-map-loader" });
  const compiler = webpack(webpackConfig);
  const devServerOptions = {
    contentBase,
    hot: true,
    inline: true,
    historyApiFallback: true,
    port: configPort,
    open: false,
    noInfo: true,
    https: false,
    host: '0.0.0.0',
    stats: {
      assets: true,
      chunks: false,
      // 添加 namedChunkGroups 信息
      chunkGroups: false,
      // 将构建模块信息添加到 chunk 信息
      chunkModules: false,
      // 添加 chunk 和 chunk merge 来源的信息
      chunkOrigins: false,
      // 添加构建模块信息
      modules: false,
      colors: true,
      reasons: false,
      children: false,
    },
  };
  const callTempOptions = wrapper(devServerOptions) || devServerOptions;
  const finalOptions = serverWrapper(callTempOptions) || callTempOptions;
  const port = finalOptions.port;
  const host = finalOptions.host;
  const https = finalOptions.https;
  const server = new webpackDevServer(compiler, finalOptions);
  server.listen(port, host, (err) => {
    if (err) {
      console.error('ERROR:', err);
      return;
    }
    const protocol = https ? 'https' : 'http';
    const loopback = host === '0.0.0.0' ? 'localhost' : host;
    const localIP = getLocalIp();
    console.log(chalk.bgGreen(chalk.black(' DONE ')) + chalk.green(' success !'));
    console.log('Project Running at:');
    console.log(`    Local: ${chalk.cyan(`${protocol}://${loopback}:${port}/`)}`);
    if (localIP) {
      console.log(`      LAN: ${chalk.cyan(`${protocol}://${localIP}:${port}/`)}`);
    }
  });
  return server;
}

function getLocalIp() {
  const interfaces = os.networkInterfaces().WLAN;
  if (!interfaces) {
    return null;
  }
  const locals = interfaces.filter((i) => i.family === 'IPv4').filter((i) => /^(172|192)/.test(i.address));

  if (locals.length) {
    return locals[0].address;
  }
  return null;
}
module.exports = { ans, build, start };
