const chalk = require('chalk')
const { findExistSync, findExisting, cwd } = require('mdppt-utils')

const resolveEntry = (entry, cmd) => {
  const context = cwd()
  entry = entry || findExisting(context, ['index.md', 'default.md', 'README.md', 'readme.md'])

  if (!entry) {
    console.log(chalk.red(`Faild to found the entry file in ${chalk.yellow(context)}`))
    process.exit(1)
  }

  if (!findExistSync(context, entry)) {
    console.log(chalk.red(`Faild to parse the markdown file.`))
    process.exit(1)
  }

  return {
    context,
    entry
  }
}

module.exports = resolveEntry
