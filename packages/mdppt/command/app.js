const fs = require('fs')
const path = require('path')
const { logger } = require('@mdppt/utils')
const { verifyFileNmae } = require('./validation')

const app = async name => {
  const { isValid, message } = verifyFileNmae(name)
  if (!isValid) {
    console.log(message)
    process.exit(1)
  }

  const template = fs.readFileSync(path.resolve(__dirname, './template.md')).toString()
  fs.writeFileSync(path.resolve(process.cwd(), name), template, 'utf8')
  logger.green(`File ${name} has been created.`)
  logger.green(`You can run ${logger.cyan.raw(`mdppt serve ${name}`)} to start serve.`)
}

module.exports = app
