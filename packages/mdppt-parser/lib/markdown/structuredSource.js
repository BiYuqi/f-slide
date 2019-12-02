const parseAttrs = require('./parseAttrs')

module.exports = context => {
  let matchResult
  const result = []
  const parseSliderRule = /<slide([^>]*?)>([\s\S]+?)<\/slide>/gim

  while ((matchResult = parseSliderRule.exec(context))) {
    if (matchResult[1]) {
      const parseAttrsResult = parseAttrs(matchResult[1])
      result.push({
        slideContect: {
          class: parseAttrsResult['class'],
          subClass: parseAttrsResult[':class'],
          image: parseAttrsResult['image']
        },
        mdContent: matchResult[2]
      })
    } else {
      result.push({
        slideContect: matchResult[1].trim(),
        mdContent: matchResult[2]
      })
    }
  }

  return result
}
