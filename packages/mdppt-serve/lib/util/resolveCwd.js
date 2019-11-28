const path = require('path')

module.exports = function resolveCwd (...args) {
  return path.join(process.cwd(), ...args)
}