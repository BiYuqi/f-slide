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
    return `<span class="background" style="background-image:url(${temp.shift()});"></span>`
  }

  img = temp.shift()
  const classInfo = temp.map(item => item.replace(/\./, '')).join(' ')

  return `<span class="background ${classInfo}" style="background-image:url(${img});"></span>`
}
