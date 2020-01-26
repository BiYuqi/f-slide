const fs = require('fs')
const path = require('path')
const loaderUtils = require('loader-utils')
const handlebars = require('handlebars')
const parseYml = require('./lib/yml-parser/parseYml')
const parseMarkdown = require('./lib')
const defaultConfig = require('./default')

const template = fs.readFileSync(path.resolve(__dirname, './template/index.hbs')).toString()

module.exports = function(content) {
  const { navigationFolder } = loaderUtils.getOptions(this)
  const globalSetting = { ...defaultConfig, ...parseYml(content) }
  const { html } = parseMarkdown({ content })

  const data = {
    content: html,
    navigationFolder: JSON.stringify(navigationFolder[0]) || null
  }
  return handlebars.compile(template)({ ...globalSetting, ...data })
}
