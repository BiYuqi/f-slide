const mdpptDefault = require('./mdppt.default.js')
const resolveEntry = require('./util/resolveEntry')
const resolveLocal = require('./util/resolveLocal')
const resolveCwd = require('./util/resolveCwd')

// TODO => need to try to load the user difine config
// const mdpptConfig = require(path.resolve(process.cwd(), 'mdppt.config.js'))

module.exports = class Service {
  constructor(entry, context, options) {
    this.config = mdpptDefault
    this.entry = entry
    this.context = context
    this.resolveEntry = resolveEntry
    this.resolveLocal = resolveLocal
    this.resolveCwd = resolveCwd
  }

  getEntry() {
    return this.entry
  }
}
