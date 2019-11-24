module.exports = {
  baseUrl: '/',

  outputDir: 'dist',

  assetsDir: '',

  indexPath: 'index.html',
  plugins: [],

  filenameHashing: true,

  runtimeCompiler: false,

  productionSourceMap: false,

  css: {
      extract: true
      // modules: false,
      // localIdentName: '[name]_[local]_[hash:base64:5]',
      // sourceMap: false,
      // loaderOptions: {}
  },

  devServer: {
    host: '0.0.0.0',
    port: 8080,
    https: false,
    proxy: null,
    before: app => {}
  }
}