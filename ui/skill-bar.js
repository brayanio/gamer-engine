import gamer from '../_gamer/gamer.js'

const el = document.createElement('section')
el.classList.add('skillbar')

//skill: {img, key, fn}
export default (...skills) => {
  skills.forEach(skill => {
    const button = document.createElement('button')
    button.onclick = skill.fn
    const img = document.createElement('img')
    img.src = skill.img
    button.appendChild(img)
    const label = document.createElement('label')
    label.innerText = skill.key
    button.appendChild(label)
    el.appendChild(button)
  })
  gamer.ui.appendChild(el)
}