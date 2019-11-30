module.exports = {
  baseUrl: '/',

  outputDir: 'dist',

  assetsDir: 'assets',

  indexPath: 'index.html',

  filenameHashing: true,

  runtimeCompiler: false,

  productionSourceMap: false,

  devServer: {
    host: '0.0.0.0',
    port: 8080,
    https: false,
    open: true,
    hot: true
  }
}