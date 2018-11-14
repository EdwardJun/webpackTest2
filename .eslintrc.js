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