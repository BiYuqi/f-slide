const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = api => {
  return {
    test: /\.(sa|sc|c)ss$/,
    use: [
      {
        loader: api.config.mode === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader
      },
      {
        loader: 'css-loader'
      },
      {
        loader: 'sass-loader'
      }
    ]
  }
}
