const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const portfinder = require('portfinder')
const { logger, signature, serveMsg } = require('@mdppt/utils')
const defaultsdeep = require('lodash.defaultsdeep')
const devConfig = require('../config/dev')

module.exports = async api => {
  // output sinature
  logger.cyan(
    await signature({
      text: 'MDPPT CLI'
    })
  )

  const options = {
    contentBase: [api.resolveCwd(api.context, 'dist'), api.resolveCwd(api.context, api.getEntry())],
    compress: true,
    noInfo: true,
    hot: true,
    disableHostCheck: true,
    watchContentBase: true,
    inline: true
  }

  // set data to global api
  api.config.mode = 'development'

  // combine config
  api.config = defaultsdeep({ devServer: options }, api.config)

  // auto find avaiable port
  portfinder.basePort = api.config.devServer.port
  const autoPort = await portfinder.getPortPromise()
  if (autoPort) {
    api.config.devServer.port = autoPort
  } else {
    logger.red('Can not find an avaiable port, please check your local port.')
  }

  // set hot load json
  const defaultDevConfig = defaultsdeep({ devServer: api.config.devServer }, devConfig(api))
  const { port } = defaultDevConfig.devServer
  const rawHotUrl = `webpack-dev-server/client?http://127.0.0.1:${port}/`
  const entry = defaultDevConfig.entry[api.appName]

  if (typeof entry === 'string') {
    defaultDevConfig.entry[api.config.appName] = [rawHotUrl, entry]
  }

  WebpackDevServer.addDevServerEntrypoints(defaultDevConfig, options)

  const compiler = webpack(defaultDevConfig)
  const devServer = new WebpackDevServer(compiler, options)

  devServer.listen(port, 'localhost', () => {
    serveMsg({ port, api })
  })
}
