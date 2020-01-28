const fs = require('fs')
const path = require('path')
const jsYaml = require('js-yaml')

const matchRule = /\/([a-zA-Z\d-]+)/g
const matchYaml = /---([\s\S]+?)---/

const extractSideBarName = data => {
  const fileContent = fs.readFileSync(path.resolve(process.cwd(), `.${data}`)).toString()
  const fileYaml = fileContent.match(matchYaml)

  if (fileYaml) {
    return jsYaml.load(fileYaml[1]).sideBarTitle
  }
  return null
}

const extractPageName = data => {
  let match,
    result = []
  const sideBarTitle = extractSideBarName(data)
  while ((match = matchRule.exec(data))) {
    result.push({
      name: match[1],
      display: sideBarTitle
    })
  }
  return result
}

const setEntry = (page, entry) => (page === entry ? 'index' : page)

module.exports = (navs, entry) => {
  const result = navs.reduce((result, nav) => {
    result.push(extractPageName(nav))
    return result
  }, [])

  const folderResult = {}

  for (let i = 0; i < result.length; i++) {
    const mid = result[i]
    if (mid.length === 1) {
      folderResult[mid[0].name] = {
        name: setEntry(mid[0].name, entry),
        display: mid[0].display,
        children: []
      }
      continue
    }

    if (mid.length === 2) {
      const [key, value] = [mid[0].name, mid[1].name]
      const children = {
        name: setEntry(value, entry),
        display: mid[1].display
      }

      if (!folderResult[key]) {
        folderResult[key] = {
          name: key,
          children: [children]
        }
      } else {
        folderResult[key].children = [...folderResult[key].children, children]
      }
    }
  }

  const collectWithoutChild = []
  const collectWithChild = []
  const folderResultWithOrder = {}

  Object.keys(folderResult).forEach(item => {
    const hasChildren = folderResult[item].children.length > 0
    if (hasChildren) {
      collectWithChild.push(item)
    } else {
      collectWithoutChild.push(item)
    }
  })

  collectWithChild.sort().forEach(item => {
    folderResultWithOrder[item] = folderResult[item]
  })

  collectWithoutChild.sort().forEach(item => {
    folderResultWithOrder[item] = folderResult[item]
  })

  return folderResultWithOrder
}
