const webpack = require('webpack')
const chalk = require('chalk')
const WebpackDevServer = require('webpack-dev-server')
const devConfig = require('../config/dev')
const resolveCwd = require('../util/resolveCwd')

module.exports = api => {
  const options = {
    contentBase: [resolveCwd(api.context, 'dist'), resolveCwd(api.context, api.getEntry())],
    open: true,
    publicPath: '/',
    compress: true,
    noInfo: true,
    hot: true,
    disableHostCheck: true,
    watchContentBase: true,
    inline: true
  }
  api.mode = 'development'
  const defaultDevConfig = devConfig(api)
  WebpackDevServer.addDevServerEntrypoints(defaultDevConfig, options)

  const compiler = webpack(defaultDevConfig)
  const devServer = new WebpackDevServer(compiler, options)

  devServer.listen(8080, 'localhost', () => {
    console.log(`Mdppt is starting at ${chalk.green('http://localhost:8080')}`)
  })
}
