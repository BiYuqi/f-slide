module.exports = (data, config) => {
  if (!data) {
    return `class="${config}"`
  }
  data = data.join(' ').split(' ')
  const classNames = [...new Set([config, ...data])]
  return `class="${classNames.join(' ').trim()}"`
}
