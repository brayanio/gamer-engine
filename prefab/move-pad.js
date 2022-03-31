import gamer from '../_gamer/gamer.js'

const el = document.createElement('section')
el.classList.add('movepad')
el.innerHTML = `
  <div class="top">
    <button id="up">Up</button>
  </div>
  <div class="bottom">
    <button id="left">Left</button>
    <button id="down">Down</button>
    <button id="right">Right</button>
  </div>
`

export default () => {
  gamer.ui.appendChild(el)
  ;['up', 'left', 'right', 'down'].forEach(key => {
    gamer.getUI(key).onmousedown = () => gamer.setKeyState(key, true)
    gamer.getUI(key).onmouseup = () => gamer.setKeyState(key, false)
    gamer.getUI(key).ontouchstart = () => gamer.setKeyState(key, true)
    gamer.getUI(key).ontouchend = () => gamer.setKeyState(key, false)
  })
}