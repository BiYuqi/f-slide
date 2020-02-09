module.exports = {
  appName: 'main',

  baseUrl: '/',

  outputDir: 'dist',

  // output assets files info
  assets: false,

  // For multi pages
  pages: {
    entry: '',
    enable: false,
    ignore: ['**/node_modules/**'],
    navigation: [],
    sideBarFolder: []
  },

  devServer: {
    host: 'localhost',
    port: 8080,
    open: false,
    hot: true
  }
}
