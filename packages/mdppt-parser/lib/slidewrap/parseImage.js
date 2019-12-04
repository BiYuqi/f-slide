module.exports = image => {
  if (!image || image.length <= 0) {
    return ''
  }

  return `<span class="background" style="background-image:url(${image[0]});"></span>`
}
