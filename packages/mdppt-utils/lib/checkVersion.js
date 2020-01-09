const axios = require('axios')
const logger = require('./logger')

const REPO_RAW_URL = 'https://raw.githubusercontent.com/ftbjs/mdppt/master/packages/mdppt/package.json'

function getRemoteVersion() {
  return new Promise((resolve, reject) => {
    axios
      .get(REPO_RAW_URL, { timeout: 10000 })
      .then(response => {
        resolve(response.data.version)
      })
      .catch(e => resolve(false))
  })
}

const checkVersion = async api => {
  const { currentVersion } = api
  const remoteVersion = await getRemoteVersion()
  if (!remoteVersion) {
    // hide the check update message when api fail
    // logger.yellow('Faild to check remove version.')
    return {
      update: false,
      tips: ''
    }
  }

  if (currentVersion !== remoteVersion) {
    const tips = [
      logger.cyan.raw(`New version found: ${remoteVersion}.\n\n`),
      logger.cyan.raw(`Please run ${logger.green.raw('npm install @mdppt/cli -g')} to install the new version.`)
    ]
    return {
      update: true,
      tips
    }
  }
}

module.exports = checkVersion
