const WebpackBar = require('webpackbar')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const htmlPluginConfig = require('../util/htmlPluginConfig')
const getBabelConfig = require('../common/getBabelConfig')
const getMdConfig = require('../common/getMdConfig')
const getStyleConfig = require('../common/getStyleConfig')
const getCommonConfig = require('../common/getCommonConfig')

module.exports = api => ({
  entry: {
    [api.config.appName]: api.resolveLocal('../../src/index.js')
  },
  module: {
    rules: [getBabelConfig(api), getMdConfig(api), getStyleConfig(api), ...getCommonConfig(api)]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.md'],
    modules: ['node_modules', api.resolveLocal('../../node_modules')],
    symlinks: false
  },
  resolveLoader: {
    modules: ['node_modules', api.resolveLocal('../../node_modules')]
  },
  plugins: [
    ...htmlPluginConfig(api),
    new WebpackBar({
      name: '🚚 MDPPT',
      basic: false
    }),
    new FriendlyErrorsWebpackPlugin()
  ]
})
