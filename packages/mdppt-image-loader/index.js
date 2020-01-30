const MatchImageWithLocal = /<img\s?src="((?!(?:https?:?|\/\/))[^"]+)"\s?alt="([^]*?)"\s?>/gm

module.exports = function(content) {
  const result = content.replace(MatchImageWithLocal, (m, t, a) => {
    return `<img src="${t}" alt="${a}">`
  })
  return result
}
