const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml')
const handlebars = require('handlebars')
const markdown = require('markdown-it')();
// const getYamlRule = /---([\s\S]+?)---/
// const getSliderRule = /<slide([^>]*?)>([\s\S]+?)<\/slide>/ig
// const getAttrs = /([\w:]+)="([^"]+)"/ig

const template = fs.readFileSync(path.resolve(__dirname, './template/index.hbs')).toString()
module.exports = function (content) {
  const result = markdown.render(content)

  const data = {
    title: 'MDPPT',
    author: 'BiYuqi',
    content: result
  }
  return handlebars.compile(template)(data)
}