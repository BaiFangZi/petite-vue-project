const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const EnvConfig = require('./env.config')
const webpackBaseConfig = require('./webpack.base.conf')
const { merge } = require('webpack-merge')
// console.log(merge)

module.exports = merge(webpackBaseConfig, {
  mode: 'development',

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      'process.env.BASE_URL': JSON.stringify(EnvConfig.DEV_URL),
    }),
  ],
  devServer: {
    // hot: true,
    disableHostCheck: true,
    inline: true,
    port: 4001,
    open: true,
    openPage: 'index.html',
    contentBase: [
      path.resolve(__dirname, '../src/pages/index'),
      path.resolve(__dirname, '../src/dashboard/index'),
    ],
    proxy: {
      '/dev': {
        target: EnvConfig.DEV_URL,
        changeOrigin: true,
        pathRewrite: {
          '^/dev': '',
        },
        logLevel: 'debug',
      },
    },
  },
})
