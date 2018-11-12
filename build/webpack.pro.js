const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const baseConfig = require('../webpack.config')
const config = require('../config/index')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const utils = require('./utils')

// process.env.NODE_ENV = 'production'
const prodWebpackConfig = merge(baseConfig, {
  module: {
    rules: [
    ]
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
    new webpack.DefinePlugin({
      'process.env': {
          'NODE_ENV': JSON.stringify("production")
      }
    })
  ]
})

module.exports = prodWebpackConfig