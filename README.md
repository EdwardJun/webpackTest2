# webpack

> webpack 4.0 搭建

 1. 命令搭建
       ① npm init
       ② cnpm install wepack  wepack-cli

  2. 项目文件结构

       
3. 配置 package.json
  在 script 里添加上这两句话
  "dev": "webpack-dev-server --inline --progress --config build/webpack.dev.js --mode development",
  "build": "cross-env NODE_ENV=production webpack --config build/webpack.pro.js --mode production"

4. 配置 webpack.config.js
  在 webpack4 中，会默认寻找 webpack.config.js 这个文件，所以把开发环境与生产环境共同的配置就放在这个文件里
  ① 配置 resolve
      |- 配置文件扩展名
      |- 配置别名路径
  ② 配置 module
      |- 因为项目集成 vue，所以配置 vue-loader
      |- 配置 style-loader | css-loader | postcss-loader | sass-loader
         webpack4 中抽取 css 文件需要使用 MiniCssExtractPlugin
      |- 配置 babel-loader
      |- 配置 url-loader
  ③ 配置 plugins
     |- 使用 HtmlWebpackPlugin 插件，自动生成 .html 文件
     |- new VueLoaderPlugin()，因为 webpack4 中需要引入如下才能使用 vue-loader
        const VueLoaderPlugin  = require('vue-loader/lib/plugin')
     |- new MiniCssExtractPlugin()  设置抽取的 css 文件输出地址

  5. 区分开发环境与生产环境
    // 用于区分线上环境还是开发环境 true 为线上环境，false 为开发环境
    const isProd = process.env.NODE_ENV === 'production';

  6. 获取绝对路径
    // 获取绝对路径
    function resolve (dir) {
       return path.join(__dirname, '..', dir)
    }

  7. 配置开发环境
    ① 配置 devServer （配置端口等一些信息）
    ② 配置 plugins
         new webpack.HotModuleReplacementPlugin()  // 热模块刷新，不会刷新浏览器
    ③ 

  8. 集成 vue 
    案例： https://segmentfault.com/a/1190000015725670

  9. 使用 postcss.config.js
       官方文档： https://github.com/michael-ciniawsky/postcss-load-config#stringifier
       案例： https://blog.csdn.net/keader01/article/details/73029482
       案例： https://www.cnblogs.com/zaking/p/8598289.html
       需要在 package.json 加上浏览器的配置
       "browserslist": [
       "> 1%",
       "last 2 versions",
       "not ie <= 8"
    ]
      也就是全球浏览器使用率大于1%，最新的两个版本并且是ie8以上的浏览器。

  10. webpack4--提取css到单独文件并且压缩css
       案例： https://blog.csdn.net/qq_34035425/article/details/83062735

  11. webpack4  SplitChunksPlugin 代码拆分
      webpack 文档： https://webpack.docschina.org/plugins/split-chunks-plugin/
      案例： https://www.cnblogs.com/ufex/p/8758792.html
      案例： https://github.com/iuap-design/blog/issues/262
      案例： https://blog.csdn.net/qq_26733915/article/details/79458533

  12. 编译后的文件防止缓存解决方案( assets-webpack-plugin)
     案例： https://blog.csdn.net/beiweideqidaozhe/article/details/62048290

  13. 集成 eslint
     案例： https://www.jianshu.com/p/33597b663481
     案例： https://github.com/ecmadao/Coding-Guide/blob/master/Notes/JavaScript/Eslint%E9%85%8D%E7%BD%AE%E8%AE%B0%E5%BD%95(with%20webpack).md
     案例： https://www.cnblogs.com/daniller/p/eslint.html     

需要如下插件


① 在项目根目录下新增一个文件 .eslintrc.js，内容如下
module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  extends: 'standard',
  plugins: [
    'html',
    "standard",
    "promise"
  ],
  settings: {
    'html/html-extensions': ['.html', '.vue'],
    'html/indent': '+2'
  },
  // add your custom rules here
  rules: {
    'generator-star-spacing': 'off',
    'indent': [2],
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  }
}

注： 需要加上如下配置，不然识别不了 .vue 文件
settings: {
    'html/html-extensions': ['.html', '.vue'],
    'html/indent': '+2',
},

② 在 webpack.config.js 下配置 eslint-loader
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
然后在 module 进行配置使用

config.dev.useEslint 为是否使用 eslint
