import '@babel/polyfill'
import Event from './utils/event'
import 'animate.css'
import './styles/index.scss'

class Mdppt {
  constructor() {
    this.slideIndex = null
    this.slideZoomModal = false
    this.slidePage = Event.selectAll('.mdppt-slide')
    this.slideLength = Event.length('.mdppt-slide')
    this.slideNextPage = Event.select('.mdppt-action__next')
    this.slidePrevPage = Event.select('.mdppt-action__prev')
    this.slideCount = Event.select('.mdppt-action__count')
    this.slideZoomInWrapper = Event.select('.mdppt-zoom')
    this.slideZoomItem = Event.selectAll('.mdppt-zoom_item')
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
      if (isScope && !this.slideZoomModal) {
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

    Event.on(this.slideCount, 'click', () => {
      this.slideZoomInWrapper.style.display = 'block'
      for (let i = 0; i < this.slideLength; i++) {
        const className = this.slideZoomItem[i].className
        this.slideZoomItem[i].className = className.replace(/\s?active/, '')
      }
      this.slideZoomModal = true
      this.slideZoomItem[this.slideIndex - 1].className += ' active'
    })

    this.slideZoomItem.forEach(item => {
      Event.on(item, 'click', e => {
        const index = item.getAttribute('data-slide')
        this.setSlideIndex(index)
        this.slideZoomInWrapper.style.display = 'none'
        this.slideZoomModal = false
      })
    })

    if (!this.slideIndex) {
      this.setSlideIndex(1)
    }

    this.goToPage(this.slideIndex)
  }

  setSlideIndex(index) {
    this.slideIndex = ~~index
    window.location.hash = `slide=${index}`
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
