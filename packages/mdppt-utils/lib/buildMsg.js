const boxen = require('boxen')
const checkVersion = require('./checkVersion')

module.exports = async ({ api }) => {
  const result = await checkVersion(api)
  if (result && result.update) {
    console.log(boxen(result.tips.join(''), { padding: 1, borderColor: 'green' }))
  }
}
