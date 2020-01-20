module.exports = {
  appName: 'main',

  baseUrl: '/',

  outputDir: 'dist',

  multiPages: false,

  // For multi pages
  pages: {},

  devServer: {
    host: 'localhost',
    port: 8080,
    open: false,
    hot: true
  }
}
