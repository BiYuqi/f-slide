const build = require('./commands/build')
const serve = require('./commands/serve')

module.exports = {
  serve: (entry, cmd) => serve(entry, cmd),
  build: (entry, cmd) => build(entry, cmd)
}