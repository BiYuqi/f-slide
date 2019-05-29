const fs = require('fs')
const yaml = require('js-yaml')
const MarkdownIt = require('markdown-it')
const md = new MarkdownIt()

const getYamlRule = /---([\s\S]+?)---/
const getSliderRule = /<slide([^>]*?)>([\s\S]+?)<\/slide>/ig

try {
  const mds = fs.readFileSync('./test.md', 'utf8').toString()
  const ymls = mds.match(getYamlRule)
  const ymlDoc = yaml.load(ymls[1])
  let m
  const slideRes = []
  while (m = getSliderRule.exec(mds)) {
    const slideItem = {
      attrs: m[1],
      md: m[2]
    }
    slideRes.push(slideItem)
  }
  console.log(ymlDoc)
  console.log(slideRes)
} catch (e) {
  console.log(e);
}