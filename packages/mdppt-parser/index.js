const fs = require('fs')
const path = require('path')
const handlebars = require('handlebars')
const parseYml = require('./lib/parseYml')
const mdParser = require('./lib/markdown')
const defaultConfig = require('./default')

const template = fs.readFileSync(path.resolve(__dirname, './template/index.hbs')).toString()

module.exports = function(content) {
  const globalSetting = { ...defaultConfig, ...parseYml(content) }
  const { html } = mdParser(content)
  const data = {
    content: html
  }
  return handlebars.compile(template)({ ...globalSetting, ...data })
}
