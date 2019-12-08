const renderClass = require('./slide-parser/renderClass')
const structuredSource = require('./slide-parser/structuredSource')
const parseImage = require('./slide-parser/parseImage')

module.exports = (md, context) => {
  const htmlResult = []
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
  }

  const html = `
    <div class="mdppt">
      <div class="mdppt-content">
        ${htmlResult.join('\n')}
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
