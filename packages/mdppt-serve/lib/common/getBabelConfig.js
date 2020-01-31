module.exports = api => {
  return {
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
  }
}
