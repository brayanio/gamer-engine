import engine from '../engine/engine.js'

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
  engine.ui.appendChild(el)
  ;['up', 'left', 'right', 'down'].forEach(key => {
    engine.getUI(key).onmousedown = () => engine.setKeyState(key, true)
    engine.getUI(key).onmouseup = () => engine.setKeyState(key, false)
    engine.getUI(key).ontouchstart = () => engine.setKeyState(key, true)
    engine.getUI(key).ontouchend = () => engine.setKeyState(key, false)
  })
}