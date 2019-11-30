const jsYaml = require('js-yaml')
const codeStyleValidate = require('./codeStyleValidate')
const defaultConfig = require('../default')

module.exports = content => {
  const parseRule = /---([\s\S]+?)---/
  const matchYml = content.match(parseRule)
  const parsedYml = jsYaml.load(matchYml[1])

  if (!codeStyleValidate.includes(parsedYml.codeStyle)) {
    parsedYml.codeStyle = defaultConfig.codeStyle
  }

  return parsedYml
}
