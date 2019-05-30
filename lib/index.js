const fs = require('fs')
const yaml = require('js-yaml')
const MarkdownIt = require('markdown-it')
const md = new MarkdownIt()

const getYamlRule = /---([\s\S]+?)---/
const getSliderRule = /<slide([^>]*?)>([\s\S]+?)<\/slide>/ig
const getAttrs = /([\w:]+)="([^"]+)"/ig

function parseAttr(attr) {
  if (!attr) {
    return {}
  }
  let m, res = {}
  while (m = getAttrs.exec(attr)) {
    res[m[1]] = m[2]
  }
  console.log(res)
  return res
}

try {
  const mds = fs.readFileSync('./test.md', 'utf8').toString()
  const ymls = mds.match(getYamlRule)
  const ymlDoc = yaml.load(ymls[1])
  let m
  const slideRes = []
  while (m = getSliderRule.exec(mds)) {
    const slideItem = {
      attrs: parseAttr(m[1]),
      md: m[2]
    }
    slideRes.push(slideItem)
  }
  console.log(slideRes)
} catch (e) {
  console.log(e);
}