const fs = require('fs')
const util = require('util')
const { logger } = require('@mdppt/utils')

const writeFileSync = util.promisify(fs.writeFileSync)

module.exports = async ({ assets, api }) => {
  const mapAssets = assets
    .filter(({ name }) => !/favicon/.test(name))
    .map(({ name, size }) => {
      return {
        name,
        size
      }
    })

  const writeToLocal = await writeFileSync(
    `${process.cwd()}/${api.config.outputDir}/assets.json`,
    JSON.stringify(mapAssets)
  )

  if (writeToLocal) {
    logger.green('write assets success')
  }
}
