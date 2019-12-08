const webpack = require('webpack')
const chalk = require('chalk')
const WebpackDevServer = require('webpack-dev-server')
const portfinder = require('portfinder')
const devConfig = require('../config/dev')
const resolveCwd = require('../util/resolveCwd')

module.exports = async api => {
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

  // auto find avaiable port
  portfinder.basePort = options.port
  const autoPort = await portfinder.getPortPromise()
  if (autoPort) {
    options.port = autoPort
  } else {
    console.log(chalk.red('Can not find a useable port, please check your local port.'))
  }

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

  devServer.listen(options.port, 'localhost', () => {
    console.log(
      `${chalk.cyanBright('Mdppt server is starting at:')} ${chalk.green(`http://localhost:${options.port}`)}`
    )
  })
}
