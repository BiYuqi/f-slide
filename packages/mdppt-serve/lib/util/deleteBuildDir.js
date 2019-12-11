const rimraf = require('rimraf')
const chalk = require('chalk')
const { findExistSync } = require('mdppt-utils')

module.exports = api => {
  if (findExistSync(api.context, api.config.outputDir)) {
    rimraf(api.resolveCwd(api.context, api.config.outputDir), err => {
      if (err) {
        console.log(chalk.warning(`Delete ${api.config.outputDir} faild.`))
      }
      console.log(chalk.greenBright(`Successed delete the ${api.config.outputDir} diratory.\n`))
    })
  }
}
