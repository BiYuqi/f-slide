const { logger } = require('@mdppt/utils')

// only support one classNam
const validateRE = /^(?:https?:\/\/)?.*\.(?:jpg|png|gif|webp|svg)\s[^\s]+$/gm

module.exports = image => {
  if (!image || image.length <= 0) {
    return ''
  }

  let temp, img
  try {
    temp = image[0].split(' ')
  } catch (error) {
    console.log(error)
  }

  if (temp.length === 1) {
    img = temp.shift()
    return `<span class="background" style="background-image:url(${img});"></span>`
  }

  if (!validateRE.test(temp.join(' '))) {
    logger.yellowBright('The image pattern is not correct.')
    logger.green('The correct image is: 图片 类名')
  }

  img = temp.shift()
  const classInfo = temp.map(item => item.replace(/\./, '')).join(' ')

  return `<span class="background ${classInfo}" style="background-image:url(${img});"></span>`
}
