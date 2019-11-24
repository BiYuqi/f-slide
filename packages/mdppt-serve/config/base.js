const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const devMode = process.env.NODE_ENV === 'development'
const { resolveLocal } = require('../lib')

module.exports = {
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.md$/,
        use: [
          {
            loader: 'markdown-loader'
          },
          {
            loader: 'html-loader'
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
    modules: ['node_modules', process.cwd() + 'node_modules', resolveLocal('../node_modules')],
    symlinks: false
  },
  resolveLoader: {
    modules: ['node_modules', process.cwd() + 'node_modules', resolveLocal('../node_modules')]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.ejs'),
      filename: path.resolve(__dirname, '../dist/index.html'),
      favicon: path.resolve(__dirname, '../public/favicon.ico'),
      inject: true,
      templateParameters: (compilation, assets, pluginOptions) => {
        console.log(pluginOptions)
        // enhance html-webpack-plugin's built in template params
        let stats;
        return Object.assign({
            // make stats lazy as it is expensive
            get webpack() {
                return stats || (stats = compilation.getStats().toJson());
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
}
