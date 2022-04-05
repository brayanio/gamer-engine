import gamer from '../_gamer/gamer.js'

export default gamer.ui( 'skillbar', null,
  (el, ...skills) => skills.forEach(skill => {
    const button = document.createElement('button')
    button.onclick = skill.fn
    const img = document.createElement('img')
    img.src = `./asset/skill/${skill.img}.png`
    button.appendChild(img)
    const label = document.createElement('label')
    label.innerText = skill.key
    button.appendChild(label)
    gamer.addKeyFn(skill.key, () => button.click())
    el.appendChild(button)
  })
)