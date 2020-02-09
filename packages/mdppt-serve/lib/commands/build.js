const webpack = require('webpack')
const { logger, signature, buildMsg } = require('@mdppt/utils')
const prodConfig = require('../config/build')
const deleteBuildDir = require('../util/deleteBuildDir')
const outputAssets = require('../util/outputAssets')

module.exports = api => {
  api.config.mode = 'production'

  // Delete the old build dir before a new build start.
  deleteBuildDir(api)

  webpack(prodConfig(api), async (err, stats) => {
    if (err) {
      throw err
    }

    const info = stats.toJson()

    if (stats.hasErrors()) {
      logger.red(`Mdppt project got build error. ${info.errors}`)
    }

    if (stats.hasWarnings()) {
      logger.yellow(info.warnings)
    }

    process.stdout.write(
      stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
      }) + '\n\n'
    )

    logger.cyan(
      await signature({
        text: 'BUILD  SUCCESS'
      })
    )
    buildMsg({ api })

    if (api.config.assets) {
      outputAssets({ assets: info.assets, api })
    }
  })
}
