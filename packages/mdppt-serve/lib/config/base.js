const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const WebpackBar = require('webpackbar')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const htmlPluginConfig = require('../util/htmlPluginConfig')

module.exports = api => ({
  entry: {
    [api.config.appName]: api.resolveLocal('../../src/index.js')
  },
  module: {
    rules: [
      {
        test: /\.m?jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: false,
            configFile: false,
            presets: [api.resolveLocal('../../node_modules/@babel/preset-env')],
            plugins: [
              [
                api.resolveLocal('../../node_modules/@babel/plugin-transform-runtime'),
                {
                  corejs: false,
                  useESModules: true
                }
              ],
              api.resolveLocal('../../node_modules/@babel/plugin-syntax-dynamic-import')
            ]
          }
        }
      },
      {
        test: /\.md$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: true
            }
          },
          {
            loader: '@mdppt/parser',
            options: {
              navigationFolder: api.config.pages.sideBarFolder
            }
          }
        ]
      },
      {
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
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: api.resolveCwd(api.context, 'image/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: api.resolveCwd(api.context, 'media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: api.resolveCwd(api.context, 'fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.md'],
    modules: ['node_modules', api.resolveLocal('../../node_modules')],
    symlinks: false
  },
  resolveLoader: {
    modules: ['node_modules', api.resolveLocal('../../node_modules')]
  },
  plugins: [
    ...htmlPluginConfig(api),
    new WebpackBar({
      name: '🚚 MDPPT',
      basic: false
    }),
    new FriendlyErrorsWebpackPlugin()
  ]
})
