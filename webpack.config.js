const path = require('path')
const glob = require('glob');
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const utils = require('./build/utils')
const config = require('./config')
const VueLoaderPlugin  = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const PurifyCSSPlugin = require('purifycss-webpack');
// const htmlLoader = require('html-loader');
// const DashboardPlugin = require('webpack-dashboard/plugin')
// 用于区分线上环境还是开发环境 true 为线上环境，false 为开发环境
const isProd = process.env.NODE_ENV === 'production';

// 获取绝对路径
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

const createLintingRule = () => ({
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  // include: [resolve('src'), resolve('test')],
  exclude: /node_modules/,
  options: {
    formatter: require('eslint-friendly-formatter'),
    emitWarning: !config.dev.showEslintErrorsInOverlay
  }
})
console.log('isProd', isProd)

module.exports = {
  devtool: 'source-map',
  entry: './src/main.js',
  output: {
    // path: path.resolve(__dirname, './dist'),
    path: config.build.assetsRoot,
    filename: '[name].js',
    chunkFilename: 'js/[id].[chunkhash:5].min.js',
    publicPath: isProd ? config.build.assetsPublicPath : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    // 别名，方便引用模块，例如有了别名之后，
    // import Vue from 'vue/dist/vue.common.js'可以写成 import Vue from 'vue
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    }
  },
  module: {
    rules: [
    ...(config.dev.useEslint ? [createLintingRule()] : []),
    {
      test: /\.vue$/,
      loader: 'vue-loader'
    },
    {
      test: /\.(sa|sc|c|le)ss$/,
      use: [
        !isProd ? 'style-loader' : MiniCssExtractPlugin.loader,
        'css-loader',
        'postcss-loader',
        'sass-loader',
        // 'less-loader'
      ]
    },
    {
      test: /\.js$/,
      use: [{
        loader: 'babel-loader',
        options: {
          presets: ['es2015']
        }
      }],
      exclude: /node_modules/
    },
    {
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        // 小于10K的图片转成base64编码的dataURL字符串写到代码中
        limit: 10000,
        // 其他的图片转移到静态资源文件夹
        name: utils.assetsPath('img/[name].[hash:7].[ext]')
      }
    },
    {
      test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: utils.assetsPath('media/[name].[hash:7].[ext]')
      }
    },
    {// 对字体资源文件使用url-loader
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
      }
    },
  ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html'), // 配置文件模板
      minify: {
          minifyCSS: true,
          minifyJS: true,
          collapseWhitespace: true, // 删除空白符与换行符
          removeAttributeQuotes: true // 移除HTML中的属性引号
      }
    }),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: utils.assetsPath('css/[name].[contenthash:8].css'),
      allChunks: true
    }),
    new PurifyCSSPlugin({
      paths: glob.sync(path.join(__dirname, 'src/*.vue')),
    })
    // new DashboardPlugin()
  ]
}