#! /usr/bin/env node

const program = require('commander')
const { logger } = require('mdppt-utils')

program.version(require('../package').version, '-v, --version').usage(`${logger.green.raw('<command>')} [Options]`)

program
  .command(logger.green.raw('new [filename]'))
  .description(logger.magenta.raw('Create a template file using mdppt command.'))
  .action((name, other) => {
    require('../command/app.js.js')({ fileName: name })
  })

program
  .command('serve [entry]')
  .description(logger.magenta.raw('Setup a local server.'))
  .action((entry, cmd) => {
    require('mdppt-serve').serve(entry, cmd)
  })

program
  .command('build [entry]')
  .description(logger.magenta.raw('Build the markdown file to slide.'))
  .action((entry, cmd) => {
    require('mdppt-serve').build(entry, cmd)
  })

program
  .command('*')
  .description(logger.yellow.raw('Type a wrong command. Please try `mdppt -h`.'))
  .action((name, other) => {
    logger.greenBright('Please try `mdppt -h`, Get the whold feature list.')
  })

program.parse(process.argv)
