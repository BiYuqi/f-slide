const markdownIt = require('markdown-it')
const prism = require('markdown-it-prism')
const parseSliderRule = /<slide([^>]*?)>([\s\S]+?)<\/slide>/gim
const parseAttrs = /([\w:]+)="([^"]+)"/gim

const mdRender = markdownIt()

mdRender.use(prism)

module.exports = context => {
  let matchResult
  const result = []
  const htmlResult = []

  while ((matchResult = parseSliderRule.exec(context))) {
    result.push({
      slideContect: matchResult[1],
      mdContent: matchResult[2]
    })
  }

  if (result.length <= 0) {
    return '<div>Not Slide Found</div>'
  }

  for (let i = 0; i < result.length; i++) {
    htmlResult.push(`
      <section ${result[i].slideContect.trim()}>
        ${mdRender.render(result[i].mdContent)}
      </section>
    `)
  }
  const html = `
    <div id="mdppt">
      <div class="mdppt-content">
        ${htmlResult.join('\n')}
      </div>
    </div>
  `

  return {
    html,
    slideCount: htmlResult.length
  }
}
