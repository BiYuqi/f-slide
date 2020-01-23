import Event from './event'
import expand from '../svg/expand.svg'

export default () => {
  const navigation = window.navigation.sort()
  const div = document.createElement('div')
  const ul = document.createElement('ul')
  const img = document.createElement('img')
  div.className = 'mdppt-navigation'
  img.className = 'mdppt-navigation__expand'
  img.src = expand

  const lis = navigation.map(nav => {
    return `<li><a href="${nav}">${nav.replace(/\.html/, '')}</a></li>`
  })

  ul.innerHTML = lis.join('\n')
  div.appendChild(ul)
  // div.appendChild(img)
  document.body.appendChild(div)

  // Remove temporarily
  // Event.on(img, 'click', () => {
  //   div.classList.toggle("active")
  // })
}
