const { findExistSync } = require('@mdppt/utils')

const userCustomFavicon = './public/favicon.ico'

module.exports = api => {
  if (findExistSync(api.context, userCustomFavicon)) {
    return api.resolveCwd(api.context, userCustomFavicon)
  }
  return api.resolveLocal('../../public/favicon.ico')
}
