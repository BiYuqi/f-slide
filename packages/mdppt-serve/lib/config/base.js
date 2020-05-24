const WebpackBar = require('webpackbar')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const { findExistSync } = require('@mdppt/utils')
const htmlPluginConfig = require('../util/htmlPluginConfig')
const getBabelConfig = require('../common/getBabelConfig')
const getMdConfig = require('../common/getMdConfig')
const getStyleConfig = require('../common/getStyleConfig')
const getCommonConfig = require('../common/getCommonConfig')

module.exports = api => {
  const hasAssets = findExistSync(api.context, api.config.assets)
  const plugins = [
    ...htmlPluginConfig(api),
      new FriendlyErrorsWebpackPlugin()
  ]
  if (hasAssets) {
    plugins.push(
      new CopyPlugin({
        patterns: [
          {
            from: api.context + `/${api.config.assets}`,
            to: api.context + `/${api.config.outputDir}`,
            toType: 'dir'
          }
        ]
      })
    )
  }
  return {
    entry: {
      [api.config.appName]: api.resolveLocal('../../src/index.js')
    },
    context: api.context,
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
    plugins
  }
}
