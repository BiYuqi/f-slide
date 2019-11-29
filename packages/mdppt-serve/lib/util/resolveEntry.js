const chalk = require('chalk')
const path = require('path')
const fs = require('fs-extra')
const pathExistsSync = require('./pathExistsSync')

const resolveEntry = (entry, cmd) => {
  const context = process.cwd()
  entry = entry || pathExistsSync(context, ['index.md', 'default.md', 'README.md', 'readme.md'])

  if (!entry) {
    console.log(chalk.red(`Faild to found the entry file in ${chalk.yellow(context)}`))
    process.exit(1)
  }

  if (!fs.pathExistsSync(path.resolve(context, entry))) {
    console.log(chalk.red(`Faild to found the entry file in ${chalk.yellow(context)}`))
    process.exit(1)
  }

  return {
    context,
    entry
  }
}

module.exports = resolveEntry