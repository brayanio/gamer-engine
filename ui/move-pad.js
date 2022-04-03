import gamer from '../_gamer/gamer.js'

export default gamer.ui( 'movepad',
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
  () => ['up', 'left', 'right', 'down'].forEach( key => {
    gamer.getUI(key).onmousedåown = () => gamer.setKeyState(key, true)
    gamer.getUI(key).onmouseup = () => gamer.setKeyState(key, false)
    gamer.getUI(key).ontouchstart = () => gamer.setKeyState(key, true)
    gamer.getUI(key).ontouchend = () => gamer.setKeyState(key, false)
  })
)