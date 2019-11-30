const fs = require('fs')
const path = require('path')
const handlebars = require('handlebars')
const ymlParser = require('./lib/yml-parser')
const mdParser = require('./lib/markdown-parser')
const defaultConfig = require('./default')

const template = fs.readFileSync(path.resolve(__dirname, './template/index.hbs')).toString()
module.exports = function(content) {
  const globalSetting = { ...defaultConfig, ...ymlParser(content) }
  const data = {
    content: mdParser(content)
  }
  return handlebars.compile(template)({ ...globalSetting, ...data })
}
