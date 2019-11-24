const path = require('path')

const resolveLocal = (...args) => {
  return path.join(__dirname, '../../', ...args)
}

module.exports = {
  resolveLocal
}