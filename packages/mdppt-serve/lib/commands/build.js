const webpack = require('webpack')
const chalk = require('chalk')
const prodConfig = require('../config/build')

module.exports = api => {
  api.config.mode = 'production'
  webpack(prodConfig(api), function(err, stats) {
    if (err) {
      throw err
    }
    if (stats.hasErrors()) {
      console.log(chalk.red('Mdppt project got build error', stats.toString()))
    }
    process.stdout.write(
      stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
      }) + '\n\n'
    )
  })
}
