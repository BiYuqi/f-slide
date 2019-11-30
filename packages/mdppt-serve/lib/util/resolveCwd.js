const path = require('path')

module.exports = function resolveCwd(context, ...args) {
  return path.join(context, ...args)
}
