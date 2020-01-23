const fs = require('fs')
const path = require('path')
const handlebars = require('handlebars')
const inquirer = require('inquirer')
const { logger } = require('@mdppt/utils')
const { verifyFileName } = require('./validation')

const app = async name => {
  inquirer
    .prompt([
      {
        name: 'name',
        message: 'Please input file name and end with .md',
        validate: verifyFileName
      },
      {
        name: 'title',
        message: 'Please input page title'
      },
      {
        name: 'meta',
        message: 'Please input page meta description'
      }
    ])
    .then(answer => {
      const templateContent = fs.readFileSync(path.resolve(__dirname, './template.hbs')).toString()
      const result = handlebars.compile(templateContent)(answer)
      fs.writeFileSync(answer.name, result)
      logger.green('\n')
      logger.green(`🎉  File ${answer.name} has been created.`)
      logger.green(`🚀  You can run ${logger.cyan.raw(`mdppt serve ${answer.name}`)} to start serve.`)
    })
}

module.exports = app
