const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const utils = require('./build/utils')
const config = require('./config')
// const DashboardPlugin = require('webpack-dashboard/plugin')
// 用于区分线上环境还是开发环境 true 为线上环境，false 为开发环境
const isProd = process.env.NODE_ENV === 'production';

// 获取绝对路径
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}
console.log('isProd', isProd)
/* console.log('env', config.build.assetsRoot) */

module.exports = {
  // mode: 'development',
  devtool: 'source-map',
  entry: './src/main.js',
  output: {
    // path: path.resolve(__dirname, './dist'),
    path: config.build.assetsRoot,
    filename: '[name].js',
    // chunkFilename: 'js/[name].[chunkhash:5].min.js'
    publicPath: isProd ? config.build.assetsPublicPath : config.dev.assetsPublicPath
    // publicPath: '/dist/'
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
      /* {
      test: /\.js$/,
      use: [
          'babel-loader',
      ],
      include: [
        path.resolve(__dirname, "src")
      ],
      //exclude是定义不希望babel处理的文件  
      exclude: '/node_modules/'
      // exclude: path.resolve(__dirname, "node_modules")
    },{
      test: /\.css$/,
      use: [
          'style-loader',
          'css-loader',
      ]
    },{
      test: /\.less$/,
      use: [
          'style-loader',
          'css-loader',
          'less-loader'
      ]
    },{
      test: /\.scss$/,
      use: [
          'style-loader',
          'css-loader',
          'sass-loader'
      ]
    },{
      test: /\.(png|jpg|gif)$/,
      use: [{
          loader: 'url-loader',
          //使用插件时带上的参数
          options: {
              limit: 8192,
              name: 'img/[name].[hash:4].[ext]',
          }
      }]
    },{
      test: /\.html$/,
      use: [
          'html-loader'
      ]
    } */
    {
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader',
      ]
    },
    {
      test: /\.less$/,
      use: [
          'style-loader',
          'css-loader',
          'less-loader'
      ]
    },
    {
      test: /\.scss$/,
      use: [
          'style-loader',
          'css-loader',
          'sass-loader'
      ]
    },
    {// 对src和test文件夹下的.js文件使用babel-loader将es6+的代码转成es5
      test: /\.js$/,
      loader: 'babel-loader',
      include: [resolve('src'), resolve('test')],
      exclude: '/node_modules/'
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
    }
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
    // new DashboardPlugin()
  ]
}