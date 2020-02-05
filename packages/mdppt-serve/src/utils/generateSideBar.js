import Event from './event'
import arrowSvg from '../svg/arrow.svg'
import folerSvg from '../svg/folder.svg'
import htmlSvg from '../svg/html.svg'

const createUl = () => {
  return document.createElement('ul')
}

const createLi = () => {
  return document.createElement('li')
}

const createSpan = () => {
  return document.createElement('span')
}

export default () => {
  const div = document.createElement('div')
  div.className = 'mdppt-navigation'

  const outsideWrapper = createUl()
  outsideWrapper.classList.add('mdppt-sidebar')

  const folders = window.navigationFolder || {}
  const matchPathName = window.location.pathname.match(/([^\/]+)\.html(#slide=\d+)?$/)
  let pathName
  if (!matchPathName || matchPathName[1] === 'index' || matchPathName[1] === '/') {
    pathName = 'index'
  } else {
    pathName = matchPathName[1]
  }

  const linkClassName = name => (pathName === name ? 'class="active"' : '')

  Object.keys(folders).forEach(item => {
    const parent = folders[item]
    const hasChilderen = folders[item].children.length > 0
    const children = folders[item].children

    const outsideList = createLi()
    outsideList.classList.add('mdppt-sidebar__item')

    if (hasChilderen) {
      const innerWrapper = createUl()
      const innerSpan = createSpan()

      const lis = children.map(nav => {
        const displayValue = nav.display || nav.name
        return `
          <li class="mdppt-sidebar__sub-item">
            <span class="html-item">
              <img src="${htmlSvg}" class="html-svg">
              <a ${linkClassName(nav.name)} title="${displayValue}" href="${nav.name}.html">${displayValue}</a>
            </span>
          </li>`
      })

      innerWrapper.classList.add('mdppt-sidebar__sub')
      innerWrapper.innerHTML = lis.join('')
      innerSpan.innerHTML = `
        <img src="${arrowSvg}" class="arrow-svg">
        <img src="${folerSvg}" class="folder-svg">
        ${parent.name}
      `
      outsideList.classList.add('mdppt-sidebar__folder')
      outsideList.appendChild(innerSpan)
      outsideList.appendChild(innerWrapper)
      outsideWrapper.appendChild(outsideList)
    } else {
      const displayValue = parent.display || parent.name
      outsideList.innerHTML = `
        <span class="html-item">
          <img src="${htmlSvg}" class="html-svg">
          <a ${linkClassName(parent.name)} title="${displayValue}" href="${parent.name}.html">${displayValue}</a>
        </span>
      `
      outsideWrapper.appendChild(outsideList)
    }
  })

  div.appendChild(outsideWrapper)
  document.body.appendChild(div)

  const folderBtn = Event.selectAll('.mdppt-sidebar__item span')
  folderBtn.forEach(span => {
    Event.on(span, 'click', () => {
      span.parentNode.classList.toggle('active')
    })
  })
}
