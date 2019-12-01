module.exports = (data) => {
  if (!data) {
    return ''
  }
  return `class="${data}"`
}