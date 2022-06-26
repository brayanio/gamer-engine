import gmr from '../_gmr/gmr.js'

export default gmr.ui.component( 'movepad',
  `
    <div class="top">
      <button id="up">Up</button>
    </div>
    <div class="bottom">
      <button id="left">Left</button>
      <button id="down">Down</button>
      <button id="right">Right</button>
    </div>
  `,
  (app, el) => {

    const keybinds = {
      up: 'w',
      down: 's',
      left: 'a',
      right: 'd'
    }

    gmr.keyManager.clearKeyFn()
    ;['up', 'left', 'right', 'down'].forEach( key => {
      el[key].onmousedown = () => gmr.keyManager.setKeyState(key, true)
      el[key].onmouseup = () => gmr.keyManager.setKeyState(key, false)
      el[key].ontouchstart = () => gmr.keyManager.setKeyState(key, true)
      el[key].ontouchend = () => gmr.keyManager.setKeyState(key, false)
      gmr.keyManager.addKeyFn(keybinds[key], () => gmr.keyManager.setKeyState(key, true))
      gmr.keyManager.addKeyUpFn(keybinds[key], () => gmr.keyManager.setKeyState(key, false))
    })
  }
)