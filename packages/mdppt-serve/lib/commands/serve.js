const webpack = require('webpack')
const chalk = require('chalk')
const WebpackDevServer = require('webpack-dev-server')
const devConfig = require('../config/dev')
const resolveCwd = require('../util/resolveCwd')

module.exports = api => {
  const options = {
    contentBase: [resolveCwd(api.context, 'dist'), resolveCwd(api.context, api.getEntry())],
    open: true,
    publicPath: api.config.baseUrl,
    compress: true,
    noInfo: true,
    hot: true,
    disableHostCheck: true,
    watchContentBase: true,
    inline: true,
    port: 8080
  }

  // set data to global api
  api.config.mode = 'development'

  // set hot load json
  const defaultDevConfig = devConfig(api)
  const rawHotUrl = `webpack-dev-server/client?http://127.0.0.1:${options.port}/`
  const entry = defaultDevConfig.entry[api.appName]

  if (typeof entry === 'string') {
    defaultDevConfig.entry[api.config.appName] = [rawHotUrl, entry]
  }

  WebpackDevServer.addDevServerEntrypoints(defaultDevConfig, options)

  const compiler = webpack(defaultDevConfig)
  const devServer = new WebpackDevServer(compiler, options)

  devServer.listen(8080, 'localhost', () => {
    console.log(`${chalk.cyanBright('Mdppt is starting at:')} ${chalk.green('http://localhost:8080')}`)
  })
}
