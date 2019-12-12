const rimraf = require('rimraf')
const { findExistSync, logger } = require('@mdppt/utils')

module.exports = api => {
  if (findExistSync(api.context, api.config.outputDir)) {
    rimraf(api.resolveCwd(api.context, api.config.outputDir), err => {
      if (err) {
        logger.warning(`Delete ${api.config.outputDir} faild.`)
      }
      logger.greenBright(`Successed delete the ${api.config.outputDir} diratory.`)
    })
  }
}
