import Event from './event'
import arrowSvg from '../svg/arrow.svg'
import folerSvg from '../svg/folder.svg'

export default () => {
  const div = document.createElement('div')
  div.className = 'mdppt-navigation'

  const createUl = () => {
    return document.createElement('ul')
  }

  const createLi = () => {
    return document.createElement('li')
  }

  const createSpan = () => {
    return document.createElement('span')
  }

  const parentUls = createUl()
  parentUls.classList.add('mdppt-sidebar')
  const folders = window.navigationFolder || {}
  Object.keys(folders).forEach(item => {
    const parent = folders[item]
    const hasChilderen = folders[item].children.length > 0
    const children = folders[item].children

    const parentLis = createLi()
    parentLis.classList.add('mdppt-sidebar__item')

    if (hasChilderen) {
      let lis,
        lisUls = createUl(),
        lisSpan = createSpan()
      lis = children.map(nav => {
        return `<li class="mdppt-sidebar__sub-item"><a href="${nav}.html">${nav}</a></li>`
      })

      lisUls.classList.add('mdppt-sidebar__sub')
      lisUls.innerHTML = lis.join('')
      lisSpan.innerHTML = `
        <img src="${arrowSvg}" class="arrow-svg">
        <img src="${folerSvg}" class="folder-svg">
        ${parent.name}
      `
      parentLis.appendChild(lisSpan)
      parentLis.appendChild(lisUls)
      parentUls.appendChild(parentLis)
    } else {
      parentLis.innerHTML = `<a href="${parent.name}.html">${parent.name}</a>`
      parentUls.appendChild(parentLis)
    }
  })

  div.appendChild(parentUls)
  document.body.appendChild(div)

  const folderBtn = Event.selectAll('.mdppt-sidebar__item span')
  folderBtn.forEach(span => {
    Event.on(span, 'click', () => {
      span.parentNode.classList.toggle('active')
    })
  })
}
