const path = require('path')

module.exports = (context, entry) => {
  return path.resolve(context, entry)
}
