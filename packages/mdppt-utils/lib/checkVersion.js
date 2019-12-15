const axios = require('axios')
const logger = require('./logger')

const REPO_RAW_URL = 'https://raw.githubusercontent.com/ftbjs/mdppt/master/packages/mdppt/package.json'

function getRemoteVersion() {
  return new Promise((resolve, reject) => {
    axios
      .get(REPO_RAW_URL, { timeout: 10000 })
      .then(response => {
        resolve(response)
      })
      .catch(e => resolve(false))
  })
}

const checkVersion = async api => {
  const { currentVersion } = api
  const remoteVersion = await getRemoteVersion()
  if (!remoteVersion) {
    logger.yellow('Faild to check remove version.')
    return
  }

  if (currentVersion !== remoteVersion) {
    logger.cyan(`Found a new version: ${remoteVersion}`)
    logger.cyan(`Please run ${logger.green.raw('npm install mdppt -g')} to experient the new version.`)
  }
}

module.exports = checkVersion
