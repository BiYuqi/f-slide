const markdownIt = require('markdown-it')
const prism = require('markdown-it-prism')
const renderClass = require('./renderClass')
const structuredSource = require('./structuredSource')

const mdRender = markdownIt()
mdRender.use(prism)

module.exports = context => {
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
        <div ${renderClass(tempStructedData.slideContect.subClass, 'mdppt-slide__sub')}>
          ${mdRender.render(tempStructedData.mdContent)}
        </div>
      </section>
    `)
  }
  const html = `
    <div class="mdppt">
      <div class="mdppt-content">
        ${htmlResult.join('\n')}
      </div>
    </div>
  `

  return {
    html
  }
}
