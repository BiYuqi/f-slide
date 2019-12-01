const markdownIt = require('markdown-it')
const prism = require('markdown-it-prism')
const parseAttrs = require('./parseAttrs')
const renderClass = require('./renderClass')

const mdRender = markdownIt()
mdRender.use(prism)

module.exports = context => {
  let matchResult
  const result = []
  const htmlResult = []
  const parseSliderRule = /<slide([^>]*?)>([\s\S]+?)<\/slide>/gim

  while ((matchResult = parseSliderRule.exec(context))) {
    if (matchResult[1]) {
      const parseAttrsResult = parseAttrs(matchResult[1])
      result.push({
        slideContect: {
          class: parseAttrsResult['class'].join(' '),
          subClass: parseAttrsResult[':class'].join(' '),
          image: parseAttrsResult['image'].join(' ')
        },
        mdContent: matchResult[2]
      })
    } else {
      result.push({
        slideContect: matchResult[1].trim(),
        mdContent: matchResult[2]
      })
    }
  }

  if (result.length <= 0) {
    return {
      html: '<div>Could not find a validate markdown file. Please read the guide.</div>'
    }
  }

  for (let i = 0; i < result.length; i++) {
    htmlResult.push(`
      <section ${renderClass(result[i].slideContect.class)}>
        <div ${renderClass(result[i].slideContect.subClass)}>
          ${mdRender.render(result[i].mdContent)}
        </div>
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
