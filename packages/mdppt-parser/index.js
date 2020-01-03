const fs = require('fs')
const path = require('path')
const handlebars = require('handlebars')
const parseYml = require('./lib/yml-parser/parseYml')
const parseMarkdown = require('./lib')
const defaultConfig = require('./default')

const template = fs.readFileSync(path.resolve(__dirname, './template/index.hbs')).toString()

module.exports = function(content) {
  const globalSetting = { ...defaultConfig, ...parseYml(content) }
  const { html } = parseMarkdown(content)
  const data = {
    content: html
  }
  return handlebars.compile(template)({ ...globalSetting, ...data })
}
