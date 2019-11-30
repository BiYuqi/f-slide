const build = require('./commands/build')
const serve = require('./commands/serve')
const resolveEntry = require('./util/resolveEntry')

module.exports = {
  serve: (entry, cmd) => {
    const api = {
      context: resolveEntry(entry, cmd).context,
      getEntry: () => {
        return resolveEntry(entry, cmd).entry
      }
    }
    serve(api)
  },
  build: (entry, cmd) => {
    const api = {
      context: resolveEntry(entry, cmd).context,
      getEntry: () => {
        return resolveEntry(entry, cmd).entry
      }
    }
    build(api)
  }
}
