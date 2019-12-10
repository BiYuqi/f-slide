import '@babel/polyfill'
import Event from './utils/event'
import './styles/index.scss'

class Mdppt {
  constructor() {
    this.slideIndex = null
    this.slidePage = Event.selectAll('.mdppt-slide')
    this.slideLength = Event.length('.mdppt-slide')
    this.slideNextPage = Event.select('.mdppt-action__next')
    this.slidePrevPage = Event.select('.mdppt-action__prev')
    this.slideCount = Event.select('.mdppt-action__count')
    this.initSlideIndex()
    this.setPageNumber()
    this.init()
  }

  init() {
    Event.on(window, 'hashchange', event => {
      this.initSlideIndex()
      this.resetAll()
      this.goToPage(this.slideIndex)
    })

    Event.on(document, 'keydown', async event => {
      const { direct, isScope } = await Event.getDirection(event)
      if (isScope) {
        if (direct === 'next') {
          this.goNext()
        }

        if (direct === 'prev') {
          this.goPrev()
        }
      }
    })

    Event.on(this.slideNextPage, 'click', () => {
      this.goNext()
    })

    Event.on(this.slidePrevPage, 'click', () => {
      this.goPrev()
    })

    if (!this.slideIndex) {
      this.setSlideIndex(1)
    }

    this.goToPage(this.slideIndex)
  }

  setSlideIndex(index) {
    this.slideIndex = ~~index
    window.location.href = `/#slide=${index}`
  }

  initSlideIndex() {
    const slideRe = /slide=(\d+)+/
    const match = window.location.href.match(slideRe)
    if (!match) {
      this.setSlideIndex(1)
      return
    }
    if (~~match[1] === 0) {
      this.setSlideIndex(1)
      return
    }

    if (~~match[1] > Event.length('.mdppt-slide')) {
      this.setSlideIndex(this.slideLength)
      return
    }
    this.setSlideIndex(match[1])
  }

  resetAll() {
    for (let i = 0; i < this.slideLength; i++) {
      this.slidePage[i].style.display = 'none'
      this.slidePage[i].style.opacity = '0'
    }
  }

  goToPage(slideIndex) {
    this.slidePage[slideIndex - 1].style.display = 'flex'
    setTimeout(() => {
      this.slidePage[slideIndex - 1].style.opacity = '1'
    }, 0)
    this.setPageNumber()
  }

  goNext() {
    if (this.slideIndex >= this.slideLength) {
      return
    }
    const newIndex = this.slideIndex + 1
    this.setSlideIndex(newIndex)
    this.setPageNumber()
  }

  goPrev() {
    if (this.slideIndex <= 1) {
      return
    }
    const newIndex = this.slideIndex - 1
    this.setSlideIndex(newIndex)
    this.setPageNumber()
  }

  setPageNumber() {
    this.slideCount.innerHTML = `${this.slideIndex}/${this.slideLength}`
  }
}

export default new Mdppt()
