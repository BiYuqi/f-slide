const merge = require('webpack-merge')
const webpack = require('webpack')
const baseWebpackConfig = require('./base')
const resolveCwd = require('../util/resolveCwd')

module.exports = (api) => merge(baseWebpackConfig(api), {
  mode: 'development',
  devtool: 'inline-source-map',
  output: {
    path: resolveCwd(api.context, 'dist'),
    publicPath: '/',
    filename: '[name].js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
})