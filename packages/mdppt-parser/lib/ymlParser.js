const jsYaml = require('js-yaml')

module.exports = content => {
  const parseRule = /---([\s\S]+?)---/
  const matchYml = content.match(parseRule)
  return jsYaml.load(matchYml[1])
}
