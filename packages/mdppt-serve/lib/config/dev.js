const merge = require('webpack-merge')
const webpack = require('webpack')
const baseWebpackConfig = require('./base')
const resolveCwd = require('../util/resolveCwd')

const webpackConfig = merge(baseWebpackConfig, {
  mode: 'development',
  devtool: 'inline-source-map',
  output: {
    path: resolveCwd('dist'),
    publicPath: '/',
    filename: '[name].js'
  },
  devServer: {
    contentBase: resolveCwd('dist/index.html'),
    open: true,
    publicPath: '/',
    compress: true,
    noInfo: true,
    hot: true,
    disableHostCheck: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
})

module.exports = webpackConfig
