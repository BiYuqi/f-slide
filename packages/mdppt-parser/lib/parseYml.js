const jsYaml = require('js-yaml')
const codeStyleValidate = require('./codeStyleValidate')
const defaultConfig = require('../default')

module.exports = content => {
  const parseRule = /---([\s\S]+?)---/
  const matchYml = content.match(parseRule)

  if (!matchYml) {
    return {}
  }
  const parsedYml = jsYaml.load(matchYml[1])
  const isPrism = parsedYml.codeStyle === 'prism'

  if (!codeStyleValidate.includes(parsedYml.codeStyle)) {
    parsedYml.codeStyle = defaultConfig.codeStyle
  }
  parsedYml.codeStyle = isPrism ? 'prism' : `prism-${parsedYml.codeStyle}`

  return parsedYml
}
