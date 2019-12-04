const renderClass = require('./renderClass')
const structuredSource = require('./structuredSource')

const renderImage = image => {
  if (!image) {
    return ''
  }
  return `<span class="background" style="background-image:url(${image[0]})"></span>`
}
module.exports = (md,context) => {
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
        ${renderImage(tempStructedData.slideContect.image)}
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
    </div>
  `

  return {
    html
  }
}
