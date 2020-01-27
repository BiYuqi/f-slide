import Event from './event'
import arrowSvg from '../svg/arrow.svg'
import folerSvg from '../svg/folder.svg'
console.log(window.location)

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
  let pathName = window.location.pathname.replace(/(\/|\.html)/g, '')
  if (!pathName || pathName === 'index') {
    pathName = 'index'
  }
  const linkClassName = name => (pathName === name ? 'class="active"' : '')

  Object.keys(folders).forEach(item => {
    const parent = folders[item]
    const hasChilderen = folders[item].children.length > 0
    const children = folders[item].children

    const outsideList = createLi()
    outsideList.classList.add('mdppt-sidebar__item')

    if (hasChilderen) {
      let lis,
        innerWrapper = createUl(),
        innerSpan = createSpan()
      lis = children.map(nav => {
        return `<li class="mdppt-sidebar__sub-item"><a ${linkClassName(nav)} href="${nav}.html">${nav}</a></li>`
      })

      innerWrapper.classList.add('mdppt-sidebar__sub')
      innerWrapper.innerHTML = lis.join('')
      innerSpan.innerHTML = `
        <img src="${arrowSvg}" class="arrow-svg">
        <img src="${folerSvg}" class="folder-svg">
        ${parent.name}
      `
      outsideList.appendChild(innerSpan)
      outsideList.appendChild(innerWrapper)
      outsideWrapper.appendChild(outsideList)
    } else {
      outsideList.innerHTML = `<a ${linkClassName(parent.name)} href="${parent.name}.html">${parent.name}</a>`
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
