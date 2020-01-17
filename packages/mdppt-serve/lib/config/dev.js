const merge = require('webpack-merge')
const webpack = require('webpack')
const baseWebpackConfig = require('./base')

module.exports = api =>
  merge(baseWebpackConfig(api), {
    mode: 'development',
    devtool: 'inline-source-map',
    output: {
      publicPath: '/',
      path: api.resolveCwd(api.context, api.config.outputDir),
      filename: '[name].js'
    },
    plugins: [new webpack.NamedModulesPlugin(), new webpack.HotModuleReplacementPlugin()]
  })
