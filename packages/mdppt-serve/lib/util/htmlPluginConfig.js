const glob = require('glob')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const templateParameters = (compilation, assets, pluginOptions) => {
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

module.exports = api => {
  // multiPages
  if (!api.config.multiPages) {
    return [
      new HtmlWebpackPlugin({
        template: api.getEntry(),
        filename: api.resolveCwd(api.context, `/${api.config.outputDir}/index.html`),
        favicon: api.favicon,
        inject: true,
        templateParameters
      })
    ]
  }

  const options = {
    ignore: ['**/node_modules/**']
  }
  const currentEnvPath = process.cwd()
  const markdownFiles = glob.sync(process.cwd() + '/**/*.md', options)

  const modifyExtension = markdownFiles.map(entry => entry.replace(/\.md/, '.html'))
  const relativeMarkdownPath = markdownFiles.map(filte => filte.replace(currentEnvPath, ''))
  const relativeHtmlPath = modifyExtension.map(filte => filte.replace(currentEnvPath, ''))

  const multiPages = []
  relativeMarkdownPath.map((markdownEntry, index) => {
    const filename = relativeHtmlPath[index].match(/([^\/]+)\.html/)[1]
    multiPages.push(
      new HtmlWebpackPlugin({
        template: './' + markdownEntry,
        filename: filename + '.html',
        favicon: api.favicon,
        inject: true,
        chunks: ['common', 'main', 'vendor', filename],
        templateParameters
      })
    )
  })

  return multiPages
}
