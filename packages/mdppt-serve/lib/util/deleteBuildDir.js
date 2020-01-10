const rimraf = require('rimraf')
const { findExistSync, logger } = require('@mdppt/utils')

module.exports = api => {
  if (!api.config.outputDir) {
    logger.yellowBright(`Could not find the directory that you provide. Please check again!`)
    return
  }
  if (findExistSync(api.context, api.config.outputDir)) {
    rimraf(api.resolveCwd(api.context, api.config.outputDir), err => {
      if (err) {
        logger.yellowBright(`Delete ${api.config.outputDir} faild.`)
      }
      logger.greenBright(`\n🗑 Success Removed The Old ${api.config.outputDir} Diratory.\n`)
    })
  }
}
