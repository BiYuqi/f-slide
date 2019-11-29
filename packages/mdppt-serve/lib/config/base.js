const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const devMode = process.env.NODE_ENV === 'development'
const resolveLocal = require('../util/resolveLocal')
const resolveCwd = require('../util/resolveCwd')

module.exports = (api) => ({
  entry: {
    main: resolveLocal('../../src/index.js')
  },
  module: {
    rules: [
      {
        test: /\.m?jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [resolveLocal('../../node_modules/@babel/preset-env')]
          }
        }
      },
      {
        test: /\.md$/,
        use: [
          {
            loader: 'html-loader'
          },
          {
            loader: 'mdppt-parser'
          }
        ]
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: devMode ? 'style-loader' : MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'sass-loader'
          },
          {
            loader: 'postcss-loader'
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    modules: ['node_modules', resolveLocal('../../node_modules')],
    symlinks: false
  },
  resolveLoader: {
    modules: ['node_modules', resolveLocal('../../node_modules')]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: api.getEntry(),
      filename: resolveCwd('dist/index.html'),
      favicon: resolveLocal('../../public/favicon.ico'),
      inject: true,
      templateParameters: (compilation, assets, pluginOptions) => {
        // enhance html-webpack-plugin's built in template params
        let stats
        return Object.assign({
            // make stats lazy as it is expensive
            get webpack() {
                return stats || (stats = compilation.getStats().toJson())
            },
            compilation: compilation,
            webpackConfig: compilation.options,
            htmlWebpackPlugin: {
                files: assets,
                options: pluginOptions
            }
        });
      }
    })
  ]
})
