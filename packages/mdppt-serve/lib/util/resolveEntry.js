const { findExistSync, findExisting, cwd, logger } = require('@mdppt/utils')

const resolveEntry = (entry, cmd) => {
  const context = cwd()
  entry = entry || findExisting(context, ['index.md', 'default.md', 'README.md', 'readme.md'])

  if (!entry) {
    logger.red(`Faild to found the entry file in ${logger.yellow.raw(context)}`)
    process.exit(1)
  }

  if (!findExistSync(context, entry)) {
    logger.red(`Faild to parse the markdown file.`)
    process.exit(1)
  }

  return {
    context,
    entry
  }
}

module.exports = resolveEntry
