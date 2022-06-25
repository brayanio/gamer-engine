import gmr from '../gmr.js'

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
  (el) => {

    const keybinds = {
      up: 'w',
      down: 's',
      left: 'a',
      right: 'd'
    }

    gmr.clearKeyFn()
    ;['up', 'left', 'right', 'down'].forEach( key => {
      gmr.ui.query(el, '#'+key).onmousedown = () => gmr.setKeyState(key, true)
      gmr.ui.query(el, '#'+key).onmouseup = () => gmr.setKeyState(key, false)
      gmr.ui.query(el, '#'+key).ontouchstart = () => gmr.setKeyState(key, true)
      gmr.ui.query(el, '#'+key).ontouchend = () => gmr.setKeyState(key, false)
      gmr.addKeyFn(keybinds[key], () => gmr.setKeyState(key, true))
      gmr.addKeyUpFn(keybinds[key], () => gmr.setKeyState(key, false))
    })
  }
)