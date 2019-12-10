const fs = require('fs')
const path = require('path')

module.exports = (context, entry) => {
  return fs.existsSync(path.resolve(context, entry))
}
