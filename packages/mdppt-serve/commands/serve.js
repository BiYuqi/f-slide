const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const defaultDevConfig = require('../config/dev')

module.exports = (entry, cmd) => {
  console.log(defaultDevConfig.module.rules)
  Object.keys(defaultDevConfig.entry).map(item => {
    defaultDevConfig.entry[item] = [
      'webpack-dev-server/client?http://127.0.0.1:8080/',
      defaultDevConfig.entry[item]
    ]
  })
  
  const compiler = webpack(defaultDevConfig)
  const devServerOptions = defaultDevConfig.devServer
  const devServer = new WebpackDevServer(compiler, devServerOptions)
  
  devServer.listen(8080, 'localhost', () => { 
    console.log('[mdppt] starting server on http://localhost:8080')
  })
}