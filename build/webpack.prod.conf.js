const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const WebpackBundleAnalyzer = require('webpack-bundle-analyzer')
const EnvConfig = require('./env.config')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin')
module.exports = {
  mode: 'production',
  entry: {
    index: path.resolve(__dirname, '../src/pages/index/index.js'),
    dashboard: path.resolve(__dirname, '../src/pages/dashboard/index.js'),
  },
  output: {
    filename: 'js/[name].[hash].js',
    path: path.resolve(__dirname, '../dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                useBuiltIns: 'usage',
                corejs: {
                  version: 3,
                },
                targets: {
                  chrome: '60',
                  firefox: '60',
                  ie: '9',
                  safari: '10',
                  edge: '17',
                },
              },
            ],
          ],
        },
      },
    ],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          name: 'commons',
          chunks: 'initial',
          minChunks: 2,
        },
      },
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash].css',
    }),

    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      'process.env.BASE_URL': JSON.stringify(EnvConfig.PROD_URL),
    }),
    new HtmlWebpackPlugin({
      title: '登陆',
      filename: 'index.html',
      template: path.resolve(__dirname, '../src/pages/index/index.html'),
      chunks: ['index', 'petiteVue'],
      hash: true,
      minify: {
        collapseWhitespace: true,
        removeComments: true,
      },
    }),
    new HtmlWebpackPlugin({
      title: '远程控制',
      filename: 'dashboard.html',
      template: path.resolve(__dirname, '../src/pages/dashboard/index.html'),
      chunks: ['dashboard', 'petiteVue'],
      hash: true,
      minify: {
        collapseWhitespace: true,
        removeComments: true,
      },
    }),
  ],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src'),
    },
    extensions: ['.ts', '.js', '.json'],
  },
}
