const fs = require('fs')
const path = require('path')
const handlebars = require('handlebars')
const markdownIt = require('markdown-it')
const markdownItAttrs = require('markdown-it-attrs')
const prism = require('markdown-it-prism')
const parseYml = require('./lib/parseYml')
const mdParser = require('./lib/markdown')
const defaultConfig = require('./default')

const md = markdownIt({
  html: true,
  linkify: true,
  typographer: true
}).enable('image')

md.use(prism).use(markdownItAttrs)

const template = fs.readFileSync(path.resolve(__dirname, './template/index.hbs')).toString()

module.exports = function(content) {
  const globalSetting = { ...defaultConfig, ...parseYml(content) }
  const { html } = mdParser(md, content)
  const data = {
    content: html
  }
  return handlebars.compile(template)({ ...globalSetting, ...data })
}
