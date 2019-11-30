const mdpptDefault = require('./mdppt.default.js')

// TODO => need to try to load the user difine config
// const mdpptConfig = require(path.resolve(process.cwd(), 'mdppt.config.js'))

module.exports = class Service {
  constructor(entry, context, options) {
    this.config = mdpptDefault
    this.entry = entry
    this.context = context
  }

  getEntry() {
    return this.entry
  }
}
