const fs = require('fs')
const path = require('path')
const hljs = require('highlight.js')
const handlebars = require('handlebars')
const ymlParser = require('./lib/ymlParser')
const defaultConfig = require('./default')

const markdown = require('markdown-it')({
  html: true,
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value
      } catch (__) {}
    }

    return ''
  }
})
// const getSliderRule = /<slide([^>]*?)>([\s\S]+?)<\/slide>/ig
// const getAttrs = /([\w:]+)="([^"]+)"/ig

const template = fs.readFileSync(path.resolve(__dirname, './template/index.hbs')).toString()
module.exports = function (content) {
  const result = markdown.render(content)
  const globalSetting = { ...defaultConfig, ...ymlParser(content)}
  const data = {
    content: result
  }
  return handlebars.compile(template)({ ...globalSetting, ...data})
}