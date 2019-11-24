const path = require('path')
const merge = require('webpack-merge')
const webpack = require('webpack')
const baseWebpackConfig = require('./base')

const webpackConfig = merge(baseWebpackConfig, {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: {
    main: path.resolve(__dirname, '../lib/index.js')
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
    filename: '[name].js'
  },
  devServer: {
    contentBase: path.resolve(__dirname, '../dist/index.html'),
    publicPath: '/',
    compress: true,
    noInfo: true,
    disableHostCheck: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
})

module.exports = webpackConfig
