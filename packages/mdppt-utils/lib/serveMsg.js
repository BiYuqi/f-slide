const boxen = require('boxen')
const logger = require('./logger')

module.exports = port => {
  const msg = []

  msg.push(logger.green.raw('Serving!\n\n'))
  msg.push(`Local: ${logger.cyan.raw(`http://localhost:${port}\n\n`)}`)
  msg.push(logger.blackBright.raw('Copied local address to clipboard!\n\n'))
  msg.push(logger.blackBright.raw('You can also specify port and auto-open by mdppt.config.js!'))

  console.log(boxen(msg.join(''), { padding: 1, borderColor: 'green' }))
}
