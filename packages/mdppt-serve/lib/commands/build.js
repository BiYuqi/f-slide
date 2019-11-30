const webpack = require('webpack')
const prodConfig = require('../config/build')

module.exports = api => {
  webpack(prodConfig(api), function(err, stats) {
    if (err) {
      throw err
    }
    if (stats.hasErrors()) {
      console.log('Mdppt project got build error', stats.toString())
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
