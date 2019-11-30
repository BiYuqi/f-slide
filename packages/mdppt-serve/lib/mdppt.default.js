module.exports = {
  appName: 'main',

  baseUrl: '/',

  outputDir: 'dist',

  assetsDir: 'assets',

  indexPath: 'index.html',

  productionSourceMap: false,

  devServer: {
    host: '0.0.0.0',
    port: 8080,
    open: true,
    hot: true
  }
}
