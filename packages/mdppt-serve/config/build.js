const path = require('path')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const webpackBaseConfig = require('./base')

module.exports = webpackMerge(webpackBaseConfig, {
  mode: 'production',
  entry: {
    main: path.resolve(__dirname, '../lib/index.js')
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js'
  },
  optimization: {
    splitChunks: {},
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          cache: true,
          parallel: true,
          warnings: false,
          comments: false,
          compress: {
            drop_console: true
          }
        }
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  plugins: [
    new webpack.HashedModuleIdsPlugin(),

    new MiniCssExtractPlugin({
      filename: '[name].css'
    })
  ]
})
