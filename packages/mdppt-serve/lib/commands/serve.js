const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const defaultDevConfig = require('../config/dev')
const resolveCwd = require('../util/resolveCwd')

module.exports = (entry, cmd) => {
  const options = {
    contentBase: resolveCwd('dist/index.html'),
    open: true,
    publicPath: '/',
    compress: true,
    noInfo: true,
    hot: true,
    disableHostCheck: true
  }

  WebpackDevServer.addDevServerEntrypoints(defaultDevConfig, options);
  
  const compiler = webpack(defaultDevConfig)
  const devServer = new WebpackDevServer(compiler, options)
  
  devServer.listen(8080, 'localhost', () => {
    console.log('Mdppt project is starting server at http://localhost:8080')
  })
}