const matchRule = /\/([a-zA-Z\d-]+)/g

const extract = data => {
  let match,
    result = []
  while ((match = matchRule.exec(data))) {
    result.push(match[1])
  }
  return result
}

const setEntry = (page, entry) => (page === entry ? 'index' : page)

module.exports = (navs, entry) => {
  const result = navs.reduce((result, nav) => {
    result.push(extract(nav))
    return result
  }, [])
  const folderResult = {}

  for (let i = 0; i < result.length; i++) {
    const mid = result[i]
    if (mid.length === 1) {
      folderResult[mid[0]] = {
        name: setEntry(mid[0], entry),
        children: []
      }
      continue
    }

    if (mid.length === 2) {
      const [key, value] = [mid[0], mid[1]]
      if (!folderResult[key]) {
        folderResult[key] = {
          name: key,
          children: [setEntry(value, entry)]
        }
      } else {
        folderResult[key].children = [...folderResult[key].children, setEntry(value, entry)]
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
