module.exports = {
  appName: 'main',

  baseUrl: '/',

  outputDir: 'dist',

  // For multi pages
  pages: {
    status: false,
    ignore: ['**/node_modules/**'],
    entry: ''
  },

  devServer: {
    host: 'localhost',
    port: 8080,
    open: false,
    hot: true
  }
}
