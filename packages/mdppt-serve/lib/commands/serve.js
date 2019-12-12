const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const portfinder = require('portfinder')
const { logger } = require('@mdppt/utils')
const defaultsdeep = require('lodash.defaultsdeep')
const devConfig = require('../config/dev')

module.exports = async api => {
  const options = {
    contentBase: [api.resolveCwd(api.context, 'dist'), api.resolveCwd(api.context, api.getEntry())],
    open: true,
    publicPath: api.config.baseUrl,
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
  portfinder.basePort = options.port
  const autoPort = await portfinder.getPortPromise()
  if (autoPort) {
    options.port = autoPort
  } else {
    logger.red('Can not find an avaiable port, please check your local port.')
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
    logger.cyanBright(`Mdppt server is starting at:`, logger.green.raw(`http://localhost:${options.port}`))
  })
}
