#! /usr/bin/env node

const program = require('commander')
const chalk = require('chalk')

program.version(require('../package').version, '-v, --version').usage(`${chalk.green('<command>')} [options]`)

program
  .command('new [file]')
  .alias('n')
  .description('Create a new file')
  .action((name, other) => {
    require('../command/app.js.js')({ fileName: name })
  })

program
  .command('serve [entry]')
  .alias('s')
  .description('Setup a local server')
  .action((entry, cmd) => {
    require('mdppt-serve').serve(entry, cmd)
  })

program
  .command('build [entry]')
  .alias('b')
  .description('Build the project')
  .action((entry, cmd) => {
    require('mdppt-serve').build(entry, cmd)
  })

program
  .command('*')
  .description('A wrong command, Please see above all command.')
  .action((name, other) => {
    console.log(chalk.greenBright('I guess you lost your goal, no warrries, try again'))
  })

program.parse(process.argv)
