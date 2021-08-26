const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const EnvConfig = require('./env.config')
const webpackBaseConfig = require('./webpack.base.conf')
const { merge } = require('webpack-merge')
module.exports = merge(webpackBaseConfig, {
  mode: 'production',

  plugins: [
    new CleanWebpackPlugin(),
    new BundleAnalyzerPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      'process.env.BASE_URL': JSON.stringify(EnvConfig.PROD_URL),
    }),
  ],
})
