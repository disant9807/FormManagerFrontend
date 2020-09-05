var webpack = require('webpack')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
  configureWebpack: {
    plugins: [
      // new BundleAnalyzerPlugin(),
      new webpack.ProvidePlugin({
        /*
        * Проблема с drag and drop картинок.
        * Вадим использовал это решение для исправления ошибки.
        * */
        'window.Quill': 'quill/dist/quill.js',
        'Quill': 'quill/dist/quill.js'
      })
    ],
    externals: {
      moment: 'moment'
    }
  },
  chainWebpack: (config) => {
    config.module.rules.delete('eslint')
    config.plugins.delete('prefetch')
  },
  css: {
    loaderOptions: {
      sass: {
        data: '@import "~@/assets/sass/_variables.scss";'
      }
    }
  },
  assetsDir: './static/'
}
