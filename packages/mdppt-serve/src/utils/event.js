class Event {
  on(dom, type, cb) {
    dom.addEventListener(type, cb, false)
  }

  select(selector) {
    return document.querySelector(selector)
  }

  selectAll(selector) {
    return Array.from(document.querySelectorAll(selector))
  }

  length(dom) {
    if (!dom) return null
    return this.selectAll(dom).length
  }

  getDirection(event) {
    return new Promise((resolve, reject) => {
      const e = event || window.event
      if (!e) {
        resolve({
          direct: '',
          isScope: false
        })
        return
      }

      const keyCode = e.keyCode

      switch (keyCode) {
        case 39:
        case 40:
          resolve({
            direct: 'next',
            isScope: true
          })
          break
        case 37:
        case 38:
          resolve({
            direct: 'prev',
            isScope: true
          })
          break
        case 70:
          resolve({
            direct: 'fullscreen',
            isScope: true
          })
          break
        case 189:
          resolve({
            direct: '-',
            isScope: true
          })
          break
        case 187:
          resolve({
            direct: '+',
            isScope: true
          })
          break
        case 69:
          resolve({
            direct: 'expand',
            isScope: true
          })
          break
        default:
          resolve({
            direct: '',
            isScope: false
          })
          break
      }
    })
  }
}

export default new Event()
