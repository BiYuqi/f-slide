const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const webpackBaseConfig = require('./base')
const resolveCwd = require('../util/resolveCwd')

module.exports = webpackMerge(webpackBaseConfig, {
  mode: 'production',
  output: {
    path: resolveCwd('dist'),
    filename: 'js/[name].[contenthash:8].js'
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
      filename: 'css/[name].css'
    })
  ]
})
