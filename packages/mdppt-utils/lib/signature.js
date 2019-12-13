const figlet = require('figlet')

const defaultOptions = {
  text: '',
  horizontalLayout: 'default',
  verticalLayout: 'default',
  kerning: 'default'
}

module.exports = options => {
  const newOptions = { ...defaultOptions, ...options }
  if (!newOptions.text) {
    throw new Error('Please provide a valid text to show.')
  }

  return new Promise((resolve, reject) => {
    resolve(figlet.textSync(newOptions.text, defaultOptions))
  })
}
