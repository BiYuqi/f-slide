class Event {
  constructor() {}

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
      if (e && (e.keyCode == 40 || e.keyCode == 39)) {
        resolve({
          direct: 'next',
          isScope: true
        })
        return
      }
      if ((e && e.keyCode == 37) || e.keyCode == 38) {
        resolve({
          direct: 'prev',
          isScope: true
        })
        return
      }
      resolve({
        direct: '',
        isScope: false
      })
    })
  }

  go(dom, index) {}
}

export default new Event()
