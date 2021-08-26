const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const EnvConfig = require('./env.config')

module.exports = {
  mode: 'development',

  entry: {
    index: path.resolve(__dirname, '../src/pages/index/index.js'),
    dashboard: path.resolve(__dirname, '../src/pages/dashboard/index.js'),
  },

  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, '../dist'),
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
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
        common: {
          name: 'commons',
          chunks: 'all',
          minChunks: 2,
        },
      },
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: '登陆',
      filename: 'index.html',
      template: path.resolve(__dirname, '../src/pages/index/index.html'),
      // chunks: ['index', 'petiteVue'],
      chunks: ['index'],
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

      chunks: ['dashboard'],
      hash: true,
      minify: {
        collapseWhitespace: true,
        removeComments: true,
      },
    }),

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
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src'),
    },
    extensions: ['.ts', '.js', '.json'],
  },
}
