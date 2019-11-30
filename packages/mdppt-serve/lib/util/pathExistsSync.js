const fs = require('fs-extra')
const path = require('path')

module.exports = (context, files) => {
  if (files & (typeof files === 'string')) {
    if (fs.pathExistsSync(path.join(context, file))) {
      return files
    }
  } else {
    for (let i = 0; i < files.length; i++) {
      if (fs.pathExistsSync(path.join(context, files[i]))) {
        return files[i]
      }
    }
  }
  return false
}
