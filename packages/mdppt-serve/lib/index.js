const build = require('./commands/build')
const serve = require('./commands/serve')
const resolveEntry = require('./util/resolveEntry')
const Service = require('./Service')

function createService(entry, context, options) {
  return new Service(entry, context, options)
}

module.exports = {
  serve: (e, arg) => {
    const { context, entry } = resolveEntry(e, arg)
    serve(createService(entry, context, arg))
  },
  build: (e, arg) => {
    const { context, entry } = resolveEntry(e, arg)
    build(createService(entry, context, arg))
  }
}
