const markdownIt = require('markdown-it')
const renderClass = require('./slide-parser/renderClass')
const structuredSource = require('./slide-parser/structuredSource')
const parseImage = require('./slide-parser/parseImage')

const md = markdownIt()

md.use(require('markdown-it-prism'))
  .use(require('markdown-it-attrs'))
  .use(require('./markdown/links'))

module.exports = context => {
  const htmlResult = []
  const zoomResult = []
  const structuredSourceData = structuredSource(context)

  if (structuredSourceData.length <= 0) {
    return {
      html: '<div>Could not find a validate markdown file. Please read the guide.</div>'
    }
  }

  for (let i = 0; i < structuredSourceData.length; i++) {
    const tempStructedData = structuredSourceData[i]
    htmlResult.push(`
      <section ${renderClass(tempStructedData.slideContect.class, 'mdppt-slide')}>
        ${parseImage(tempStructedData.slideContect.image)}
        <div ${renderClass(tempStructedData.slideContect.subClass, 'mdppt-slide__sub')}>
          ${md.render(tempStructedData.mdContent)}
        </div>
      </section>
    `)

    zoomResult.push(`
      <li class="mdppt-zoom_item" data-slide="${i + 1}">
        <div class="mdppt-zoom_item-inner">
          <section ${renderClass(tempStructedData.slideContect.class, 'mdppt-zoom-slide')}>
            ${parseImage(tempStructedData.slideContect.image)}
            <div ${renderClass(tempStructedData.slideContect.subClass, 'mdppt-zoom-slide__sub')}>
              ${md.render(tempStructedData.mdContent)}
            </div>
          </section>
        </div>
        <div class="mdppt-zoom_item-index">
          ${i + 1}
        </div>
      </li>
    `)
  }

  const html = `
    <div class="mdppt">
      <div class="mdppt-content">
        ${htmlResult.join('\n')}
      </div>
      <div class="mdppt-zoom">
        <ul class="mdppt-zoom_content">
          ${zoomResult.join('\n')}
        </ul>
      </div>
      <div class="mdppt-action">
        <button class="mdppt-action__prev">Prev</button>
        <span class="mdppt-action__count"></span>
        <button class="mdppt-action__next">Next</button>
      </div>
    </div>
  `
  return {
    html
  }
}
