const fs = require('fs')
const path = require('path')
const handlebars = require('handlebars')
const markdownIt = require('markdown-it')
const markdownItAttrs = require('markdown-it-attrs')
const prism = require('markdown-it-prism')
const parseYml = require('./lib/yml-parser/parseYml')
const parseMarkdown = require('./lib')
const defaultConfig = require('./default')

const md = markdownIt()

md.use(prism).use(markdownItAttrs)

const template = fs.readFileSync(path.resolve(__dirname, './template/index.hbs')).toString()

module.exports = function(content) {
  const globalSetting = { ...defaultConfig, ...parseYml(content) }
  const { html } = parseMarkdown(md, content)
  const data = {
    content: html
  }
  return handlebars.compile(template)({ ...globalSetting, ...data })
}
