const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const devMode = process.env.NODE_ENV === 'development'
const resolveLocal = require('../util/resolveLocal')
const resolveCwd = require('../util/resolveCwd')

module.exports = api => ({
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
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: resolveCwd(api.context, 'image/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: resolveCwd(api.context, 'media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: resolveCwd(api.context, 'fonts/[name].[hash:7].[ext]')
        }
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
      filename: resolveCwd(api.context, 'dist/index.html'),
      favicon: resolveLocal('../../public/favicon.ico'),
      inject: true,
      templateParameters: (compilation, assets, pluginOptions) => {
        let stats
        return Object.assign({
          get webpack() {
            return stats || (stats = compilation.getStats().toJson())
          },
          compilation: compilation,
          webpackConfig: compilation.options,
          htmlWebpackPlugin: {
            files: assets,
            options: pluginOptions
          }
        })
      }
    })
  ]
})
