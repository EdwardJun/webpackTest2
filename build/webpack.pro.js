const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const baseConfig = require('../webpack.config')
const config = require('../config/index')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'); //压缩css插件
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const utils = require('./utils')

// process.env.NODE_ENV = 'production'
const prodWebpackConfig = merge(baseConfig, {
  mode: 'production',
  module: {
    rules: [
    ]
  },
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[name].[chunkhash].js')
  },
  plugins: [
    new CleanWebpackPlugin(['dist'], {
      root: path.resolve(__dirname, '../')
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.build.assetsSubDirectory,
        ignore: ['.*']
      }
    ]),
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          warnings: false
        }
      },
      sourceMap: config.build.productionSourceMap,
      parallel: true
    }),
    /* new ParallelUglifyPlugin({
      sourceMap: true
      // uglifyJS: {
      //   compress: {
      //     // 是否在UglifyJS删除没有用到的代码时输出警告信息，默认为输出，可以设置为false关闭这些作用不大的警告
      //     warnings: false
      //   }
      // }
    }), */
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify("production")
      }
    }),
    new OptimizeCssAssetsPlugin(),
    new webpack.optimize.SplitChunksPlugin({
      chunks: "initial",
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 3,
      maxInitialRequests: 3,
      name: true,
      cacheGroups: {
        vendor: { // split `node_modules`目录下被打包的代码到 vendor.js
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          priority: -10,
          enforce: true
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }),
    new ProgressBarPlugin()
  ]
})

module.exports = prodWebpackConfig