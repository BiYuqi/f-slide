const path = require('path')

module.exports = (context, ...args) => {
  return path.join(context, ...args)
}
