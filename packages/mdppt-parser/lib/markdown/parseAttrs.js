const createBaseRule = (type) => {
  return new RegExp(`${type}="[^+]+?"`, 'gm')
}
const parseAttrs = /([\w:]+)="([^"]+)"/gim
const subClass = createBaseRule(':class')
const extractClass = createBaseRule('class')
const extractImage = createBaseRule('image')

module.exports = (content) => {
  let match = null
  const collectAttrs = {}
  while (match = parseAttrs.exec(content)) {
    if (!collectAttrs[match[1]]) {
      collectAttrs[match[1]] = [match[2]]
    } else {
      collectAttrs[match[1]].push(match[2])
    }
  }
  return collectAttrs
}