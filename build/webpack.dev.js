const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('../webpack.config')
const config = require('../config/index')
// 更友好的提示插件
const FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin");
// 获取一个可用的 port 的插件
const portfinder = require("portfinder");

const devWebpackConfig = merge(baseConfig, {
  mode: 'development',
  devServer: {
    // host: 'localhost',
    // port: 8083,
    host: config.dev.host,
    port: config.dev.port,
    hot: true,
    overlay: true,
    stats: "errors-only",
    clientLogLevel: 'error',
    watchOptions: {
      // 排除一些文件监听，这有利于提高性能
      // 这里排除了 node_modules 文件夹的监听
      ignored: /node_modules/
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = config.dev.port
  portfinder.getPort((err, port) => {
    if (err) reject(err)
    else {
      devWebpackConfig.devServer.port = port
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        clearConsole: true,
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: () => {
          console.log('编译失败')
        }
      }))
      resolve(devWebpackConfig)
    }
  })
})

// module.exports = webpackConfig