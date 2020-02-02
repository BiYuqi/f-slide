const { logger } = require('@mdppt/utils')

const MatchImageWithLocal = /<img\s?src="((?!(?:https?:?|\/\/))[^"]+)"\s?alt="([^]*?)"\s?>/gm

module.exports = function(content) {
  let isMatch = false,
    matchList = []

  const result = content.replace(MatchImageWithLocal, (m, t, a) => {
    isMatch = true
    matchList.push({
      src: t,
      alt: a
    })
    return `<img src="" alt="${a}">`
  })

  if (isMatch) {
    logger.yellow(`Got Parse Error: ${logger.greenBright.raw('Local image files are not supported temporarily.')}`)
    logger.yellow(
      `Our Suggestion: ${logger.greenBright.raw('Please use online pictures temporarily, will be supported later.')}`
    )
  }

  return result
}
