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
const HtmlWebpackPlugin = require('html-webpack-plugin')

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
  optimization: {
    //分隔代码块
    splitChunks: {
      cacheGroups: { // 缓存组
        common: { // 公共的模块，多页面应用才需要抽离次模块
          chunks: 'initial', // 从入口开始抽取
          minSize: 0,
          minChunks: 2
        },
        vendor: {
          priority: 1,
          test: /node_modules/,
          chunks: 'initial', // 从入口开始抽取
          minSize: 0,
          minChunks: 2
        }
      }
    }
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
    /* new webpack.optimize.SplitChunksPlugin({
      chunks: "initial",
      minSize: 0,
      minChunks: 2,
      maxAsyncRequests: 3,
      maxInitialRequests: 3,
      name: true,
      cacheGroups: {
        vendor: { // split `node_modules`目录下被打包的代码到 vendor.js
          chunks: 'initial', // 从入口开始抽取
          test: /[\\/]node_modules[\\/]/,
          // name: 'vendor',
          priority: 1,
          // enforce: true
        },
        common: {
          chunks: 'initial', // 从入口开始抽取
          // minChunks: 2,
          // priority: -20,
          // reuseExistingChunk: true
        }
      }
    }), */
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../src/page/index/index.html'), // 配置文件模板
      filename: config.build.index,
      inject: true,
      minify: {
          // minifyCSS: true,
          // minifyJS: true,
          removeComments: true,
          collapseWhitespace: true, // 删除空白符与换行符
          removeAttributeQuotes: true // 移除HTML中的属性引号
      },
      chunksSortMode: 'dependency',
      chunks: ['common', 'vendor', 'app'],
      excludeChunks: ['other']
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../src/page/other/other.html'), // 配置文件模板
      filename: config.build.other,
      inject: true,
      minify: {
          // minifyCSS: true,
          // minifyJS: true,
          removeComments: true,
          collapseWhitespace: true, // 删除空白符与换行符
          removeAttributeQuotes: true // 移除HTML中的属性引号
      },
      chunksSortMode: 'dependency',
      chunks: ['common', 'vendor', 'other'],
      excludeChunks: ['app']
    }),
    new ProgressBarPlugin()
  ]
})

module.exports = prodWebpackConfig