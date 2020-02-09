const fs = require('fs')
const path = require('path')
const axios = require('axios')
const readFileSync = fs.readFileSync
const existsSync = fs.existsSync
const remoteAssetsLink = 'https://raw.githubusercontent.com/ftbjs/mdppt/gh-pages/assets.json'

const getLocalAssets = () => {
  const assets = existsSync(path.resolve(`${process.cwd()}/dist/assets.json`))

  if (assets) {
    return readFileSync(path.resolve(`${process.cwd()}/dist/assets.json`), 'utf-8').toString()
  }
  return null
}

const getRemoteAssets = async () => {
  const remoteAssets = await axios.get(remoteAssetsLink)

  if (remoteAssets) {
    return remoteAssets.data
  }
  return null
}

const generageHtml = async () => {
  const remoteAssets = await getRemoteAssets()
  const localAssets = JSON.parse(getLocalAssets())

  console.log(remoteAssets)

  const markdownList = [`File | Production | This branch | Difference`, `------ | ------ | ------ | ------`]

  localAssets.map(({ name, size }) => {
    markdownList.push(`${name}|${size}|${size}|${size}`)
  })

  console.log(markdownList.join('\n'))

  return markdownList.join('\n')
}

generageHtml()
