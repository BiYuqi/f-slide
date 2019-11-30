const fs = require('fs')
const path = require('path')
const handlebars = require('handlebars')
const ymlParser = require('./lib/ymlParser')
const mdParser = require('./lib/markdownParser')
const defaultConfig = require('./default')

const template = fs.readFileSync(path.resolve(__dirname, './template/index.hbs')).toString()
module.exports = function(content) {
  const globalSetting = { ...defaultConfig, ...ymlParser(content) }
  const { html, slideCount} = mdParser(content)
  const data = {
    content: html
  }
  return handlebars.compile(template)({ ...globalSetting, ...data })
}
