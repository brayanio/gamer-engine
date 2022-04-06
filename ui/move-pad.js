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
    gamer.getId(key).onmousedown = () => gamer.setKeyState(key, true)
    gamer.getId(key).onmouseup = () => gamer.setKeyState(key, false)
    gamer.getId(key).ontouchstart = () => gamer.setKeyState(key, true)
    gamer.getId(key).ontouchend = () => gamer.setKeyState(key, false)
  })
)