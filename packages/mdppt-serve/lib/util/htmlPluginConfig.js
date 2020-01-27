const HtmlWebpackPlugin = require('html-webpack-plugin')
const glob = require('glob')
const generageNavigation = require('./generageNavigation')

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
  // single page
  if (!api.config.pages.enable || (api.config.pages.enable && api.entry !== '.')) {
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

  // multiPages
  const options = {
    ignore: api.config.pages.ignore
  }

  const currentEnvPath = process.cwd()
  const markdownFiles = glob.sync(currentEnvPath + '/**/*.md', options)

  const modifyExtension = markdownFiles.map(entry => entry.replace(/\.md/, '.html'))
  const relativeMarkdownPath = markdownFiles.map(filte => filte.replace(currentEnvPath, ''))
  const relativeHtmlPath = modifyExtension.map(filte => filte.replace(currentEnvPath, ''))

  return relativeMarkdownPath.reduce((result, current, index) => {
    const filename = relativeHtmlPath[index].match(/([^\/]+)\.html/)[1]
    const outputName = filename.indexOf(api.config.pages.entry) > -1 ? 'index' : filename

    api.config.pages.sideBarFolder.push(generageNavigation(relativeMarkdownPath, api.config.pages.entry))

    result.push(
      new HtmlWebpackPlugin({
        template: '.' + current,
        filename: outputName + '.html',
        favicon: api.favicon,
        inject: true,
        chunks: ['common', 'main', 'vendor', filename],
        templateParameters
      })
    )
    return result
  }, [])
}
